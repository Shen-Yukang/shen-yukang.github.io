// import { getPDFUrlByKey } from "@/utlis/dynamicResourceModules";
import ReactMarkdown from "react-markdown";
import "./index.css";

const introdution = `I am a Graduate Research Assistant at Kennesaw State University. My research focuses on **high-precision spatial perception**, **spatial reasoning**, **world models**, and **agent-centric learning frameworks** for embodied intelligence.

**My work aims to build system-level embodied AI agents** that integrate perception, reasoning, and action for safe and reliable deployment in real-world environments. The current focus includes interpretable and safety-aware perception systems with applications in **medical and rehabilitation technologies**, aiming to translate embodied AI research into practical clinical systems.`;

const AboutMe = () => {
  return (
    <>
      <h2>About</h2>
      <ReactMarkdown
        components={{
          // 段落保持默认样式
          p: (props) => <p {...props} />,
          // **加粗** -> 带背景高亮的 strong
          // strong: (props) => (
          //   <strong
          //     className="font-semibold text-slate-900 bg-amber-100 px-1 rounded"
          //     {...props}
          //   />
          // ),
        }}
      >
        {introdution}
      </ReactMarkdown>
    </>
  );
};

export default AboutMe;
