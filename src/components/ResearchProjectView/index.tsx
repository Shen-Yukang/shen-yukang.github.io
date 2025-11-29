import { useNavigate } from "react-router";
import "./index.css";
import {
  getImageUrlByKey,
  getVideoUrlByKey,
} from "@/utlis/dynamicResourceModules";
import type { ResearchProject } from "@/front_db/typing";

interface ResearchProjectViewProps {
  researchProjects: ResearchProject[];
}

const ResearchProjectView = ({
  researchProjects,
}: ResearchProjectViewProps) => {
  const navigate = useNavigate();
  const handleClick = (proj: ResearchProject) => {
    if (!proj.routeUrl) return;
    // 如果是外部链接
    if (/^https?:\/\//.test(proj.routeUrl)) {
      window.open(proj.routeUrl, "_blank"); // 新窗口打开
      return;
    }
    // 内部路由
    navigate(`${proj.routeUrl}${proj.rp_id ? "/" + proj.rp_id : ""}`);
  };
  return (
    <>
      <h2>Research(In Progress)</h2>
      <p className="section-intro text-slate-700">
        I currently work on synthetic-first pipelines and safety-aware
        perception modules for embodied AI systems, with a focus on medical
        injection scenarios, and robust VLA safety.
        <span className="ml-[6px] text-xs text-slate-400">
          {`[ Last updated: 11/22/2025 ]`}
        </span>
      </p>

      <div className="project-list">
        {researchProjects.map((proj) => (
          <article
            key={proj.title}
            className="project-card"
            onClick={() => handleClick(proj)}
          >
            {/* 左侧文字区 */}
            <div className="project-main">
              <div className="project-header">
                <h3>{proj.title}</h3>
                <div>
                  {proj.tags.map((tag) => {
                    return (
                      <span
                        className="project-tag"
                        style={{
                          backgroundColor: tag.color,
                          color: tag.fontColor,
                        }}
                      >
                        {tag.text}
                      </span>
                    );
                  })}
                </div>
              </div>
              <p className="project-meta">{proj.time}</p>
              <p className="project-description text-sm">{proj.description}</p>
              <ul className="mt-2 list-disc pl-5 space-y-1 text-sm text-slate-700">
                {proj.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>

            {/* 右侧 media 区（图片 / 视频 / 预留空位） */}
            <div className="project-media">
              {proj.media ? (
                proj.media.type === "image" ? (
                  <img
                    src={getImageUrlByKey(proj.media.sourceKey)}
                    alt={proj.media.alt}
                    className="project-media-img"
                  />
                ) : (
                  <div className="project-media-video-wrapper">
                    <video
                      src={getVideoUrlByKey(proj.media.sourceKey)}
                      controls
                      className="rounded-xl w-full shadow"
                      autoPlay={false}
                      muted={false}
                    />
                  </div>
                )
              ) : (
                <div className="project-media-placeholder">
                  {/* 没有 media 的时候可以留白，或者写 Coming soon */}
                  {/* <span>Media coming soon</span> */}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </>
  );
};

export default ResearchProjectView;
