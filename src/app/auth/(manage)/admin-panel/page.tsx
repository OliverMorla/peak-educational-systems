/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Loading from "@/components/Loading";
import "./page.scss";

const Panel = () => {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [news, setNews] = useState<News[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [errors, setErrors] = useState({
    userError: "",
    newsError: "",
    quoteError: "",
    blogError: "",
    commentsError: "",
  });

  const getData = async (
    endpoint: string,
    setter: React.SetStateAction<any>,
    errorKey: string
  ) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}api/auth/admin/${endpoint}`
      );
      const response = await res.json();
      if (response.ok) {
        setter(response[endpoint]);
      }
      throw new Error(response.message);
    } catch (err) {
      if (err instanceof Error)
        setErrors({ ...errors, [errorKey]: err.message });
    }
  };

  useEffect(() => {
    getData("users", setUsers, "userError");
    getData("blogs", setBlogs, "blogError");
    getData("quotes", setQuotes, "quoteError");
    getData("news", setNews, "newsError");
    getData("comments", setComments, "commentsError");
  }, []);

  // to check if the data is fetched
  console.log(errors);

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    switch (e.currentTarget.name) {
      case "user-delete-btn":
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/auth/admin/users?id=${id}`,
            {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
            }
          );
          const response = await res.json();
          if (response.ok) {
            alert(response.message);
          } else {
            throw new Error(response.message);
          }
        } catch (err) {
          if (err instanceof Error) alert(err.message);
        }
        break;
      case "news-delete-btn":
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/auth/admin/news?id=${id}`,
            {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
            }
          );
          const response = await res.json();
          if (response.ok) {
            alert(response.message);
          } else {
            throw new Error(response.message);
          }
        } catch (err) {
          if (err instanceof Error) alert(err.message);
        }
        break;
      case "blog-delete-btn":
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/auth/admin/blog?id=${id}`,
            {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
            }
          );
          const response = await res.json();
          if (response.ok) {
            alert(response.message);
          } else {
            throw new Error(response.message);
          }
        } catch (err) {
          if (err instanceof Error) alert(err.message);
        }
        break;
      case "quote-delete-btn":
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/auth/admin/quotes?id=${id}`,
            {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
            }
          );
          const response = await res.json();
          if (response.ok) {
            alert(response.message);
          } else {
            throw new Error(response.message);
          }
        } catch (err) {
          if (err instanceof Error) alert(err.message);
        }
        break;
      case "comment-delete-btn":
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/auth/admin/comments?id=${id}`,
            {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
            }
          );
          const response = await res.json();
          if (response.ok) {
            alert(response.message);
          } else {
            throw new Error(response.message);
          }
        } catch (err) {
          if (err instanceof Error) alert(err.message);
        }
        break;
      default:
        alert("You have not selected any item to delete");
        break;
    }
  };
  if (
    session?.user?.email !== "admin@peakeducationalsystems.com" &&
    // @ts-ignore
    session?.user?.sub !== 1
  ) {
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
      <main className="admin__panel">
        <h1> Admin Panel </h1>
        <section className="users">
          <h2> Users </h2>
          <div className="users__list">
            <div className="users__item">
              <table>
                <thead>
                  <tr>
                    <th> id </th>
                    <th> first_name </th>
                    <th> last_name </th>
                    <th> email </th>
                    <th> date_of_birth </th>
                    <th> title </th>
                    <th> role </th>
                    <th> created_at </th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td>
                        <Loading />
                      </td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
                        <td>{user.email}</td>
                        <td>
                          {new Date(user.date_of_birth).toLocaleDateString()}
                        </td>
                        <td>{user.title}</td>
                        <td>{user.role}</td>
                        <td>{new Date(user.created_at).toDateString()}</td>
                        <td>
                          <button
                            name="user-delete-btn"
                            onClick={(e) => handleDelete(e, user.id)}
                            className="delete-btn"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="news">
          <h2> News </h2>
          <div className="news__list">
            <div className="news__item">
              <table>
                <thead>
                  <tr>
                    <th> id </th>
                    <th> title </th>
                    <th> author </th>
                    <th> number_of_comments </th>
                    <th> category </th>
                    <th> views </th>
                    <th> created_at </th>
                  </tr>
                </thead>
                <tbody>
                  {news.length === 0 ? (
                    <tr>
                      <td>
                        <Loading />
                      </td>
                    </tr>
                  ) : (
                    news?.map((news) => (
                      <tr key={news.id}>
                        <td>{news.id}</td>
                        <td>{news.title}</td>
                        <td>
                          {news.users?.first_name.concat(
                            " ",
                            news.users.last_name
                          )}
                        </td>
                        <td>{news._count?.comments}</td>
                        <td>{news.category}</td>
                        <td>{news.views}</td>
                        <td>{new Date(news.created_at).toDateString()}</td>
                        <td>
                          <button
                            name="news-delete-btn"
                            onClick={(e) => handleDelete(e, news.id)}
                            className="delete-btn"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="blogs">
          <h2> Blogs </h2>
          <div className="blogs__list">
            <div className="blogs__item">
              <table>
                <thead>
                  <tr>
                    <th> blog_id </th>
                    <th> author </th>
                    <th> title </th>
                    <th> category </th>
                    <th> created_at </th>
                    <th> number_of_comments </th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.length === 0 ? (
                    <tr>
                      <td>
                        <Loading />
                      </td>
                    </tr>
                  ) : (
                    blogs?.map((blog) => (
                      <tr key={blog.blog_id}>
                        <td>{blog.blog_id}</td>
                        <td>{blog.author}</td>
                        <td>{blog.title}</td>
                        <td>{blog.category}</td>
                        <td>
                          {new Date(blog.created_at).toLocaleDateString()}
                        </td>
                        <td>{blog?._count?.comments}</td>
                        <td>
                          <button
                            name="blog-delete-btn"
                            onClick={(e) => handleDelete(e, blog.blog_id)}
                            className="delete-btn"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="quotes">
          <h2> Quotes </h2>
          <div className="quotes__list">
            <div className="quotes__item">
              <table>
                <thead>
                  <tr>
                    <th> id </th>
                    <th> quote </th>
                    <th> author </th>
                  </tr>
                </thead>
                <tbody>
                  {quotes.length === 0 ? (
                    <tr>
                      <td>
                        <Loading />
                      </td>
                    </tr>
                  ) : (
                    quotes?.map((quote) => (
                      <tr key={quote.id}>
                        <td>{quote.id}</td>
                        <td>{quote.quote}</td>
                        <td>{quote.author}</td>
                        <td>
                          <button
                            name="quote-delete-btn"
                            onClick={(e) => handleDelete(e, quote.id)}
                            className="delete-btn"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="comments">
          <h2> Comments </h2>
          <div className="comments__list">
            <div className="comments__item">
              <table>
                <thead>
                  <tr>
                    <th> id </th>
                    <th> name </th>
                    <th> content </th>
                    <th> title </th>
                    <th> created_at </th>
                  </tr>
                </thead>
                <tbody>
                  {comments.length === 0 ? (
                    <tr>
                      <td>
                        <Loading />
                      </td>
                    </tr>
                  ) : (
                    comments?.map((comment) => (
                      <tr key={comment.id}>
                        <td>{comment.id}</td>
                        <td>
                          {comment.users?.first_name.concat(
                            " ",
                            comment.users?.last_name
                          )}
                        </td>
                        <td>{comment.content}</td>
                        <td>{comment.news?.title || comment.blogs?.title}</td>
                        <td>{new Date(comment.created_at).toDateString()}</td>
                        <td>
                          <button
                            name="comment-delete-btn"
                            onClick={(e) => handleDelete(e, comment.id)}
                            className="delete-btn"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="panel__buttons">
          <button className="add-blog-btn">
            <Link href={"/auth/admin/blog/create"}>Create blog</Link>
          </button>
          <button className="add-news-btn">
            <Link href={"/auth/admin/news/create"}>Create News </Link>
          </button>
          <button className="add-quote-btn">
            <Link href={"/auth/admin/quote/create"}>Create Quote </Link>
          </button>
        </section>
      </main>
    );
  }
};

export default Panel;
