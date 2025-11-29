// import { getPDFUrlByKey } from "@/utlis/dynamicResourceModules";
import ReactMarkdown from "react-markdown";
import "./index.css";

const introdution = `I am currently a graduate assistant at KSU. My research focuses on **physics-informed, high-precision spatial perception**. I study how models learn geometric structure, spatial relationships, and reliable measurements from visual and multimodal inputs, and how these capabilities can support interpretable and safe decision-making.

While my work centers on the foundations of spatial intelligence, I am especially interested in applications in **medical and rehabilitation technology**. From the experiences and health challenges I have observed around me, I believe accessible and trustworthy rehabilitation technologies will play an increasingly important role. This motivates my interest in building perception systems that are accurate, reliable, and suitable for real-world clinical settings.

Given the limitations of current AI—particularly in explainability and precision—I pursue **cross-disciplinary strategies** to achieve robust spatial understanding that can truly enable safe and affordable medical robotics.`;

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
