import "./index.css";
import ReactMarkdown from "react-markdown";

const researchInterest = `I investigate **continual learning and memory systems for embodied agents**, focusing on how physical robots retain experience, reduce false-identity updates, and adapt under resource constraints. Related interests include multimodal perception, sim-to-real transfer, and robotic manipulation.`;

// CV PDF lives in public/DataEngine; reference it through the configured base path
const cvPdfUrl = `${import.meta.env.BASE_URL}DataEngine/Yukang%20Shen.pdf`;

const HeroInroductionAcdemic = () => {
  return (
    <header className="hero">
      {/* 左侧头像 */}
      <div className="hero-photo">
        <img src="yukang.jpg" alt="Yukang Shen" />
      </div>

      {/* 右侧文字块 */}
      <div className="hero-text">
        <h1 className="name">Yukang Shen</h1>
        <p className="hero-role">Embodied AI Researcher · Software Engineer</p>
        <p className="hero-title">
          M.S. in Software Engineering, Kennesaw State University · Expected
          November 2026
        </p>
        <p className="hero-desc">
          <ReactMarkdown
            components={{
              // 段落保持默认样式
              p: (props) => <span {...props} />,
              // **加粗** -> 带背景高亮的 strong
              strong: (props) => (
                <span
                  className="font-semibold text-slate-900 bg-amber-100 px-1 rounded"
                  {...props}
                />
              ),
            }}
          >
            {researchInterest}
          </ReactMarkdown>
        </p>

        {/* 链接区域 */}
        <div className="hero-links">
          <a href="mailto:shenyukang99@gmail.com">shenyukang99@gmail.com</a>
          <span>/</span>
          <a
            href="https://scholar.google.com/citations?user=4BWagysAAAAJ&hl=en"
            target="_blank"
            rel="noreferrer"
          >
            Google Scholar
          </a>
          <span>/</span>
          <a
            href="https://github.com/Shen-Yukang"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <span>/</span>
          <a href={cvPdfUrl} target="_blank" rel="noreferrer">
            Full CV (PDF)
          </a>
        </div>
      </div>
    </header>
  );
};

export default HeroInroductionAcdemic;
