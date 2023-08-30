"use client";
import { useState } from "react";
import Article from "@/components/News/Article";
import "./page.scss";

const Post = ({
  params,
}: {
  params: {
    post: number;
  };
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const getPost = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/blogs/${params.post}`
      );
      const response = await res.json();
      setLoading(false);
      return response?.post;
    } catch (err) {
      if (err instanceof Error) return console.log(err.message);
    }
  };

  const getComments = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/blogs/${params.post}/comments`
      );
      const response = await res.json();
      setLoading(false);
      return response?.comments;
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
        author={post?.author}
        category={post?.category}
        comments={post?.number_of_comments}
        content={post?.content}
        created_at={post?.created_at}
        photo_cover_url={post?.photo_cover_url}
        title={post?.title}
        key={post?.id}
      />
    </>
  );
};

export default Post;
