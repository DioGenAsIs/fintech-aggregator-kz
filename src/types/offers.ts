export type Offer = {
  id: string;
  name: string;
  logoText: string;
  goPath: string;
  maxAmountKzt: number;
  minTermDays: number;
  maxTermDays: number;
  rateTextRu: string;
  rateTextKk: string;
  gesvMax?: number;
  featuresRu: string[];
  featuresKk: string[];
  priority: number;
  badgesRu?: string[];
  badgesKk?: string[];
};
