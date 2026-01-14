export interface SearchProduct {
  id: string;
  name: string;
  slug: string;
}

export interface SearchProductsResult {
  found: boolean;
  products?: SearchProduct[];
}
