function Arrow() {
  return <span className="hidden text-slate-300 md:inline">→</span>;
}

function StepBox({
  label,
  detail,
  tone = "slate",
}: {
  label: string;
  detail: string;
  tone?: "slate" | "sky" | "emerald" | "amber" | "rose";
}) {
  const toneClass = {
    slate: "border-slate-200 bg-slate-50 text-slate-900",
    sky: "border-sky-200 bg-sky-50 text-sky-950",
    emerald: "border-emerald-200 bg-emerald-50 text-emerald-950",
    amber: "border-amber-200 bg-amber-50 text-amber-950",
    rose: "border-rose-200 bg-rose-50 text-rose-950",
  }[tone];

  return (
    <div className={`rounded-lg border px-3 py-2 ${toneClass}`}>
      <p className="text-xs font-semibold">{label}</p>
      <p className="mt-1 text-[11px] leading-snug text-slate-600">{detail}</p>
    </div>
  );
}

function RuntimeDiagram() {
  return (
    <div className="space-y-3">
      <div className="flex flex-col items-stretch gap-2 md:flex-row md:items-center">
        <StepBox label="Embodied Trace" detail="video, states, actions, outcome" />
        <Arrow />
        <StepBox
          label="Projection"
          detail="before-state, action, after-state"
          tone="sky"
        />
        <Arrow />
        <StepBox
          label="MemoryIR"
          detail="structured transition + summary + embedding"
          tone="emerald"
        />
      </div>
      <div className="flex flex-col items-stretch gap-2 md:flex-row md:items-center">
        <StepBox
          label="Lifecycle Control"
          detail="write, merge, compress, stub, forget"
          tone="amber"
        />
        <Arrow />
        <StepBox
          label="Retrieval & Scoring"
          detail="risk warning, action prior, repair hint"
          tone="sky"
        />
        <Arrow />
        <StepBox
          label="VLA / Planner"
          detail="downstream system still executes"
          tone="slate"
        />
      </div>
    </div>
  );
}

function LifecycleDiagram() {
  const decisions = [
    ["Write", "new useful experience"],
    ["Merge", "repeated supported pattern"],
    ["Compress", "abstraction under budget"],
    ["Stub", "cheap recoverable pointer"],
    ["Forget", "only if coverage remains safe"],
  ];

  return (
    <div className="space-y-3">
      <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
        <p className="text-xs font-semibold text-slate-900">Candidate Memory</p>
        <p className="mt-1 text-[11px] leading-snug text-slate-600">
          action-conditioned transition with evidence refs and utility signals
        </p>
      </div>
      <div className="grid gap-2 sm:grid-cols-5">
        {decisions.map(([label, detail]) => (
          <StepBox key={label} label={label} detail={detail} tone="emerald" />
        ))}
      </div>
      <div className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2">
        <p className="text-xs font-semibold text-rose-950">Risk Coverage Guard</p>
        <p className="mt-1 text-[11px] leading-snug text-slate-700">
          safety-relevant memories cannot be removed if risk coverage falls below
          the required threshold.
        </p>
      </div>
    </div>
  );
}

function IntegrationDiagram() {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      <StepBox
        label="Stage A"
        detail="prove MemoryIR substrate: lifecycle, retrieval, evidence"
        tone="emerald"
      />
      <StepBox
        label="Stage B"
        detail="inject memory into prompts, reranking, gates, TAMP constraints"
        tone="sky"
      />
      <StepBox
        label="Stage C"
        detail="turn validated memory into training data, tokens, and transfer"
        tone="amber"
      />
    </div>
  );
}

interface MesDiagramProps {
  sourceKey: string;
  className?: string;
}

export function MesDiagram({ sourceKey, className = "" }: MesDiagramProps) {
  return (
    <div className={`h-full w-full bg-white p-4 ${className}`}>
      {sourceKey === "mes_stage_a_runtime" ? <RuntimeDiagram /> : null}
      {sourceKey === "mes_stage_a_lifecycle" ? <LifecycleDiagram /> : null}
      {sourceKey === "mes_integration_ladder" ? <IntegrationDiagram /> : null}
    </div>
  );
}
