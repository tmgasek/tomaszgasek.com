export interface Post {
  title: string;
  slug: {
    current: string;
  };
  publishedAt: string;
  featured: boolean;
  excerpt: string;
  content: string;
  author: {
    name: string;
    image: {
      asset: {
        url: string;
      };
    };
  };
  mainImage: {
    asset: {
      url: string;
    };
  };
}

export interface Hm {}
