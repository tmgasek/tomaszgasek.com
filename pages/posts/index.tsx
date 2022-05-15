import type { GetStaticProps, GetStaticPaths } from 'next';
import type { Post } from '../../types';
import Link from 'next/link';
import { getAllPostsOverviews } from '../../lib/queries';
import { getSanityContent } from '../../utils/sanity';
import SEO from '../../components/SEO';
import PostCard from '../../components/post-card';
import styled from 'styled-components';

const PostsContainer = styled.div`
  display: grid;
  grid-gap: 5px;
  grid-template-columns: 1fr;
`;

const Posts = ({ posts }: any) => {
  return (
    <>
      <SEO title={'Tomasz Gasek - Posts'} />
      <h1>Posts</h1>
      <PostsContainer>
        {posts.map((post: Post) => (
          <div key={post.slug.current}>
            <PostCard post={post} />
          </div>
        ))}
      </PostsContainer>
    </>
  );
};

export default Posts;

export const getStaticProps: GetStaticProps = async () => {
  const data = await getAllPostsOverviews();

  const posts = data.allPost;
  //@ts-ignore
  posts.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  return {
    props: {
      posts,
    },
    revalidate: 10,
  };
};
