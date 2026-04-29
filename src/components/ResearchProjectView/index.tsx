import { useNavigate } from "react-router";
import "./index.css";
import {
  getImageUrlByKey,
  getVideoUrlByKey,
} from "@/utlis/dynamicResourceModules";
import type { ResearchProject } from "@/front_db/typing";
import { MesDiagram } from "@/components/Research/MesDiagram";
import { isMesDiagramKey } from "@/components/Research/mesDiagramKeys";

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
        My current work spans embodied memory substrates, safety-aware decision
        support for VLA systems, and synthetic-first perception pipelines for
        high-stakes human-centered scenarios.
        <span className="ml-[6px] text-xs text-slate-400">
          {`[ Last updated: 04/29/2026 ]`}
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
                        key={`${proj.title}-${tag.text}`}
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
                proj.media.type === "image" && isMesDiagramKey(proj.media.sourceKey) ? (
                  <div className="project-media-img overflow-hidden bg-white">
                    <MesDiagram sourceKey={proj.media.sourceKey} />
                  </div>
                ) : proj.media.type === "image" ? (
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
