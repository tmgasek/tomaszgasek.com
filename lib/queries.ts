import { getSanityContent } from "../utils/sanity";

export const getAllPostsOverviews = async () => {
  return await getSanityContent({
    query: `
    query AllPosts {
      allPost {
        title
        slug {
          current
        }
        publishedAt
        featured
        excerpt
        author {
          name
          image {
            asset {
              url
            }
          }
        }
        mainImage {
          asset {
            url
          }
        }
      }
    }
    `,
  });
};

export const getPostBySlug = async (params: { slug: string }) => {
  return await getSanityContent({
    query: `
    query PostBySlug($slug: String!) {
      allPost(where: { slug: { current: { eq: $slug } } }) {
        title
        slug {
          current
        }
        publishedAt
        featured
        excerpt
        content
        author {
          name
          image {
            asset {
              url
            }
          }
        }
        mainImage {
          asset {
            url
          }
        }
      }
    }
    
    `,
    variables: {
      slug: params?.slug,
    },
  });
};
