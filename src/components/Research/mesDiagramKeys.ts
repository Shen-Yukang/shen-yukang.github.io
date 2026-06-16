// Diagram keys cleared: the corresponding architecture diagrams have been
// withdrawn while this project is kept private.
const mesDiagramKeys = new Set<string>([]);

export function isMesDiagramKey(sourceKey: string) {
  return mesDiagramKeys.has(sourceKey);
}
