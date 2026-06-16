// import { getPDFUrlByKey } from "@/utlis/dynamicResourceModules";
import ReactMarkdown from "react-markdown";
import "./index.css";

const introdution = `I am a Graduate Research Assistant at Kennesaw State University, working on **Physical AI** and **continual embodied learning**. My research centers on **multimodal embodied representation learning**, **hierarchical control policies**, and **compact, brain-inspired agent architectures** that let embodied agents adapt continually from physical interaction.

I am currently building a **biologically inspired memory infrastructure for Physical AI** — with modular, brain-region-like memory organization and multi-channel feature learning — to move embodied agents beyond demo-centric pipelines toward integrated perception, memory, safety, and decision-making in a single lifelong-learning architecture. In parallel, I develop **real-calibrated, synthetic-first data engines for medical perception**, with applications such as deltoid injection-site segmentation and safety-zone guidance.`;

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
