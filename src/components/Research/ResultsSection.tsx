// components/research/ResultsSection.tsx
import type {
  ResearchFigure,
  ResearchProjectDetail,
} from "@/front_db/typing";
import { SectionShell } from "./SectionShell";
import {
  getImageUrlByKey,
  getVideoUrlByKey,
} from "@/utlis/dynamicResourceModules";
import { MesDiagram } from "./MesDiagram";
import { isMesDiagramKey } from "./mesDiagramKeys";

interface ResultsSectionProps {
  project: ResearchProjectDetail;
}

function ResultFigureCard({ figure }: { figure: ResearchFigure }) {
  const isVideo = figure.type === "video";

  return (
    <figure className="overflow-hidden rounded-2xl bg-white shadow">
      <div className={isVideo ? "aspect-video bg-black" : "bg-slate-100"}>
        {isVideo ? (
          <video
            src={getVideoUrlByKey(figure.sourceKey)}
            controls
            aria-label={figure.alt}
            className="h-full w-full bg-black object-contain"
            autoPlay
            muted
            playsInline
            preload="metadata"
          />
        ) : isMesDiagramKey(figure.sourceKey) ? (
          <MesDiagram sourceKey={figure.sourceKey} />
        ) : (
          <img
            src={getImageUrlByKey(figure.sourceKey)}
            alt={figure.alt}
            className="h-auto w-full object-contain"
          />
        )}
      </div>

      {figure.caption ? (
        <figcaption className="p-3 text-xs text-slate-500">
          {figure.url ? (
            <a
              href={figure.url}
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 hover:underline"
            >
              {figure.caption}
            </a>
          ) : (
            figure.caption
          )}
        </figcaption>
      ) : null}
    </figure>
  );
}

export function ResultsSection({ project }: ResultsSectionProps) {
  const { figures, sectionTitle, description, comparison } = project.results;
  const imageFigures = figures.filter((figure) => figure.type !== "video");
  const videoFigures = figures.filter((figure) => figure.type === "video");

  return (
    <SectionShell title={sectionTitle} description={description}>
      {comparison ? (
        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-emerald-900">
              {comparison.leftTitle}
            </h3>
            <pre className="mt-3 whitespace-pre-wrap rounded-xl bg-emerald-50 p-3 text-xs leading-relaxed text-slate-800">
              {comparison.leftInput}
            </pre>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900">
              {comparison.rightTitle}
            </h3>
            <pre className="mt-3 whitespace-pre-wrap rounded-xl bg-slate-50 p-3 text-xs leading-relaxed text-slate-800">
              {comparison.rightInput}
            </pre>
          </article>
        </div>
      ) : null}

      {imageFigures.length ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {imageFigures.map((figure) => (
            <ResultFigureCard key={figure.sourceKey} figure={figure} />
          ))}
        </div>
      ) : null}

      {videoFigures.length ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {videoFigures.map((figure) => (
            <ResultFigureCard key={figure.sourceKey} figure={figure} />
          ))}
        </div>
      ) : null}
    </SectionShell>
  );
}
