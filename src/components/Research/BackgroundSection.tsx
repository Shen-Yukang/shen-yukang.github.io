// components/research/BackgroundSection.tsx
import type { ResearchProjectDetail } from '@/front_db/typing';
import { SectionShell } from './SectionShell';
import { getImageUrlByKey } from '@/utlis/dynamicResourceModules';
import { MesDiagram } from './MesDiagram';
import { isMesDiagramKey } from './mesDiagramKeys';

function BackgroundQA({ q, a }: { q: string; a: string }) {
  return (
    <div className="rounded-xl bg-slate-50 px-3 py-2">
      <p className="text-xs font-semibold text-slate-900">{q}</p>
      <p className="mt-1 text-xs text-slate-700">{a}</p>
    </div>
  );
}

interface BackgroundSectionProps {
  project: ResearchProjectDetail;
}

export function BackgroundSection({ project }: BackgroundSectionProps) {
  const { intro, challenges, images, sectionTitle, challengesTitle, mediaTitle } =
    project.background;
  const hasMedia = images.length > 0;
  const usesHtmlDiagrams = images.some((img) => isMesDiagramKey(img.sourceKey));

  return (
    <SectionShell title={sectionTitle}>
      <div
        className={`grid gap-8 ${
          hasMedia
            ? usesHtmlDiagrams
              ? "lg:grid-cols-[1.15fr,1fr]"
              : "lg:grid-cols-[3fr,2fr]"
            : "grid-cols-1"
        }`}
      >
        <div className="space-y-4">
          <p className="text-sm leading-relaxed text-slate-700">{intro}</p>

          <div className="mt-4 space-y-3 rounded-2xl bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {challengesTitle}
            </p>
            {challenges.map((item) => (
              <BackgroundQA
                key={item.question}
                q={item.question}
                a={item.answer}
              />
            ))}
          </div>
        </div>

        {hasMedia ? (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-slate-900">{mediaTitle}</h3>

          <div
            className={`grid gap-3 ${
              usesHtmlDiagrams
                ? "grid-cols-1"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {images?.map((img) => (
              <div
                key={img.sourceKey}
                className="rounded-2xl overflow-hidden bg-white shadow-sm"
              >
                <div className="bg-slate-100">
                  {isMesDiagramKey(img.sourceKey) ? (
                    <MesDiagram sourceKey={img.sourceKey} />
                  ) : (
                    <img
                      src={getImageUrlByKey(img.sourceKey)}
                      alt={img.alt}
                      className="h-auto w-full object-contain"
                    />
                  )}
                </div>
                <p className="px-3 py-2 text-xs leading-relaxed text-slate-500">
                  {img.caption}
                </p>
              </div>
            ))}
          </div>
        </div>
        ) : null}
      </div>
    </SectionShell>
  );
}
