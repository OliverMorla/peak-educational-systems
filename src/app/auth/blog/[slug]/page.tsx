"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Article from "@/components/News/Article";
import "./page.scss";

const Post = ({
  params,
}: {
  params: {
    slug: number;
  };
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { status, data: session } = useSession();
  const getPost = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/blogs/${params.slug}`
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
  if (status === "unauthenticated" || status === "loading") {
    return (
      <main className="error">
        <h1>You have to sign in!</h1>
        <p>
          Please login in order to view this page. If you do not have an
          account, please sign up.
        </p>
        <Link href={"/register"}>Click here to sign up!</Link>
      </main>
    );
  } else {
    return (
      <>
        <Article
          article_id={post?.id}
          user_id={post?.user_id}
          article_title={post?.title}
          article_author={post?.author}
          number_of_comments={post?.number_of_comments}
          article_content={post?.content}
          article_created_at={post?.created_at}
          photo_cover_url={post?.photo_cover_url}
          article_category={post?.category}
          article_updated_at={post?.updated_at}
        />
      </>
    );
  }
};

export default Post;
