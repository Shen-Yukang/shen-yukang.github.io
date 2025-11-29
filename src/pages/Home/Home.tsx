import "./index.css";
import { publications, researchProjects } from "@/front_db/cv.config";
import HeroInroductionAcdemic from "@/components/UserInftroduction";
import ResearchProjectView from "@/components/ResearchProjectView";
import Pubication from "@/components/Publication";
import AboutMe from "@/components/UserInftroduction/AboutMe";

function App() {
  return (
    <div className="page">
      <HeroInroductionAcdemic />
      <main className="main">
        {/* ====== Section 1: About / Research Background ====== */}
        <section className="section">
          <AboutMe />
        </section>

        {/* ====== Section 2: Research Projects ====== */}
        <section className="section">
          <ResearchProjectView researchProjects={researchProjects} />
        </section>

        {/* ====== Section 3: Publications ====== */}
        <section className="section">
          <Pubication publications={publications} />
        </section>
      </main>

      <footer className="footer">
        © {new Date().getFullYear()} Yukang Shen · Built with React & Vite
        <br />
        Version-"{new Date().toLocaleDateString()}"
      </footer>
    </div>
  );
}

export default App;
