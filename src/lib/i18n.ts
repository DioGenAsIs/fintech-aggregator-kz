export const locales = ["kk", "ru"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "kk";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export type AmountBucket = "50k" | "100k" | "200k" | "200k_plus";
export type TermBucket = "7" | "14" | "30" | "30_plus";

export const amountBucketMap: Record<AmountBucket, number> = {
  "50k": 50000,
  "100k": 100000,
  "200k": 200000,
  "200k_plus": 300000,
};

export const termBucketMap: Record<TermBucket, number> = {
  "7": 7,
  "14": 14,
  "30": 30,
  "30_plus": 45,
};
