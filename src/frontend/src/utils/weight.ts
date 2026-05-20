export function gramsToKg(grams: number): number {
  return grams / 1000;
}

export function kgToGrams(kg: number): number {
  return kg * 1000;
}

export function formatWeight(grams: number | undefined): string {
  if (!grams) return "";
  const kg = gramsToKg(grams);
  if (kg < 0.1) {
    return `${grams}g`;
  }
  return `${kg.toFixed(1)}kg`;
}

export function parseWeightToGrams(kgString: string): bigint | undefined {
  const kg = Number.parseFloat(kgString);
  if (Number.isNaN(kg) || kg <= 0) return undefined;
  return BigInt(Math.round(kgToGrams(kg)));
}
