"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import "./page.scss";

const Create: React.FunctionComponent = (): JSX.Element => {
  const { data: session, status } = useSession();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // @ts-ignore
    const title = e.currentTarget.title?.value;
    const content = e.currentTarget.content?.value;
    const category = e.currentTarget.category?.value;
    const coverPhoto = e.currentTarget.coverPhoto?.value;

    let FormInputs = {
      title: title,
      content: content,
      category: category,
      coverPhoto: coverPhoto,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/blog/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(FormInputs),
        }
      );
      const data = await res.json();
      if (data.ok) {
        alert("Blog post created successfully");
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
    if (
      title === "" ||
      content === "" ||
      category === "" ||
      coverPhoto === ""
    ) {
      alert("Please fill out all fields");
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
      <main className="news__create">
        <h1> Create a News Post </h1>
        <form action="" className="create__form" onSubmit={handleSubmit}>
          <div className="form__group">
            <label htmlFor="title"> Title </label>
            <input type="text" name="title" id="title" />
          </div>
          <div className="form__group">
            <label htmlFor="content"> Content </label>
            <input name="content" id="content" />
          </div>
          <div className="form__group">
            <label htmlFor="category">Category</label>
            <select name="blog-category" id="blog-category">
              <option value="technology">Technology</option>
              <option value="health">Health</option>
              <option value="travel">Travel</option>
              <option value="food">Food</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="finance">Finance</option>
              <option value="entertainment">Entertainment</option>
              <option value="sports">Sports</option>
              <option value="education">Education</option>
              <option value="politics">Politics</option>
            </select>
          </div>
          <div className="form__group">
            <label htmlFor="cover-photo">
              Cover Photo (use a unsplash.com url)
            </label>
            <input type="text" name="cover-photo" id="cover-photo" />
          </div>
          <button type="submit"> Create </button>
        </form>
      </main>
    );
  }
};

export default Create;
