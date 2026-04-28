export const allPostsQuery = `
  *[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    mainImage {
      asset-> { url },
      alt
    },
    author {
      name,
      image
    }
  }
`;

export const postBySlugQuery = `
  *[_type == "post" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    mainImage {
      asset-> { url },
      alt
    },
    body,
    author {
      name,
      image
    }
  }
`;
