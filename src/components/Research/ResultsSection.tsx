// components/research/ResultsSection.tsx
import type { ResearchProjectDetail } from "@/front_db/typing";
import { SectionShell } from "./SectionShell";
import {
  getImageUrlByKey,
  getVideoUrlByKey,
} from "@/utlis/dynamicResourceModules";

interface ResultsSectionProps {
  project: ResearchProjectDetail;
}

export function ResultsSection({ project }: ResultsSectionProps) {
  const { figures, sectionTitle, description } = project.results;

  return (
    <SectionShell title={sectionTitle} description={description}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {figures.map((fig) => (
          <div
            key={fig.sourceKey}
            className="rounded-2xl overflow-hidden bg-white shadow"
          >
            <div className="aspect-video bg-slate-100">
              {fig.type === "video" ? (
                <video
                  src={getVideoUrlByKey(fig.sourceKey)}
                  controls
                  className="h-full w-full"
                  autoPlay
                  muted
                />
              ) : (
                <img
                  src={getImageUrlByKey(fig.sourceKey)}
                  alt={fig.alt}
                  className="h-full w-full"
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
