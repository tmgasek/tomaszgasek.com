import Link from 'next/link';

const PostCard = ({ post }: any) => {
  return (
    <div>
      <Link href={`/posts/${post.slug}`}>
        <a>{post.title}</a>
      </Link>
    </div>
  );
};

export default PostCard;
