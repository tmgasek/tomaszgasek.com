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

const H1 = styled.h1``;

const H2 = styled.h2``;

const H3 = styled.h3``;

const Div = styled.div``;

const P = styled.p`
  margin: 0 0rem;
`;

const A = styled.a`
  color: blue;

  &:hover {
    text-decoration: underline;
  }
`;

const Ul = styled.ul``;

const Ol = styled.ul``;

const Li = styled.li``;

const Post: NextPage = ({ post }: any) => {
  const { theme } = useTheme();
  console.log(theme);
  console.log(post);
  return (
    <>
      <SEO title={post.title} />
      <MDXRemote
        {...post.content}
        components={{
          h1: (props) => <H1 {...props} />,
          h2: (props) => <H2 {...props} />,
          h3: (props) => <H3 {...props} />,
          div: (props) => <Div {...props} />,
          p: (props) => <P {...props} />,
          a: (props) => <A {...props} />,
          ul: (props) => <Ul {...props} />,
          ol: (props) => <Ol {...props} />,
          li: (props) => <Li {...props} />,

          Callout,
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return match ? (
              <SyntaxHighlighter
                customStyle={{ fontSize: '16px' }}
                // eslint-disable-next-line react/no-children-prop
                children={String(children).replace(/\n$/, '')}
                //@ts-ignore
                style={theme === 'light' ? atelierCaveLight : atelierCaveDark}
                //this converts 'js' to 'avascript' from match[] as 'js' does not seem to highlight correctly
                language={match[1] === 'js' ? 'javascript' : match[1]}
                PreTag="code"
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      />
    </>
  );
};

export default Post;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data = await getSanityContent({
    query: `
    query PostBySlug($slug: String!) {
      allPost(where: { slug: { current: { eq: $slug } } }) {
        title
        content
        featured
        author {
          name
          image {
            asset {
              url
            }
          }
        }
        publishedAt
      }
    }
    
    `,
    variables: {
      slug: params?.slug,
    },
  });
  const [postData] = data.allPost;
  const content = await serialize(postData.content);
  const post = { ...postData, content };
  return {
    props: {
      post,
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
