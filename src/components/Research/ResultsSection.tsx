// components/research/ResultsSection.tsx
import type { ResearchProjectDetail } from "@/front_db/typing";
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

export function ResultsSection({ project }: ResultsSectionProps) {
  const { figures, sectionTitle, description, comparison } = project.results;

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {figures.map((fig) => (
          <div
            key={fig.sourceKey}
            className={`rounded-2xl overflow-hidden bg-white shadow ${
              fig.type === "video" ? "sm:col-span-2 lg:col-span-3" : ""
            }`}
          >
            <div className={fig.type === "video" ? "aspect-video bg-black" : "bg-slate-100"}>
              {fig.type === "video" ? (
                <video
                  src={getVideoUrlByKey(fig.sourceKey)}
                  controls
                  className="h-full w-full bg-black"
                  autoPlay
                  muted
                  playsInline
                />
              ) : isMesDiagramKey(fig.sourceKey) ? (
                <MesDiagram sourceKey={fig.sourceKey} />
              ) : (
                <img
                  src={getImageUrlByKey(fig.sourceKey)}
                  alt={fig.alt}
                  className="h-auto w-full object-contain"
                />
              )}
            </div>
            {fig.caption && (
              <p
                className={`text-xs text-slate-500 p-3
                ${fig.url ? "cursor-pointer text-blue-500 hover:underline" : ""}
                `}
                onClick={() => {
                  if (fig.url) window.open(fig.url, "_blank");
                }}
              >
                {fig.caption}
              </p>
            )}
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
