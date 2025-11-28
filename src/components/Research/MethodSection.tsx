// components/research/MethodSection.tsx
import type { MedicalAIProject } from '@/front_db/typing';
import { SectionShell } from './SectionShell';
import { getImageUrlByKey } from '@/utlis/dynamicResourceModules';

interface MethodSectionProps {
  project: MedicalAIProject;
}

export function MethodSection({ project }: MethodSectionProps) {
  const { steps, images } = project.methods;

  return (
    <SectionShell
      title="Method Design & Data Engine"
      description="The system is organized as a high-efficiency data engine plus a safety-aware perception module:"
    >
      <ol className="space-y-3 text-sm text-slate-700 list-decimal list-inside">
        {steps.map((step, idx) => (
          <li key={idx}>{step}</li>
        ))}
      </ol>

      <div className="mt-3 rounded-2xl bg-white p-4 shadow-sm">
        <div className="aspect-video rounded-xl bg-slate-200">
          {/* 如果只有一张图，可以只取 images[0] */}
          {images.map((item) => (
            <img
              key={item.sourceKey}
              src={getImageUrlByKey(item.sourceKey)}
              alt={item.alt}
              className="h-full w-full"
            />
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
