import "./index.css";
import { publications, researchProjects } from "@/front_db/cv.config";
import HeroInroductionAcdemic from "@/components/UserInftroduction";
import ResearchProjectView from "@/components/ResearchProjectView";
import Pubication from "@/components/Publication";
import AboutMe from "@/components/UserInftroduction/AboutMe";
import ResearchCredo from "@/components/ResearchCredo";
import ResumeProfile from "@/components/ResumeProfile";
import ThemeToggle from "@/components/ThemeToggle";

const sectionNavigation = [
  { id: "top", label: "Top" },
  { id: "philosophy", label: "Philosophy" },
  { id: "about", label: "About" },
  { id: "background", label: "Background" },
  { id: "research", label: "Research" },
  { id: "publications", label: "Publications" },
] as const;

const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId);
  if (!section) return;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  section.scrollIntoView({
    behavior: reduceMotion ? "auto" : "smooth",
    block: "start",
  });
};

function App() {
  return (
    <div id="top" className="page">
      <ThemeToggle />
      <HeroInroductionAcdemic />
      <nav className="section-nav" aria-label="Navigate to page sections">
        <span className="section-nav__label">Jump to</span>
        <div className="section-nav__track">
          {sectionNavigation.map((item) => (
            <button
              key={item.id}
              type="button"
              className="section-nav__button"
              aria-controls={item.id}
              onClick={() => scrollToSection(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>
      <ResearchCredo />
      <main className="main">
        {/* ====== Section 1: About / Research Background ====== */}
        <section id="about" className="section">
          <AboutMe />
        </section>

        {/* ====== Section 2: Education / Experience / Skills ====== */}
        <ResumeProfile />

        {/* ====== Section 3: Research Projects ====== */}
        <section id="research" className="section">
          <ResearchProjectView researchProjects={researchProjects} />
        </section>

        {/* ====== Section 4: Publications ====== */}
        <section id="publications" className="section">
          <Pubication publications={publications} />
        </section>
      </main>

      <footer className="footer">
        © {new Date().getFullYear()} Yukang Shen · Embodied AI Researcher &
        Software Engineer
      </footer>
    </div>
  );
}

export default App;
