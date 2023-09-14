"use client";
import Article from "@/components/News/Article";
import { useState } from "react";

const Post = ({
  params,
}: {
  params: {
    slug: string;
  };
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const getPost = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/blogs/${params?.slug}`
      );
      const response = await res.json();
      setLoading(false);
      return response?.post;
    } catch (err) {
      if (err instanceof Error) return console.log(err.message);
    }
  };

  const [post, setPost] = useState<Blog>((): any => {
    getPost().then((data) => setPost(data));
  });
  return (
    <>
      <Article
        key={post?.blog_id}
        article_author={post?.author}
        article_category={post?.category}
        article_content={post?.content}
        article_created_at={post?.created_at}
        photo_cover_url={post?.photo_cover_url}
        article_title={post?.title}
        article_id={post?.blog_id}
        article_updated_at={post?.updated_at}
        user_id={post?.user_id}
      />
    </>
  );
};

export default Post;
