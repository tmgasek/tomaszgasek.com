import type { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import { getSanityContent } from '../../utils/sanity';
import SEO from '../../components/SEO';

const Posts = ({ posts }: any) => {
  return (
    <>
      <SEO title={'Tomasz Gasek - Posts'} />
      <div>
        <h1>Posts</h1>

        <ul>
          {posts.map(({ title, slug }: any) => (
            <li key={slug}>
              <Link href={`/posts/${slug}`}>
                <a>{title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Posts;

export const getStaticProps: GetStaticProps = async () => {
  const data = await getSanityContent({
    query: `
    query AllPosts {
      allPost {
        title
        slug {
          current
        }
        content
      }
    }
    `,
  });

  const posts = data.allPost.map((post: any) => ({
    title: post.title,
    slug: post.slug.current,
  }));

  return {
    props: { posts },
    revalidate: 10,
  };
};
