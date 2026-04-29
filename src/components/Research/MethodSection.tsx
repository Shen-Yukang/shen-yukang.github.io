// components/research/MethodSection.tsx
import type { ResearchProjectDetail } from '@/front_db/typing';
import { SectionShell } from './SectionShell';
import { getImageUrlByKey } from '@/utlis/dynamicResourceModules';

interface MethodSectionProps {
  project: ResearchProjectDetail;
}

export function MethodSection({ project }: MethodSectionProps) {
  const { steps, images, sectionTitle, description } = project.methods;

  return (
    <SectionShell title={sectionTitle} description={description}>
      <ol className="space-y-3 text-sm text-slate-700 list-decimal list-inside">
        {steps.map((step, idx) => (
          <li key={idx}>{step}</li>
        ))}
      </ol>

      <div className="mt-3 rounded-2xl bg-white p-4 shadow-sm">
        <div className="aspect-video rounded-xl bg-slate-200 overflow-hidden">
          {images.map((item) => (
            <img
              key={item.sourceKey}
              src={getImageUrlByKey(item.sourceKey)}
              alt={item.alt}
              className="h-full w-full object-cover"
            />
          ))}
        </div>
        {images[0]?.caption ? (
          <p className="mt-3 text-xs leading-relaxed text-slate-500">
            {images[0].caption}
          </p>
        ) : null}
      </div>
    </SectionShell>
  );
}
