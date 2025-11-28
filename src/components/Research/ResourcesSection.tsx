// components/research/ResourcesSection.tsx
import type { MedicalAIProject } from '@/front_db/typing';
import { SectionShell } from './SectionShell';
import { getPDFUrlByKey } from '@/utlis/dynamicResourceModules';

interface ResourcesSectionProps {
  project: MedicalAIProject;
}

export function ResourcesSection({ project }: ResourcesSectionProps) {
  return (
    <SectionShell
      title="Resources & Contact"
      className="space-y-3 border-t border-dashed border-slate-200 pt-6"
    >
      <ul className="flex flex-wrap gap-3 text-sm">
        <li>
          <a
            href={project.openSourcedCode}
            className="rounded-full border border-slate-200 px-3 py-1 text-slate-700 hover:border-sky-400 hover:text-sky-700"
          >
            GitHub Code (coming soon)
          </a>
        </li>
        <li>
          <a
            href={project.paper}
            className="rounded-full border border-slate-200 px-3 py-1 text-slate-700 hover:border-sky-400 hover:text-sky-700"
          >
            Paper / Preprint (coming soon)
          </a>
        </li>
        {/* hack 的，临时加的，后续有需求在优化 */}
        <li>  
          <a href={getPDFUrlByKey("Poster-GRM-1245")} target="_blank" rel="noreferrer" className="rounded-full border border-slate-200 px-3 py-1 text-slate-700 hover:border-sky-400 hover:text-sky-700">
            C-day_Event_Poster
          </a>
        </li>
      </ul>
      <p className="text-xs text-slate-500">
        Contact:{' '}
        <a
          href={`mailto:${project.contact.email}`}
          style={{ textDecoration: 'none' }}
          className="font-medium text-sky-700 underline-offset-2 hover:underline"
        >
          {project.contact.email}
        </a>
      </p>

    </SectionShell>
  );
}
