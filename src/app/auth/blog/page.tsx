"use client";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Category from "@/components/Inputs/Category";
import Loading from "@/components/Loading";
import Card from "@/components/News/Card";
import Link from "next/link";
import "./page.scss";

const Blog: React.FunctionComponent = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);
  const [checked, isChecked] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const { status, data: session } = useSession();
  const CurrentCategory = useSearchParams()?.get("category");

  const getBlogs = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`);
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
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/blogs/categories`
      );
      const response = await res.json();
      return response?.categories;
    } catch (err) {
      if (err instanceof Error) return console.log(err.message);
    }
  };

  const [PopularBlogs, setPopularBlogs] = useState<Blog[]>((): any => {
    getBlogs().then((data) => setPopularBlogs(data?.PopularBlogs));
  });

  const [LatestBlogs, setLatestBlogs] = useState<Blog[]>((): any => {
    getBlogs().then((data) => setLatestBlogs(data?.LatestBlogs));
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
      <main className="blog">
        <h1 className="text-5xl font-bold">Blogs</h1>
        <aside className="blog__search">
          <section className="search">
            <FontAwesomeIcon icon={faSearch} className="search__icon" />
            <input
              type="text"
              className="search__input"
              placeholder="Enter blog name"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearch(e.currentTarget.value)
              }
            />
          </section>
        </aside>
        <p>Choose a category or Search an article by title.</p>
        <section className="blog__categories-wrapper">
          <aside className="blog__categories">
            <Link href={`/auth/blog`}>
              <div className="categories__input">
                <input
                  type="checkbox"
                  className="category__input"
                  defaultChecked={CurrentCategory === null ? true : false}
                />
                <label>
                  None
                </label>
              </div>
            </Link>
            {categories?.map((category, index) => (
              <Category
                key={index}
                type="blog"
                name={category?.category}
                count={category?._count.category}
              />
            ))}
          </aside>
        </section>
        <section className="blog__create-wrapper">
          <Link href="/auth/blog/create">
            <button className="blog__create-btn">Create a Blog Post</button>
          </Link>
        </section>
        {search !== "" ? (
          <>
            <section className="blog__posts">
              <h2>Search </h2>
              <section className="blog__overflow">
                {loading ? (
                  <Loading />
                ) : (
                  PopularBlogs?.map((post, index) => {
                    if (
                      post.title
                        .toLocaleLowerCase()
                        .includes(search.toLocaleLowerCase())
                    ) {
                      return (
                        <Link
                          href={`/auth/blog/${post.blog_id}`}
                          key={post.blog_id}
                        >
                          <Card
                            author={post.author}
                            title={post.title}
                            photo_cover_url={post.photo_cover_url}
                            number_of_comments={post.number_of_comments || 0}
                            id={post.blog_id}
                            category={post.category}
                            created_at={post.created_at}
                            updated_at={post.updated_at}
                          />
                        </Link>
                      );
                    }
                  })
                )}
              </section>
            </section>
          </>
        ) : (
          <>
            <section className="blog__posts">
              <h2>Most Popular </h2>
              <section className="blog__overflow">
                {loading ? (
                  <Loading />
                ) : (
                  PopularBlogs?.map((post, index) => (
                    <Link
                      href={`/auth/blog/${post.blog_id}`}
                      key={post.blog_id}
                    >
                      <Card
                        author={post.author}
                        title={post.title}
                        photo_cover_url={post.photo_cover_url}
                        number_of_comments={post.number_of_comments || 0}
                        id={post.blog_id}
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
                  LatestBlogs?.map((post) => (
                    <Link
                      href={`/auth/blog/${post.blog_id}`}
                      key={post.blog_id}
                    >
                      <Card
                        author={post.author}
                        title={post.title}
                        photo_cover_url={post.photo_cover_url}
                        number_of_comments={post.number_of_comments}
                        id={post.blog_id}
                        category={post.category}
                        created_at={post.created_at}
                        updated_at={post.updated_at}
                      />
                    </Link>
                  ))
                )}
              </section>
            </section>
          </>
        )}

        {CurrentCategory === null ? null : (
          <>
            <section className="blog__posts">
              <h2>{CurrentCategory + " Category"} </h2>
              <section className="blog__overflow">
                {loading ? (
                  <Loading />
                ) : (
                  PopularBlogs?.map((post, index) => {
                    if (post.category == CurrentCategory) {
                      return (
                        <Link
                          href={`/auth/blog/${post.blog_id}`}
                          key={post.blog_id}
                        >
                          <Card
                            author={post.author}
                            title={post.title}
                            photo_cover_url={post.photo_cover_url}
                            number_of_comments={post.number_of_comments || 0}
                            id={post.blog_id}
                            category={post.category}
                            created_at={post.created_at}
                            updated_at={post.updated_at}
                          />
                        </Link>
                      );
                    }
                  })
                )}
              </section>
            </section>
          </>
        )}
      </main>
    );
  }
};

export default Blog;
