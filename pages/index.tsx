import type { GetStaticProps, NextPage } from "next";
import SEO from "../components/SEO";
import Image from "next/image";
import pfp from "../public/pfp.png";
import styled from "styled-components";
import { getAllPostsOverviews } from "../lib/queries";
import { Post } from "../types";
import PostCard from "../components/post-card";

const AboutHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  /* background-color: #313134; */
  border-radius: 25px;
  /* padding: 10px 20px; */

  img {
    border-radius: 50%;
  }
  @media screen and (max-width: 400px) {
    flex-direction: column;
  }
`;

const PostsContainer = styled.div`
  display: grid;
  grid-gap: 5px;
  grid-template-columns: 1fr;
`;

const Home: NextPage = ({ posts }: any) => {
  return (
    <div>
      <SEO title="Tomasz Gasek | Home" />

      <AboutHeader>
        <div>
          <h1>Tomasz Gasek</h1>
          <p>
            Hey! I am a junior JavaScript developer based in Northern Ireland.
          </p>
        </div>
        <div>
          <Image
            layout="fixed"
            src={pfp}
            alt="chick on skateboard"
            height={100}
            width={100}
          />
        </div>
      </AboutHeader>

      <article>
        <p>
          Welcome to my own little corner of the internet. Here, I&apos;ll post
          about all the things that interest me
        </p>
      </article>
      {/* 
      <article>
        <h3>Bio</h3>
        <div>
          <span>1999</span>
          <span>Born in Poland</span>
        </div>
      </article> */}

      <article>
        <h2>Featured Posts</h2>
        <PostsContainer>
          {posts.map((post: Post) => (
            <div key={post.slug.current}>
              <PostCard post={post} />
            </div>
          ))}
        </PostsContainer>
      </article>

      <article>
        <h2>Links</h2>
      </article>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const data = await getAllPostsOverviews();

  let posts = data.allPost;
  posts = posts.filter((post: Post) => post.featured);
  posts.sort((a: Post, b: Post) => {
    const aDate = new Date(a.publishedAt);
    const bDate = new Date(b.publishedAt);

    return bDate.getTime() - aDate.getTime();
  });

  console.log(posts);

  return {
    props: {
      posts,
    },
    revalidate: 10,
  };
};
