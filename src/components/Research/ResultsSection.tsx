// components/research/ResultsSection.tsx
import type { MedicalAIProject } from '@/front_db/typing';
import { SectionShell } from './SectionShell';
import { getImageUrlByKey, getVideoUrlByKey } from '@/utlis/dynamicResourceModules';

interface ResultsSectionProps {
  project: MedicalAIProject;
}

export function ResultsSection({ project }: ResultsSectionProps) {
  const figs = project.resultsImages ?? [];

  return (
    <SectionShell
      title="Evaluation & Key Results"
      description="We summarize core quantitative results and synthetic→real generalization."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {figs.map((fig) => (
          <div
            key={fig.sourceKey}
            className="rounded-2xl overflow-hidden bg-white shadow"
          >
            <div className="aspect-video bg-slate-100">
              {fig.type === 'video' ? (
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
              <p className="text-xs text-slate-500 p-3">{fig.caption}</p>
            )}
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
