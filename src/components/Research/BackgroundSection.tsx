// components/research/BackgroundSection.tsx
import type { ResearchProjectDetail } from '@/front_db/typing';
import { SectionShell } from './SectionShell';
import { getImageUrlByKey } from '@/utlis/dynamicResourceModules';

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

  return (
    <SectionShell title={sectionTitle}>
      <div className="grid gap-8 lg:grid-cols-[3fr,2fr]">
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

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-slate-900">{mediaTitle}</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {images?.map((img) => (
              <div
                key={img.sourceKey}
                className="rounded-2xl overflow-hidden bg-white shadow-sm"
              >
                <div className="aspect-video bg-slate-100">
                  <img
                    src={getImageUrlByKey(img.sourceKey)}
                    alt={img.alt}
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="px-3 py-2 text-xs leading-relaxed text-slate-500">
                  {img.caption}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
