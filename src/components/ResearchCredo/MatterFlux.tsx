import { useEffect, useRef } from "react";
import { runSingularity } from "./singularity";

type Vec3 = {
  x: number;
  y: number;
  z: number;
};

type Star = {
  angle: number;
  orbitRadius: number;
  y: number;
  drift: number;
  radius: number;
  rgb: string;
  twinklePhase: number;
  twinkleSpeed: number;
};

type DiskMote = {
  angle: number;
  orbitRadius: number;
  /** 0 at the scorching inner edge, 1 at the cool outer rim. */
  temper: number;
  speed: number;
  radius: number;
};

type FreeParticle = {
  kind: "matter" | "antimatter";
  pos: Vec3;
  vel: Vec3;
  curl: number;
  bornAt: number;
  duration: number;
  radius: number;
  rgb: string;
};

type AnnihilationTrack = {
  start: Vec3;
  control: Vec3;
  rgb: string;
  radius: number;
};

type AnnihilationPair = {
  bornAt: number;
  duration: number;
  target: Vec3;
  tracks: [AnnihilationTrack, AnnihilationTrack];
};

type Flash = {
  center: Vec3;
  bornAt: number;
  duration: number;
  maxRadius: number;
  rgb: string;
};

type Palette = {
  matter: string;
  antimatter: string;
  gold: string;
  /** The horizon silhouette. */
  core: string;
  /** Photon ring, the brightest thing in the frame. */
  photon: string;
  /** Accretion disk from the scorching inner edge outward. */
  disk: [string, string, string, string];
  stars: string[];
  /** Multiplies every alpha; a dark ground needs less ink to read. */
  ink: number;
};

const PALETTES: Record<"dark" | "light", Palette> = {
  dark: {
    matter: "126, 182, 245",
    antimatter: "240, 150, 114",
    gold: "233, 190, 100",
    core: "0, 0, 0",
    photon: "255, 244, 214",
    disk: ["255, 248, 226", "252, 214, 138", "226, 166, 74", "150, 170, 200"],
    stars: [
      "196, 210, 232",
      "196, 210, 232",
      "150, 186, 232",
      "226, 190, 120",
      "255, 255, 255",
    ],
    ink: 1,
  },
  light: {
    matter: "52, 104, 168",
    antimatter: "168, 106, 84",
    gold: "190, 145, 51",
    core: "17, 24, 39",
    photon: "255, 240, 205",
    disk: ["255, 236, 189", "224, 176, 74", "190, 145, 51", "126, 142, 166"],
    stars: [
      "100, 116, 139",
      "100, 116, 139",
      "71, 112, 146",
      "38, 91, 135",
      "190, 145, 51",
    ],
    ink: 1,
  },
};

const readTheme = (): "dark" | "light" =>
  document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark";

const PERSPECTIVE = 480;
// Lower fade = longer ghost trails (~0.8s before a moving dot's wake dissolves).
const TRAIL_FADE = 0.065;
// Newtonian pull in px^3/ms^2, softened so particles never blow up near r = 0.
const GRAVITY = 1.35;
const GRAVITY_SOFTENING = 260;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const easeOut = (value: number) => 1 - Math.pow(1 - value, 3);

// Starts moving right away, then accelerates into the collision point,
// so the merge reads as abrupt rather than a slow drift-in.
const easeAccelerate = (value: number) => 0.35 * value + 0.65 * value * value;

const randomBetween = (min: number, max: number) =>
  min + Math.random() * (max - min);

const randomUnitVec3 = (flatten = 1): Vec3 => {
  const azimuth = randomBetween(0, Math.PI * 2);
  const pitch = randomBetween(-1, 1) * flatten;
  const planar = Math.sqrt(1 - pitch * pitch);

  return {
    x: Math.cos(azimuth) * planar,
    y: pitch,
    z: Math.sin(azimuth) * planar,
  };
};

const quadraticVec3 = (
  start: Vec3,
  control: Vec3,
  end: Vec3,
  progress: number,
): Vec3 => {
  const inverse = 1 - progress;
  const a = inverse * inverse;
  const b = 2 * inverse * progress;
  const c = progress * progress;

  return {
    x: a * start.x + b * control.x + c * end.x,
    y: a * start.y + b * control.y + c * end.y,
    z: a * start.z + b * control.z + c * end.z,
  };
};

const MatterFlux = () => {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const coreRef = useRef<HTMLButtonElement>(null);

  const handleCollapse = () => {
    const bounds = coreRef.current?.getBoundingClientRect();
    if (!bounds) return;
    runSingularity(
      bounds.left + bounds.width / 2,
      bounds.top + bounds.height / 2,
    );
  };

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!host || !canvas || !context) return;

    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let reduceMotion = motionPreference.matches;
    let palette = PALETTES[readTheme()];
    let width = 1;
    let height = 1;
    let animationFrame: number | null = null;
    let isVisible = true;
    let documentVisible = !document.hidden;
    let lastNow = 0;

    let stars: Star[] = [];
    let diskMotes: DiskMote[] = [];
    let horizon = 12;
    let diskOuter = 42;
    let pairs: AnnihilationPair[] = [];
    let freeParticles: FreeParticle[] = [];
    let flashes: Flash[] = [];
    let nextEventAt = 0;

    let spin = 0;
    let pointerX = 0;
    let pointerY = 0;
    let yawOffset = 0;
    let pitchOffset = 0;

    const project = (p: Vec3) => {
      const rotY = spin + yawOffset;
      const rotX = 0.3 + pitchOffset;
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      const x1 = p.x * cosY + p.z * sinY;
      const z1 = -p.x * sinY + p.z * cosY;
      const y2 = p.y * cosX - z1 * sinX;
      const z2 = p.y * sinX + z1 * cosX;

      const scale = PERSPECTIVE / (PERSPECTIVE + z2);

      return {
        x: width / 2 + x1 * scale,
        y: height / 2 + y2 * scale,
        scale,
        depth: z2,
        // Near particles read solid, far ones recede into haze.
        depthAlpha: clamp(0.35 + (scale - 0.72) * 1.15, 0.3, 1.15),
      };
    };

    /**
     * Weak-field deflection in screen space: light grazing the hole is bent
     * outward, so the star field and the particle tracks visibly warp around
     * the shadow. Returns null for anything that falls inside the horizon.
     */
    const lens = (x: number, y: number, scale: number) => {
      const centerX = width / 2;
      const centerY = height / 2;
      const dx = x - centerX;
      const dy = y - centerY;
      const distance = Math.hypot(dx, dy);
      const shadow = horizon * scale;

      if (distance < shadow * 0.99) return null;

      const bent = distance + (shadow * shadow * 1.35) / distance;

      return {
        x: centerX + (dx / distance) * bent,
        y: centerY + (dy / distance) * bent,
        stretch: bent / distance,
      };
    };

    const randomEventPoint = (): Vec3 => {
      // Keep events clear of the horizon so pairs are never born inside it.
      for (let attempt = 0; attempt < 6; attempt += 1) {
        const point = {
          x: randomBetween(-width * 0.3, width * 0.3),
          y: randomBetween(-height * 0.28, height * 0.28),
          z: randomBetween(-1, 1) * Math.min(width * 0.2, 90),
        };
        if (Math.hypot(point.x, point.y, point.z) > horizon * 2.4) {
          return point;
        }
      }

      return {
        x: horizon * 3 * (Math.random() > 0.5 ? 1 : -1),
        y: randomBetween(-height * 0.28, height * 0.28),
        z: randomBetween(-1, 1) * Math.min(width * 0.2, 90),
      };
    };

    const seedStars = () => {
      const galaxyRadius = width * 0.46;
      const count = width < 420 ? 42 : 70;

      stars = Array.from({ length: count }, () => {
        const orbitRadius =
          galaxyRadius * (0.12 + 0.88 * Math.sqrt(Math.random()));
        const bulge = 1 - (orbitRadius / galaxyRadius) * 0.65;

        return {
          angle: randomBetween(0, Math.PI * 2),
          orbitRadius,
          y: randomBetween(-1, 1) * height * 0.4 * bulge,
          // Differential rotation: inner stars orbit faster, like a real disc.
          drift:
            (0.000025 + 0.00006 * (1 - orbitRadius / galaxyRadius)) *
            (Math.random() > 0.12 ? 1 : -0.6),
          radius: randomBetween(0.45, 1.5),
          rgb: palette.stars[Math.floor(Math.random() * palette.stars.length)],
          twinklePhase: randomBetween(0, Math.PI * 2),
          twinkleSpeed: randomBetween(0.0006, 0.0018),
        };
      });
    };

    const seedBlackHole = () => {
      horizon = clamp(Math.min(width, height) * 0.13, 7, 17);
      diskOuter = horizon * 3.5;
      const moteCount = width < 420 ? 64 : 104;

      diskMotes = Array.from({ length: moteCount }, () => {
        const temper = Math.pow(Math.random(), 1.4);
        const orbitRadius = horizon * 1.32 + temper * (diskOuter - horizon * 1.32);

        return {
          angle: randomBetween(0, Math.PI * 2),
          orbitRadius,
          temper,
          // Keplerian shear: the inner edge races past the outer rim.
          speed:
            0.0052 *
            Math.pow(horizon / orbitRadius, 1.5) *
            randomBetween(0.88, 1.12),
          radius: randomBetween(0.3, 0.72),
        };
      });
    };

    /** Inner disk burns white-gold, the outer rim cools to amber and steel. */
    const diskColor = (temper: number) => {
      if (temper < 0.34) return palette.disk[0];
      if (temper < 0.62) return palette.disk[1];
      if (temper < 0.85) return palette.disk[2];
      return palette.disk[3];
    };

    const drawDiskMote = (
      mote: DiskMote,
      x: number,
      y: number,
      scale: number,
      alpha: number,
    ) => {
      drawGlowDot(x, y, mote.radius * scale, diskColor(mote.temper), alpha);
    };

    const drawBlackHole = (dt: number, staticAlpha = 0) => {
      const center = project({ x: 0, y: 0, z: 0 });
      const scale = center.scale;
      const shadowRadius = horizon * scale;
      const baseAlpha = staticAlpha ? staticAlpha * 0.85 : 0.62;
      const near: Array<{ mote: DiskMote; x: number; y: number; a: number }> =
        [];

      diskMotes.forEach((mote) => {
        mote.angle += mote.speed * dt;
        const world = {
          x: Math.cos(mote.angle) * mote.orbitRadius,
          y: 0,
          z: Math.sin(mote.angle) * mote.orbitRadius,
        };
        const projected = project(world);

        // Doppler beaming: the limb rotating toward the camera is boosted,
        // the receding one dimmed, which is what makes a disk look like a disk.
        const rotY = spin + yawOffset;
        const approach =
          -(-Math.sin(mote.angle) * -Math.sin(rotY) +
            Math.cos(mote.angle) * Math.cos(rotY));
        const beaming = clamp(1 + approach * 0.72, 0.3, 1.85);
        const alpha = baseAlpha * beaming * projected.depthAlpha;

        if (projected.depth <= 0) {
          // Near half sweeps in front of the shadow: draw it last, on top.
          near.push({ mote, x: projected.x, y: projected.y, a: alpha });
          return;
        }

        // Far half would hide behind the shadow, but light bends around the
        // hole and lifts it into view as an arc over the top — plus a fainter
        // secondary image swung underneath.
        const lateral = clamp(
          (projected.x - center.x) / (mote.orbitRadius * scale),
          -1,
          1,
        );
        const arc = (Math.PI * (1 - lateral)) / 2;
        const ringRadius =
          shadowRadius * (1.16 + 0.5 * (mote.orbitRadius / diskOuter));

        drawDiskMote(
          mote,
          center.x + Math.cos(arc) * ringRadius,
          center.y - Math.sin(arc) * ringRadius,
          projected.scale,
          alpha,
        );
        drawDiskMote(
          mote,
          center.x + Math.cos(arc) * ringRadius * 0.94,
          center.y + Math.sin(arc) * ringRadius * 0.94,
          projected.scale,
          alpha * 0.4,
        );
      });

      // Photon ring: the last stable orbit light can hold before falling in.
      const stable = staticAlpha ? 1 : TRAIL_FADE;
      context.strokeStyle = `rgba(${palette.photon}, ${0.78 * stable})`;
      context.lineWidth = 1.15;
      context.beginPath();
      context.arc(center.x, center.y, shadowRadius * 1.09, 0, Math.PI * 2);
      context.stroke();

      // Nothing escapes: wipe the trail buffer inside the horizon, then lay
      // the shadow in at full strength so its edge stays clean instead of
      // dithering as the frame-to-frame fade nibbles at it.
      if (!staticAlpha) {
        context.globalCompositeOperation = "destination-out";
        context.fillStyle = "rgba(0, 0, 0, 1)";
        context.beginPath();
        context.arc(center.x, center.y, shadowRadius, 0, Math.PI * 2);
        context.fill();
        context.globalCompositeOperation = "source-over";
      }

      const opacity = staticAlpha || 1;
      const shadow = context.createRadialGradient(
        center.x,
        center.y,
        shadowRadius * 0.6,
        center.x,
        center.y,
        shadowRadius,
      );
      shadow.addColorStop(0, `rgba(${palette.core}, ${0.96 * opacity})`);
      shadow.addColorStop(0.82, `rgba(${palette.core}, ${0.9 * opacity})`);
      shadow.addColorStop(1, `rgba(${palette.core}, 0)`);
      context.fillStyle = shadow;
      context.beginPath();
      context.arc(center.x, center.y, shadowRadius, 0, Math.PI * 2);
      context.fill();

      near.forEach(({ mote, x, y, a }) =>
        drawDiskMote(mote, x, y, scale, a),
      );
    };

    const starPosition = (star: Star): Vec3 => ({
      x: Math.cos(star.angle) * star.orbitRadius,
      y: star.y,
      z: Math.sin(star.angle) * star.orbitRadius * 0.85,
    });

    const createAnnihilation = (now: number): AnnihilationPair => {
      const target = randomEventPoint();
      const approach = randomUnitVec3(0.5);
      const distance = randomBetween(width * 0.14, width * 0.28);
      const offset = {
        x: approach.x * distance,
        y: approach.y * distance * 0.5,
        z: approach.z * distance * 0.7,
      };
      const bendDir = randomUnitVec3();
      const bend = randomBetween(12, 32);
      const radius = randomBetween(0.8, 1.4);

      const makeTrack = (sign: 1 | -1, rgb: string): AnnihilationTrack => {
        const start = {
          x: target.x + offset.x * sign,
          y: target.y + offset.y * sign,
          z: target.z + offset.z * sign,
        };

        return {
          start,
          control: {
            x: (start.x + target.x) / 2 + bendDir.x * bend * sign,
            y: (start.y + target.y) / 2 + bendDir.y * bend * sign,
            z: (start.z + target.z) / 2 + bendDir.z * bend * sign,
          },
          rgb,
          radius: radius * randomBetween(0.85, 1.15),
        };
      };

      return {
        bornAt: now,
        duration: randomBetween(950, 1600),
        target,
        tracks: [makeTrack(1, palette.matter), makeTrack(-1, palette.antimatter)],
      };
    };

    const spawnCreation = (now: number) => {
      const origin = randomEventPoint();
      const direction = randomUnitVec3(0.45);
      const speed = randomBetween(0.045, 0.09);
      const curl = randomBetween(0.0012, 0.003);
      const radius = randomBetween(0.75, 1.35);
      const duration = randomBetween(1100, 1900);

      flashes.push({
        center: origin,
        bornAt: now,
        duration: randomBetween(130, 190),
        maxRadius: randomBetween(2, 3),
        rgb: palette.gold,
      });

      // Pair production: equal momenta, opposite directions, opposite curl —
      // the two tracks spiral apart like a bubble-chamber photograph.
      ([1, -1] as const).forEach((sign) => {
        freeParticles.push({
          kind: sign === 1 ? "matter" : "antimatter",
          pos: { ...origin },
          vel: {
            x: direction.x * speed * sign,
            y: direction.y * speed * sign,
            z: direction.z * speed * sign,
          },
          curl: curl * sign,
          bornAt: now,
          duration,
          radius: radius * randomBetween(0.85, 1.15),
          rgb: sign === 1 ? palette.matter : palette.antimatter,
        });
      });
    };

    const emitAnnihilation = (pair: AnnihilationPair, now: number) => {
      // Merge, one brief flash, then nothing — sudden and total.
      flashes.push({
        center: pair.target,
        bornAt: now,
        duration: randomBetween(120, 170),
        maxRadius: randomBetween(2.2, 3.2),
        rgb: palette.gold,
      });
    };

    const spawnEvent = (now: number) => {
      const pairCap = width < 420 ? 2 : 3;
      const freeCap = width < 420 ? 5 : 8;
      const boundCount = pairs.length;
      const looseCount = freeParticles.length;

      if (boundCount >= pairCap && looseCount >= freeCap) return;

      const wantAnnihilation =
        boundCount < pairCap && (looseCount >= freeCap || Math.random() < 0.5);

      if (wantAnnihilation) pairs.push(createAnnihilation(now));
      else spawnCreation(now);
    };

    const drawGlowDot = (
      x: number,
      y: number,
      radius: number,
      rgb: string,
      alpha: number,
    ) => {
      context.shadowBlur = 4;
      context.shadowColor = `rgba(${rgb}, ${alpha * 0.8})`;
      context.fillStyle = `rgba(${rgb}, ${alpha})`;
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fill();
      context.shadowBlur = 0;
    };

    const drawStars = (now: number, dt: number, staticAlpha = 0) => {
      stars.forEach((star) => {
        star.angle += star.drift * dt;
        const projected = project(starPosition(star));
        // Starlight passing near the hole is deflected, so the field visibly
        // warps into a ring around the shadow.
        const bent = lens(projected.x, projected.y, projected.scale);
        if (!bent) return;

        const twinkle =
          0.65 + 0.35 * Math.sin(now * star.twinkleSpeed + star.twinklePhase);
        // Persistent-canvas fade accumulates repeated draws, so stars are
        // painted faint and settle at roughly draw-alpha / TRAIL_FADE.
        const alpha = staticAlpha
          ? staticAlpha * twinkle * projected.depthAlpha
          : 0.32 * TRAIL_FADE * twinkle * projected.depthAlpha;

        context.fillStyle = `rgba(${star.rgb}, ${alpha})`;
        context.beginPath();
        context.arc(
          bent.x,
          bent.y,
          star.radius * projected.scale,
          0,
          Math.PI * 2,
        );
        context.fill();
      });
    };

    const drawPairs = (now: number) => {
      pairs = pairs.filter((pair) => {
        const rawProgress = (now - pair.bornAt) / pair.duration;
        if (rawProgress >= 1) {
          emitAnnihilation(pair, now);
          return false;
        }

        const progress = easeAccelerate(clamp(rawProgress, 0, 1));
        const fadeIn = clamp(rawProgress / 0.12, 0, 1);

        pair.tracks.forEach((track) => {
          const point = quadraticVec3(
            track.start,
            track.control,
            pair.target,
            progress,
          );
          const projected = project(point);
          const bent = lens(projected.x, projected.y, projected.scale);
          if (!bent) return;

          drawGlowDot(
            bent.x,
            bent.y,
            track.radius * projected.scale,
            track.rgb,
            0.72 * fadeIn * projected.depthAlpha,
          );
        });

        return true;
      });
    };

    const drawFreeParticles = (now: number, dt: number) => {
      freeParticles = freeParticles.filter((particle) => {
        const rawProgress = (now - particle.bornAt) / particle.duration;
        if (rawProgress >= 1) return false;

        if (particle.curl !== 0) {
          const turn = particle.curl * dt;
          const cos = Math.cos(turn);
          const sin = Math.sin(turn);
          const vx = particle.vel.x * cos - particle.vel.y * sin;
          particle.vel.y = particle.vel.x * sin + particle.vel.y * cos;
          particle.vel.x = vx;
        }

        const distance = Math.hypot(
          particle.pos.x,
          particle.pos.y,
          particle.pos.z,
        );

        if (distance < horizon) {
          // Crossed the horizon: a last flare, then gone.
          flashes.push({
            center: { ...particle.pos },
            bornAt: now,
            duration: randomBetween(150, 220),
            maxRadius: randomBetween(1.8, 2.8),
            rgb: palette.gold,
          });
          return false;
        }

        const pull =
          (GRAVITY / (distance * distance + GRAVITY_SOFTENING)) * dt;
        particle.vel.x -= (particle.pos.x / distance) * pull;
        particle.vel.y -= (particle.pos.y / distance) * pull;
        particle.vel.z -= (particle.pos.z / distance) * pull;

        particle.pos.x += particle.vel.x * dt;
        particle.pos.y += particle.vel.y * dt;
        particle.pos.z += particle.vel.z * dt;

        const projected = project(particle.pos);
        const bent = lens(projected.x, projected.y, projected.scale);
        if (!bent) return true;

        const alpha =
          clamp(rawProgress / 0.1, 0, 1) *
          clamp((1 - rawProgress) / 0.28, 0, 1) *
          projected.depthAlpha;

        drawGlowDot(
          bent.x,
          bent.y,
          particle.radius * projected.scale,
          particle.rgb,
          0.78 * alpha,
        );

        return true;
      });
    };

    const drawFlashes = (now: number) => {
      flashes = flashes.filter((flash) => {
        const progress = (now - flash.bornAt) / flash.duration;
        if (progress >= 1) return false;

        const projected = project(flash.center);
        const radius =
          flash.maxRadius * (0.6 + 0.4 * easeOut(progress)) * projected.scale;
        drawGlowDot(
          projected.x,
          projected.y,
          radius,
          flash.rgb,
          Math.pow(1 - progress, 2.2) * 0.9 * projected.depthAlpha,
        );

        return true;
      });
    };

    const resetScene = (now: number) => {
      seedBlackHole();
      seedStars();
      pairs = [createAnnihilation(now - 300)];
      freeParticles = [];
      flashes = [];
      spawnCreation(now - 200);
      nextEventAt = now + randomBetween(400, 800);
      lastNow = now;
    };

    const drawStaticScene = () => {
      context.clearRect(0, 0, width, height);
      if (stars.length === 0) seedStars();
      if (diskMotes.length === 0) seedBlackHole();
      drawStars(0, 0, 0.34);
      drawBlackHole(0, 0.55);

      const samples: Array<[Vec3, number, string]> = [
        [{ x: -width * 0.18, y: height * 0.12, z: 20 }, 1.3, palette.matter],
        [{ x: width * 0.1, y: -height * 0.15, z: -30 }, 1.1, palette.antimatter],
        [{ x: width * 0.24, y: height * 0.05, z: 50 }, 0.9, palette.gold],
      ];
      samples.forEach(([pos, radius, rgb]) => {
        const projected = project(pos);
        drawGlowDot(
          projected.x,
          projected.y,
          radius * projected.scale,
          rgb,
          0.5 * projected.depthAlpha,
        );
      });
    };

    const drawScene = (now: number) => {
      const dt = clamp(now - lastNow, 0, 48);
      lastNow = now;

      // Fade instead of clear: every moving element leaves a ghost trail.
      context.globalCompositeOperation = "destination-out";
      context.fillStyle = `rgba(0, 0, 0, ${TRAIL_FADE})`;
      context.fillRect(0, 0, width, height);
      context.globalCompositeOperation = "source-over";

      spin += 0.00008 * dt;
      yawOffset += (pointerX * 0.45 - yawOffset) * 0.045;
      pitchOffset += (pointerY * 0.22 - pitchOffset) * 0.045;

      if (now >= nextEventAt) {
        spawnEvent(now);
        nextEventAt = now + randomBetween(480, 1100);
      }

      drawStars(now, dt);
      drawBlackHole(dt);
      drawFlashes(now);
      drawPairs(now);
      drawFreeParticles(now, dt);
    };

    const stopAnimation = () => {
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = null;
      }
    };

    const startAnimation = () => {
      if (
        animationFrame !== null ||
        reduceMotion ||
        !isVisible ||
        !documentVisible
      ) {
        return;
      }

      animationFrame = window.requestAnimationFrame(frame);
    };

    function frame(now: number) {
      animationFrame = null;
      drawScene(now);
      startAnimation();
    }

    const resizeCanvas = () => {
      const bounds = host.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      if (reduceMotion) {
        seedBlackHole();
        seedStars();
        drawStaticScene();
      } else {
        resetScene(performance.now());
        startAnimation();
      }
    };

    const handlePointerMove = (event: MouseEvent) => {
      pointerX = (event.clientX / window.innerWidth) * 2 - 1;
      pointerY = (event.clientY / window.innerHeight) * 2 - 1;
    };

    const handleThemeChange = () => {
      const next = PALETTES[readTheme()];
      if (next === palette) return;
      palette = next;
      // Colours are baked into each star and particle at spawn, so restart
      // the scene rather than let the two palettes mix.
      if (reduceMotion) {
        seedBlackHole();
        seedStars();
        drawStaticScene();
      } else {
        context.clearRect(0, 0, width, height);
        resetScene(performance.now());
      }
    };

    const handleMotionPreference = () => {
      reduceMotion = motionPreference.matches;
      stopAnimation();
      if (reduceMotion) drawStaticScene();
      else {
        resetScene(performance.now());
        startAnimation();
      }
    };

    const handleVisibilityChange = () => {
      documentVisible = !document.hidden;
      if (!documentVisible) {
        stopAnimation();
      } else if (!reduceMotion && isVisible) {
        resetScene(performance.now());
        startAnimation();
      }
    };

    const resizeObserver = new ResizeObserver(resizeCanvas);
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (!isVisible) {
          stopAnimation();
        } else if (!reduceMotion && documentVisible) {
          resetScene(performance.now());
          startAnimation();
        }
      },
      { rootMargin: "80px 0px" },
    );

    const themeObserver = new MutationObserver(handleThemeChange);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    resizeObserver.observe(host);
    intersectionObserver.observe(host);
    motionPreference.addEventListener("change", handleMotionPreference);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    resizeCanvas();

    return () => {
      stopAnimation();
      themeObserver.disconnect();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      motionPreference.removeEventListener("change", handleMotionPreference);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("mousemove", handlePointerMove);
    };
  }, []);

  return (
    <div ref={hostRef} className="matter-flux">
      <canvas ref={canvasRef} aria-hidden="true" />
      <button
        ref={coreRef}
        type="button"
        className="matter-flux-core"
        onClick={handleCollapse}
        title="Collapse the page into the singularity"
      >
        <span className="visually-hidden">
          Collapse the page into the singularity and let it re-expand
        </span>
      </button>
    </div>
  );
};

export default MatterFlux;
