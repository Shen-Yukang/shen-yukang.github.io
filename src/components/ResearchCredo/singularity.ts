/**
 * Page-wide singularity sequence: every block spirals into the black hole
 * along a vortex path, the screen goes fully black for a beat, a flash throws
 * everything back out, and a refraction ripple washes over the restored page.
 *
 * Only transform/opacity/filter are animated, so the page always lands back on
 * its original layout even if the sequence is interrupted.
 */

const COLLAPSE_MS = 1500;
const VOID_MS = 520;
const EXPAND_MS = 1200;
const RIPPLE_MS = 1600;

const SPIRAL_STEPS = 30;
const SPIRAL_TURNS = 0.92;

let running = false;
let timers: number[] = [];
let animations: Animation[] = [];

const collectBlocks = (): HTMLElement[] => {
  const page = document.querySelector<HTMLElement>(".page");
  if (!page) return [];

  return Array.from(page.children).flatMap((child) => {
    if (!(child instanceof HTMLElement)) return [];
    // Pinned controls (the theme toggle) are chrome, not part of the document
    // being swallowed.
    if (getComputedStyle(child).position === "fixed") return [];
    // Break `main` open so each section falls in on its own timing.
    if (child.classList.contains("main")) {
      return Array.from(child.children).filter(
        (section): section is HTMLElement => section instanceof HTMLElement,
      );
    }
    return [child];
  });
};

/**
 * Samples a logarithmic-ish spiral from the block's resting place down to the
 * hole. Returned transforms are relative offsets, so the element keeps its
 * layout position and only the compositor moves it.
 */
const spiralKeyframes = (
  originX: number,
  originY: number,
  centerX: number,
  centerY: number,
  swirl: number,
): Keyframe[] => {
  const distance = Math.hypot(centerX - originX, centerY - originY);
  const baseAngle = Math.atan2(centerY - originY, centerX - originX);
  const frames: Keyframe[] = [];

  for (let step = 0; step <= SPIRAL_STEPS; step += 1) {
    const t = step / SPIRAL_STEPS;
    const radius = distance * (1 - t);
    const sweep = swirl * SPIRAL_TURNS * Math.PI * 2 * t;
    const angle = baseAngle + sweep;
    const x = originX + Math.cos(angle) * radius - centerX;
    const y = originY + Math.sin(angle) * radius - centerY;
    const scale = 1 - 0.986 * t;
    // Shear peaks mid-fall, so blocks look torn as they wind into the vortex.
    const shear = Math.sin(t * Math.PI) * 9 * swirl;

    frames.push({
      offset: t,
      transform:
        `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px) ` +
        `rotate(${((sweep * 180) / Math.PI) * 0.55 + 18 * swirl * t}deg) ` +
        `skew(${shear.toFixed(2)}deg, ${(shear * 0.35).toFixed(2)}deg) ` +
        `scale(${Math.max(scale, 0.014).toFixed(4)})`,
      opacity: t < 0.55 ? 1 : Math.max(0, 1 - (t - 0.55) / 0.4),
      filter: `blur(${(Math.max(0, t - 0.45) * 5).toFixed(2)}px)`,
    });
  }

  return frames;
};

/** Reversing a keyframe list also has to invert its offsets, or the Web
 *  Animations API rejects the (now descending) sequence. */
const reversed = (frames: Keyframe[]): Keyframe[] =>
  frames
    .map((frame) => ({ ...frame, offset: 1 - (frame.offset as number) }))
    .reverse();

const clearTimers = () => {
  timers.forEach((timer) => window.clearTimeout(timer));
  timers = [];
};

const later = (delay: number, action: () => void) => {
  timers.push(window.setTimeout(action, delay));
};

export const isSingularityRunning = () => running;

export const runSingularity = (originX: number, originY: number) => {
  if (running) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const elements = collectBlocks();
  if (elements.length === 0) return;

  running = true;
  document.body.classList.add("singularity-running");

  const measured = elements.map((element, index) => {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    return {
      element,
      centerX,
      centerY,
      distance: Math.hypot(centerX - originX, centerY - originY),
      // Alternate the winding direction so the vortex reads as turbulent
      // rather than as one rigid pinwheel.
      swirl: index % 3 === 1 ? -1 : 1,
    };
  });
  const maxDistance = Math.max(...measured.map((item) => item.distance)) || 1;

  const blocks = measured.map((item) => {
    const distanceRatio = item.distance / maxDistance;
    item.element.classList.add("singularity-block");

    return {
      ...item,
      distanceRatio,
      keyframes: spiralKeyframes(
        originX,
        originY,
        item.centerX,
        item.centerY,
        item.swirl,
      ),
    };
  });

  const stage = document.createElement("div");
  stage.className = "singularity-stage is-charging";
  stage.setAttribute("aria-hidden", "true");
  stage.style.setProperty("--ox", `${originX}px`);
  stage.style.setProperty("--oy", `${originY}px`);
  stage.innerHTML =
    '<span class="singularity-veil"></span>' +
    '<span class="singularity-core"></span>' +
    '<span class="singularity-refract"></span>';
  document.body.appendChild(stage);

  const finish = () => {
    clearTimers();
    animations.forEach((animation) => animation.cancel());
    animations = [];
    blocks.forEach(({ element }) => {
      element.classList.remove("singularity-block");
    });
    stage.remove();
    document.body.classList.remove("singularity-running");
    window.removeEventListener("pagehide", finish);
    running = false;
  };

  window.addEventListener("pagehide", finish);

  // Nearer blocks cross the horizon first, so the swallow reads as a wave
  // travelling outward from the black hole.
  blocks.forEach(({ element, keyframes, distanceRatio }) => {
    animations.push(
      element.animate(keyframes, {
        duration: COLLAPSE_MS - 420,
        delay: distanceRatio * 380,
        easing: "cubic-bezier(0.55, 0, 0.86, 0.28)",
        fill: "forwards",
      }),
    );
  });

  later(COLLAPSE_MS + VOID_MS, () => {
    stage.classList.remove("is-charging");
    stage.classList.add("is-flashing");

    animations.forEach((animation) => animation.cancel());
    animations = blocks.map(({ element, keyframes, distanceRatio }) =>
      element.animate(reversed(keyframes), {
        duration: EXPAND_MS - 260,
        delay: distanceRatio * 240,
        easing: "cubic-bezier(0.18, 0.9, 0.32, 1)",
        fill: "backwards",
      }),
    );
  });

  later(COLLAPSE_MS + VOID_MS + EXPAND_MS, () => {
    stage.classList.remove("is-flashing");
    stage.classList.add("is-rippling");
    animations.forEach((animation) => animation.cancel());
    animations = [];
  });

  later(COLLAPSE_MS + VOID_MS + EXPAND_MS + RIPPLE_MS, finish);
};
