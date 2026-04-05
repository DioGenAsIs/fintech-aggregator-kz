export type Offer = {
  id: string;
  name: string;
  logoText: string;
  goPath: string;
  minAmount: number;
  maxAmount: number;
  minTerm: number;
  maxTerm: number;
  rateTextRu: string;
  rateTextKk: string;
  gesvMax?: number;
  featuresRu: string[];
  featuresKk: string[];
  priority: number;
  badgesRu?: string[];
  badgesKk?: string[];
};
