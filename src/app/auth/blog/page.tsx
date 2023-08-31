"use client";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Category from "@/components/Inputs/Category";
import Loading from "@/components/Loading";
import Card from "@/components/News/Card";
import Link from "next/link";
import "./page.scss";

const Blog: React.FunctionComponent = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);

  const getBlogs = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/blogs`
      );
      const response = await res.json();
      console.log(response)
      setLoading(false);
      return response?.blogs;
    } catch (err) {
      if (err instanceof Error) return console.log(err.message);
    }
  };

  const getCategories = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/blogs/categories`
      );
      const response = await res.json();
      return response?.categories;
    } catch (err) {
      if (err instanceof Error) return console.log(err.message);
    }
  };

  const [blogs, setBlogs] = useState<Blog[]>((): any => {
    getBlogs().then((data) => setBlogs(data));
  });

  const [categories, setCategories] = useState<Category[]>((): any => {
    getCategories().then((data) => setCategories(data));
  });

  return (
    <main className="blog">
      <h1>Blogs</h1>
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
      <aside className="blog__categories">
        {categories?.map((category, index) => (
          <Category
            key={index}
            name={category?.category}
            count={category?._count.category}
          />
        ))}
      </aside>
      <section className="blog__posts">
        <h2>Most Popular </h2>
        <section className="blog__overflow">
          {loading ? (
            <Loading />
          ) : (
            blogs?.map((post) => (
              <Link href={`/auth/blog/${post.id}`} key={post.id}>
                <Card
                  author={post.author}
                  title={post.title}
                  content={post.content}
                  photo_cover_url={post.photo_cover_url}
                  number_of_comments={post.number_of_comments}
                  author_id={post.author_id}
                  id={post.id}
                  category={post.category}
                  created_at={post.created_at}
                  updated_at={post.updated_at}
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
            blogs?.map((post) => (
              <Link href={`/auth/blog/${post.id}`} key={post.id}>
                <Card
                  author={post.author}
                  title={post.title}
                  content={post.content}
                  photo_cover_url={post.photo_cover_url}
                  number_of_comments={post.number_of_comments}
                  author_id={post.author_id}
                  id={post.id}
                  category={post.category}
                  created_at={post.created_at}
                  updated_at={post.updated_at}
                />
              </Link>
            ))
          )}
        </section>
      </section>
    </main>
  );
};

export default Blog;
