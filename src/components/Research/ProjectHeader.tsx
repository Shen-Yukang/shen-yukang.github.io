// components/research/ProjectHeader.tsx
import type { MedicalAIProject } from '@/front_db/typing';

interface ProjectHeaderProps {
  project: MedicalAIProject;
}

export function ProjectHeader({ project }: ProjectHeaderProps) {
  return (
    <header className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-600">
        Research Project
      </p>
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        {project.title}
      </h1>
      <p className="text-sm text-slate-600">{project.subtitle}</p>
    </header>
  );
}
