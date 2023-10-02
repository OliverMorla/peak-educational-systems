"use client";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Category from "@/components/Inputs/Category";
import Loading from "@/components/Loading";
import Card from "@/components/News/Card";
import Link from "next/link";
import "./page.scss";

const News: React.FunctionComponent = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);
  const { status, data: session } = useSession();

  const getNews = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/news`);
      const response = await res.json();
      setLoading(false);
      return response;
    } catch (err) {
      if (err instanceof Error) return console.log(err.message);
    }
  };

  const getCategories = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/news/categories`
      );
      const response = await res.json();
      return response?.categories;
    } catch (err) {
      if (err instanceof Error) return console.log(err.message);
    }
  };

  const [PopularNews, setPopularNews] = useState<News[]>((): any => {
    getNews().then((data) => setPopularNews(data?.PopularNews));
  });

  const [LatestNews, setLatestNews] = useState<News[]>((): any => {
    getNews().then((data) => setLatestNews(data?.LatestNews));
  });

  const [categories, setCategories] = useState<Category[]>((): any => {
    getCategories().then((data) => setCategories(data));
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
      <main className="news">
        <h1>News</h1>
        <aside className="blog__search">
          <section className="search">
            <FontAwesomeIcon icon={faSearch} className="search__icon" />
            <input
              type="text"
              className="search__input"
              placeholder="Enter blog name"
            />
          </section>
        </aside>
        <p>Choose a category or Search an article by title.</p>
        <section className="blog__categories-wrapper">
          <aside className="blog__categories">
            {categories?.map((category, index) => (
              <Category
                key={index}
                name={category?.category}
                count={category?._count.category}
              />
            ))}
          </aside>
        </section>
        <section className="blog__posts">
          <h2>Most Popular </h2>
          <section className="blog__overflow">
            {loading ? (
              <Loading />
            ) : (
              PopularNews?.map((article) => (
                <Link href={`/auth/news/${article.id}`} key={article.id}>
                  <Card
                    id={article.id}
                    author={article.author}
                    user_id={article.user_id}
                    title={article.title}
                    content={article.content}
                    photo_cover_url={article.photo_cover_url}
                    number_of_comments={article.number_of_comments || 0}
                    category={article.category}
                    views={article.views}
                    created_at={article.created_at}
                    updated_at={article.updated_at}
                  />
                </Link>
              ))
            )}
          </section>
        </section>
        <section className="blog__posts">
          <h2>Latest</h2>
          <section className="blog__overflow">
            {loading ? (
              <Loading />
            ) : (
              LatestNews?.map((article) => (
                <Link href={`/auth/news/${article.id}`} key={article.id}>
                  <Card
                    author={article.author}
                    title={article.title}
                    content={article.content}
                    photo_cover_url={article.photo_cover_url}
                    number_of_comments={article.number_of_comments}
                    user_id={article.user_id}
                    id={article.id}
                    category={article.category}
                    created_at={article.created_at}
                    updated_at={article.updated_at}
                  />
                </Link>
              ))
            )}
          </section>
        </section>
      </main>
    );
  }
};

export default News;
