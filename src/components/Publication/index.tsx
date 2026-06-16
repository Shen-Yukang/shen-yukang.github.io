import { getImageUrlByKey, getVideoUrlByKey } from '@/utlis/dynamicResourceModules'
import './index.css'
import type { Publication } from '@/front_db/typing'
interface PublicationProps {
  publications: Publication[];
}

const Pubication = ({publications}:PublicationProps) =>{
return (
    <>
        <h2>Publications</h2>
        <ul className="pub-list">
        {publications.map((p) => (
            <a key={p.title} className="pub-item" href={p.url} style={{textDecoration:"none", color:"inherit"}}>
            <div className="pub-main">
                <span className="pub-year">{p.year}</span>
                <div className="pub-title">{p.title}</div>
                <div className="pub-authors">{p.authors}</div>
                <div className="pub-venue">{p.venue}</div>
            </div>
            <div className="pub-media">
                {p.media &&
                  (p.media.type === "video" ? (
                    <video
                      src={getVideoUrlByKey(p.media.sourceKey)}
                      className="pub-media-img"
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
                  ))}
            </div>
            </a>
        ))}
        </ul>
    </>
)
}

export default Pubication