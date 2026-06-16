// Architecture diagrams for this project have been withdrawn while the work is
// private and under active development. The component is kept as a no-op so the
// existing render paths still type-check and build.
interface MesDiagramProps {
  sourceKey: string;
  className?: string;
}

export function MesDiagram({ className = "" }: MesDiagramProps) {
  return <div className={`h-full w-full bg-white p-4 ${className}`} />;
}
