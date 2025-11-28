// src/components/Research/SectionShell.tsx
import type { ReactNode } from 'react';

interface SectionShellProps {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function SectionShell({
  title,
  description,
  children,
  className = '',
}: SectionShellProps) {
  return (
    <section className={`space-y-4 ${className}`}>
      {title && (
        <h2 className="text-xl font-semibold text-slate-900">
          {title}
        </h2>
      )}
      {description && (
        <p className="text-sm text-slate-700">
          {description}
        </p>
      )}
      {children}
    </section>
  );
}
