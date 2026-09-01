// import { getPDFUrlByKey } from "@/utlis/dynamicResourceModules";
import ReactMarkdown from "react-markdown";
import "./index.css";

const introduction = `I am an **embodied AI researcher and software engineer** pursuing an M.S. in Software Engineering at Kennesaw State University. My research asks how physical robots can retain experience without confusing visually similar objects, and how they can keep adapting when compute and memory are limited.

My current work centers on **continual learning and memory systems for embodied agents**, with related interests in multimodal perception, sim-to-real transfer, and robotic manipulation. Before focusing on research, I built enterprise products at SenseTime across web, mobile, desktop, and integrated hardware, grounding my research in production software and real-world constraints.`;

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
        {introduction}
      </ReactMarkdown>
    </>
  );
};

export default AboutMe;
