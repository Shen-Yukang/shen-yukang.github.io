import { Link } from "react-router-dom";
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
  return (
    <>
      <h2>Research Experience</h2>
      <p className="section-intro text-slate-700">
        I investigate continual learning and memory systems for embodied agents,
        focusing on how physical robots retain experience, reduce false-identity
        updates, and adapt under resource constraints. Related interests include
        multimodal perception, sim-to-real transfer, and robotic manipulation.
        <span className="ml-[6px] text-xs text-slate-400">
          {`[ Last updated: 08/31/2026 ]`}
        </span>
      </p>

      <div className="project-list">
        {researchProjects.map((proj) => {
          const projectUrl =
            !proj.locked && proj.routeUrl
              ? /^https?:\/\//.test(proj.routeUrl)
                ? proj.routeUrl
                : `${proj.routeUrl}${proj.rp_id ? `/${proj.rp_id}` : ""}`
              : undefined;
          const isExternal = Boolean(
            projectUrl && /^https?:\/\//.test(projectUrl),
          );

          return (
            <article
              key={proj.title}
              className={`project-card${
                projectUrl ? " project-card--linked" : ""
              }`}
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
                <p className="project-description text-sm">
                  {proj.description}
                </p>
                <ul className="mt-2 list-disc pl-5 space-y-1 text-sm text-slate-700">
                  {proj.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                {projectUrl ? (
                  isExternal ? (
                    <a
                      className="project-details-link"
                      href={projectUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      View project details <span aria-hidden="true">→</span>
                    </a>
                  ) : (
                    <Link className="project-details-link" to={projectUrl}>
                      View project details <span aria-hidden="true">→</span>
                    </Link>
                  )
                ) : null}
              </div>

              {/* 右侧 media 区（图片 / 视频） */}
              {proj.media ? (
                <div className="project-media">
                  {proj.media.type === "image" &&
                  isMesDiagramKey(proj.media.sourceKey) ? (
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
                        aria-label={proj.media.alt}
                        className="rounded-xl w-full shadow"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                      />
                    </div>
                  )}
                </div>
              ) : null}
            </article>
          );
        })}
      </div>
    </>
  );
};

export default ResearchProjectView;
