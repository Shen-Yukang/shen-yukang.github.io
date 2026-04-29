// components/research/ResourcesSection.tsx
import type { ResearchProjectDetail } from '@/front_db/typing';
import { SectionShell } from './SectionShell';
import { getPDFUrlByKey } from '@/utlis/dynamicResourceModules';

interface ResourcesSectionProps {
  project: ResearchProjectDetail;
}

export function ResourcesSection({ project }: ResourcesSectionProps) {
  return (
    <SectionShell
      title={project.resources.sectionTitle}
      className="space-y-3 border-t border-dashed border-slate-200 pt-6"
    >
      <ul className="flex flex-wrap gap-3 text-sm">
        {project.resources.links.map((link) => {
          const href = link.pdfSourceKey
            ? getPDFUrlByKey(link.pdfSourceKey)
            : link.href;
          if (!href) return null;

          return (
            <li key={link.label}>
              <a
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
                className="rounded-full border border-slate-200 px-3 py-1 text-slate-700 hover:border-sky-400 hover:text-sky-700"
              >
                {link.label}
              </a>
            </li>
          );
        })}
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
