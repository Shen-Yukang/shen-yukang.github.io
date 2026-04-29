// components/research/MethodSection.tsx
import type { ResearchProjectDetail } from '@/front_db/typing';
import { SectionShell } from './SectionShell';
import { getImageUrlByKey } from '@/utlis/dynamicResourceModules';
import { MesDiagram } from './MesDiagram';
import { isMesDiagramKey } from './mesDiagramKeys';

interface MethodSectionProps {
  project: ResearchProjectDetail;
}

export function MethodSection({ project }: MethodSectionProps) {
  const { steps, images, insight, sectionTitle, description } = project.methods;

  return (
    <SectionShell title={sectionTitle} description={description}>
      <ol className="space-y-3 text-sm text-slate-700 list-decimal list-inside">
        {steps.map((step, idx) => (
          <li key={idx}>{step}</li>
        ))}
      </ol>

      {insight ? (
        <aside className="rounded-2xl border border-cyan-100 bg-cyan-50/70 p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-900">
            {insight.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">
            {insight.body}
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {insight.items.map((item) => (
              <div key={item.label} className="rounded-xl bg-white/80 p-3">
                <p className="text-xs font-semibold text-cyan-900">
                  {item.label}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-4 border-l-2 border-cyan-500 pl-3 text-sm font-medium leading-relaxed text-slate-800">
            {insight.punchline}
          </p>
        </aside>
      ) : null}

      <div className="mt-3 space-y-4">
        {images.map((item) => (
          <figure key={item.sourceKey} className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="overflow-hidden rounded-xl bg-slate-100">
              {isMesDiagramKey(item.sourceKey) ? (
                <MesDiagram sourceKey={item.sourceKey} />
              ) : (
              <img
                src={getImageUrlByKey(item.sourceKey)}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                className="h-auto max-h-[760px] w-full object-contain"
              />
              )}
            </div>
            {item.caption ? (
              <figcaption className="mt-3 text-xs leading-relaxed text-slate-500">
                {item.caption}
              </figcaption>
            ) : null}
          </figure>
        ))}
      </div>
    </SectionShell>
  );
}
