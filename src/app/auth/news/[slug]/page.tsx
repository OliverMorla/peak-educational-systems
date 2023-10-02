"use client";
import NewsArticle from "@/components/News/Article";
import { useState } from "react";

const Post = ({
  params,
}: {
  params: {
    slug: string;
  };
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const getArticle = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/news/${params?.slug}`
      );
      const response = await res.json();
      console.log(response)
      setLoading(false);
      return response?.news;
    } catch (err) {
      if (err instanceof Error) return console.log(err.message);
    }
  };

  const [article, setArticle] = useState<News>((): any => {
    getArticle().then((data) => setArticle(data));
  });
  return (
    <>
      <NewsArticle
        key={article?.id}
        article_author={article?.users?.first_name + " " + article?.users?.last_name}
        article_category={article?.category}
        article_content={article?.content}
        article_created_at={article?.created_at}
        photo_cover_url={article?.photo_cover_url}
        article_title={article?.title}
        article_id={article?.id}
        article_updated_at={article?.updated_at}
        user_id={article?.user_id}
      />
    </>
  );
};

export default Post;
