// @ts-nocheck
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { getSanityContent } from '../../utils/sanity';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {
  atelierCaveDark,
  atelierCaveLight,
} from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import Callout from '../../components/callout';
import SEO from '../../components/SEO';
import styled from 'styled-components';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { getPostBySlug } from '../../lib/queries';
import Image from 'next/image';
import { Post } from '../../types';
const readingTime = require('reading-time');

const H1 = styled.h1``;

const H2 = styled.h2``;

const H3 = styled.h3``;

const Div = styled.div``;

const P = styled.p``;

const Ul = styled.ul``;

const Ol = styled.ul``;

const Li = styled.li``;

const Code = styled.code`
  background-color: gray;
  color: white;
  padding: 0 4px;
`;

interface Props {
  post: Post;
}

const StyledImage = styled(Image)`
  border-radius: 10px;
  object-fit: cover;
  object-position: center;
`;

const Flex = styled.div`
  font-style: italic;
  color: gray;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const Divider = styled.div`
  margin: 10px 0;
  height: 2px;
  width: 100%;
  background-color: var(--fg);
`;

const PostPage: NextPage = ({ post, timeToRead }: Props) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <SEO title={post.title} />
      <H1>{post.title}</H1>
      <Flex>
        <div>
          by <span>{post.author.name} / </span>
          <span>{new Date(post.publishedAt).toDateString()}</span>
        </div>
        <span>{timeToRead}</span>
      </Flex>
      {post.mainImage ? (
        <StyledImage
          src={post.mainImage.asset.url}
          width={1080}
          height={480}
          alt="cover"
        />
      ) : (
        <Divider />
      )}
      <MDXRemote
        {...post.content}
        components={{
          h1: (props) => <H1 {...props} />,
          h2: (props) => <H2 {...props} />,
          h3: (props) => <H3 {...props} />,
          div: (props) => <Div {...props} />,
          p: (props) => <P {...props} />,
          ul: (props) => <Ul {...props} />,
          ol: (props) => <Ol {...props} />,
          li: (props) => <Li {...props} />,

          Callout,
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return match ? (
              <SyntaxHighlighter
                // eslint-disable-next-line react/no-children-prop
                children={String(children).replace(/\n$/, '')}
                //@ts-ignore
                style={
                  resolvedTheme === 'dark' ? atelierCaveDark : atelierCaveLight
                }
                //this converts 'js' to 'javascript' from match[] as 'js' does not highlight correctly
                language={match[1] === 'js' ? 'javascript' : match[1]}
                PreTag="code"
                {...props}
              />
            ) : (
              <Code className={className} {...props}>
                {children}
              </Code>
            );
          },
        }}
      />
    </>
  );
};

export default PostPage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data = await getPostBySlug(params);
  // we get an array back with 1 element so we destructure it
  const [postData] = data.allPost;
  const timeToRead = readingTime(postData.content);
  // parse mdx content
  const content = await serialize(postData.content);
  // replacing old field with parsed content
  const post = { ...postData, content };
  return {
    props: {
      post,
      timeToRead: timeToRead.text,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getSanityContent({
    query: `
    query AllPosts {
      allPost {
        slug {
          current
        }
      }
    }
    `,
  });

  const posts = data.allPost;

  return {
    paths: posts.map((post: any) => `/posts/${post.slug.current}`),
    fallback: 'blocking',
  };
};
