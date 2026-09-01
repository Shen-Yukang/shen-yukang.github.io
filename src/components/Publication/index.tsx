import { getImageUrlByKey, getVideoUrlByKey } from '@/utlis/dynamicResourceModules'
import './index.css'
import type { Publication } from '@/front_db/typing'
interface PublicationProps {
  publications: Publication[];
}

const Pubication = ({publications}:PublicationProps) =>{
return (
    <>
        <h2>Publications &amp; Patent</h2>
        <ul className="pub-list">
        {publications.map((p) => {
          const isExternal = Boolean(p.url && /^https?:\/\//.test(p.url));
          const content = (
            <>
              <div className="pub-main">
                {p.year && <span className="pub-year">{p.year}</span>}
                <div className="pub-title">{p.title}</div>
                {p.authors && <div className="pub-authors">{p.authors}</div>}
                <div className="pub-venue">{p.venue}</div>
              </div>
              {p.media && (
                <div className="pub-media">
                  {p.media.type === "video" ? (
                    <video
                      src={getVideoUrlByKey(p.media.sourceKey)}
                      className="pub-media-img"
                      aria-label={p.media.alt}
                      controls
                      muted
                      playsInline
                      preload="metadata"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                    />
                  ) : (
                    <img
                      src={getImageUrlByKey(p.media.sourceKey)}
                      alt={p.media.alt}
                      className="pub-media-img"
                    />
                  )}
                </div>
              )}
            </>
          );

          return (
            <li key={p.title}>
              {p.url ? (
                <a
                  className="pub-item"
                  href={p.url}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noreferrer noopener" : undefined}
                  aria-label={
                    isExternal ? `${p.title} (opens in a new tab)` : undefined
                  }
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {content}
                </a>
              ) : (
                <div className="pub-item" style={{ cursor: "default" }}>
                  {content}
                </div>
              )}
            </li>
          );
        })}
        </ul>
    </>
)
}

export default Pubication
