const mesDiagramKeys = new Set([
  "mes_stage_a_runtime",
  "mes_stage_a_lifecycle",
  "mes_integration_ladder",
]);

export function isMesDiagramKey(sourceKey: string) {
  return mesDiagramKeys.has(sourceKey);
}
