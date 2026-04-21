export interface Author {
  name: string;
  image: string; // URL from Sanity Studio profile
}

export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  publishedAt: string;
  mainImage: {
    asset: { url: string };
    alt: string;
  };
  author: Author;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any[];
}
