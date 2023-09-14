"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import MarkdownEditor from "@uiw/react-markdown-editor";
import "./page.scss";

const Create: React.FunctionComponent = (): JSX.Element => {
  const [markdown, setMarkdown] = useState("");
  const { data: session, status } = useSession();
  const [formInputs, setFormInputs] = useState<BlogFormInputs>({
    title: "",
    content: "",
    category: "",
    photo_cover_url: "",
    author: "",
    user_id: "",
  });
  useEffect(() => {
    setFormInputs({
      ...formInputs,
      //@ts-ignore
      author: session?.user?.name,
      //@ts-ignore
      user_id: session?.user?.id,
    });
    //@ts-ignore
  }, [session?.user?.name, session?.user?.id]);
  console.log(formInputs);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (
        formInputs.title === "" ||
        formInputs.category === "" ||
        formInputs.photo_cover_url === "" ||
        formInputs.content === ""
      ) {
        alert("Please fill out all fields");
      }

      if (formInputs.user_id === undefined || formInputs.author === undefined) {
        alert("Please sign in/re-signin to create a blog post");
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formInputs),
      });
      const data = await res.json();
      if (data.ok) {
        alert("Blog post created successfully");
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };
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
      <main className="blog__create">
        <h1> Create a Blog Post </h1>
        <form action="" className="create__form" onSubmit={handleSubmit}>
          <div className="form__group">
            <label htmlFor="title"> Title </label>
            <input
              type="text"
              name="title"
              id="title"
              onChange={(e) =>
                setFormInputs({
                  ...formInputs,
                  [e.currentTarget.name]: e.currentTarget.value,
                })
              }
            />
          </div>
          <div className="form__group">
            <label htmlFor="content"> Content </label>
            <MarkdownEditor
              value={markdown}
              height="200px"
              style={{
                fontSize: 16,
              }}
              onChange={(value, viewUpdate) =>
                setFormInputs({ ...formInputs, content: value })
              }
            />
          </div>
          <div className="form__group">
            <label htmlFor="category">Category</label>
            <select
              name="category"
              id="category"
              onChange={(e) =>
                setFormInputs({
                  ...formInputs,
                  [e.currentTarget.name]: e.currentTarget.value,
                })
              }
            >
              <option value="Technology">Technology</option>
              <option value="Health">Health</option>
              <option value="Travel">Travel</option>
              <option value="Food">Food</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Finance">Finance</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Sports">Sports</option>
              <option value="Education">Education</option>
              <option value="Politics">Politics</option>
            </select>
          </div>
          <div className="form__group">
            <label htmlFor="cover-photo">
              Cover Photo (use a unsplash.com url)
            </label>
            <input
              type="text"
              name="photo_cover_url"
              id="photo_cover_url"
              onChange={(e) =>
                setFormInputs({
                  ...formInputs,
                  [e.currentTarget.name]: e.currentTarget.value,
                })
              }
            />
          </div>
          <button type="submit"> Create </button>
        </form>
      </main>
    );
  }
};

export default Create;
