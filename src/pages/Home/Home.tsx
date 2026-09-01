import "./index.css";
import { publications, researchProjects } from "@/front_db/cv.config";
import HeroInroductionAcdemic from "@/components/UserInftroduction";
import ResearchProjectView from "@/components/ResearchProjectView";
import Pubication from "@/components/Publication";
import AboutMe from "@/components/UserInftroduction/AboutMe";
import ResearchCredo from "@/components/ResearchCredo";
import ResumeProfile from "@/components/ResumeProfile";

function App() {
  return (
    <div className="page">
      <HeroInroductionAcdemic />
      <ResearchCredo />
      <main className="main">
        {/* ====== Section 1: About / Research Background ====== */}
        <section className="section">
          <AboutMe />
        </section>

        {/* ====== Section 2: Education / Experience / Skills ====== */}
        <ResumeProfile />

        {/* ====== Section 3: Research Projects ====== */}
        <section className="section">
          <ResearchProjectView researchProjects={researchProjects} />
        </section>

        {/* ====== Section 4: Publications ====== */}
        <section className="section">
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
