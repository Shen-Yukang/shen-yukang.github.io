import { getPDFUrlByKey } from "@/utlis/dynamicResourceModules";

import "./index.css";
import ReactMarkdown from "react-markdown";

const ResearchInterest = `Cross-disciplinary spatial perception, physics-informed sensing, embodied intelligence for medical and healthcare scenario.`;

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

        <p className="hero-title">
          Graduate Research Assistant · M.S. Software Engineering, Kennesaw
          State University
        </p>

        <p className="hero-desc">
          <strong>Research Interest:</strong>
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
            {ResearchInterest}
          </ReactMarkdown>
        </p>

        {/* 链接区域 */}
        <div className="hero-links">
          <a href="mailto:shenyukang99@gmail.com">shenyukang99@gmail.com</a>
          <span>/</span>
          <a
            href="https://scholar.google.com/citations?user=4BWagysAAAAJ&hl=en"
            target="_blank"
          >
            Google Scholar
          </a>
          <span>/</span>
          <a href="https://github.com/Shen-Yukang" target="_blank">
            GitHub
          </a>
          <span>/</span>
          <a
            href={getPDFUrlByKey("phD_CV_Yukang")}
            target="_blank"
            rel="noreferrer"
          >
            Full CV (PDF)
          </a>
        </div>
      </div>
    </header>
  );
};

export default HeroInroductionAcdemic;
