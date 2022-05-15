import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import { Post } from '../types';

interface Props {
  post: Post;
}

const PostWrapper = styled.div<any>`
  margin-bottom: 12px;

  h3 {
    max-width: fit-content;
    cursor: pointer;
    margin: 0;
    margin-bottom: 1px;
  }

  p {
    margin: 2px 0;
    color: gray;
    font-size: 14px;
  }

  span {
    font-style: italic;
    font-size: 14px;
    margin: 0;
    padding: 0;
    color: gray;
  }
`;

const SpaceBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  @media (max-width: 550px) {
    flex-direction: column;
    align-items: baseline;
    justify-content: baseline;
    gap: 0px;
  }
`;

const AuthorWrapper = styled.div`
  div {
    margin: 2px 0px;
    display: flex;
    gap: 6px;
  }

  h5 {
    margin: 0;
    font-family: 'Open Sans';
    font-weight: normal;
  }

  img {
    border-radius: 10px;
  }
`;

const PostLink = styled.a`
  font-family: 'Ubuntu';
  font-size: larger;
`;

const PostCard = ({ post }: Props) => {
  return (
    <div>
      <PostWrapper imgUrl={post.mainImage?.asset.url}>
        <SpaceBetween>
          <Link href={`/posts/${post.slug.current}`} passHref>
            <h3>
              <PostLink>{post.title}</PostLink>
            </h3>
          </Link>
          <span>{new Date(post.publishedAt).toDateString()}</span>
        </SpaceBetween>
        <p>{post.excerpt}</p>
        <AuthorWrapper>
          <div>
            {post.author?.image && (
              <Image
                src={post.author.image.asset.url}
                width={25}
                height={20}
                alt={post.author.name}
              />
            )}
            <h5>{post.author?.name}</h5>
          </div>
        </AuthorWrapper>
      </PostWrapper>
    </div>
  );
};

export default PostCard;
