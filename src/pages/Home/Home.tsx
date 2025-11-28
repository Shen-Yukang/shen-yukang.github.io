import "./index.css";
import {publications,researchProjects} from "@/front_db/cv.config";
import HeroInroductionAcdemic from "@/components/UserInftroduction";
import ResearchProjectView from "@/components/ResearchProjectView";
import Pubication from "@/components/Publication";

function App() {
  
  return (
    <div className="page">
      <HeroInroductionAcdemic />
      <main className="main">
        {/* ====== Section 1: About / Research Background ====== */}
        <section className="section">
          <h2>About</h2>
          <p>
           I am a Graduate Research Assistant at Kennesaw State University working on synthetic-first perception, high-precision spatial reasoning, and data-centric embodied AI (Vision–Language–Action systems) for medical and healthcare applications.
          </p>
          <p>
            My research focuses on designing synthetic-first pipelines, multi-stage perception systems (segmentation → keypoints → geometry), uncertainty modeling, and safety-aware visual guidance for deltoid intramuscular injection and AR-assisted procedures.
          </p>
          <p>Prior to academia, I worked as a Software Engineer at <strong>SenseTime</strong> (CIT team), building AR-assisted navigation platforms and engineering systems for large-scale CV applications. I also previously worked at <strong>Baidu</strong> as a intern.
        </p>
          <p className="about-keywords">
            <strong>Research interests:</strong> Cross-disciplinary spatial perception, physics-informed sensing, embodied intelligence for medical and healthcare scenario.
          </p>
        </section>

        {/* ====== Section 2: Research Projects ====== */}
        <section className="section">
          <ResearchProjectView researchProjects={researchProjects}/>
        </section>

        {/* ====== Section 3: Publications ====== */}
        <section className="section">
          <Pubication publications={publications}/>
        </section>
      </main>

      <footer className="footer">
        © {new Date().getFullYear()} Yukang Shen · Built with React & Vite
      </footer>
    </div>
  );
}

export default App;
