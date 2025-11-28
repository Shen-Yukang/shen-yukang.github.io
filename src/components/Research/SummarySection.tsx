// components/research/SummarySection.tsx
import type { MedicalAIProject } from '@/front_db/typing';
import { SectionShell } from './SectionShell';
import ReactMarkdown from 'react-markdown';

function SummaryCard({ title, content }: { title: string; content: string }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {title}
      </h3>

      <div className="mt-2 text-sm text-slate-700 leading-relaxed">

      <ReactMarkdown
        components={{
          // 段落保持默认样式
          p: (props) => <p {...props} />,
          // **加粗** -> 带背景高亮的 strong
          strong: (props) => (
            <strong className="font-semibold text-slate-900 bg-amber-100 px-1 rounded" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
      </div>
    </div>
  );
}

interface SummarySectionProps {
  project: MedicalAIProject;
}

export function SummarySection({ project }: SummarySectionProps) {
  const { problem, theme, result } = project.summary;

  return (
    <SectionShell className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-3">
        <SummaryCard title="Problem" content={problem} />
        <SummaryCard title="Theme" content={theme} />
        <SummaryCard title="Outcome" content={result} />
      </div>
    </SectionShell>
  );
}
