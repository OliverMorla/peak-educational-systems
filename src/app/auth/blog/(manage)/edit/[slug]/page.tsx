"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import "./page.scss";

const Edit: React.FunctionComponent = (): JSX.Element => {
  // @ts-ignore
  const { slug } = useParams();
  const [blog, setBlog] = useState<Blog>();

  const getBlog = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/blog/${slug}`
      );
      const data = await res.json();
      if (data.ok) {
        setBlog(data?.blogs);
      }
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };

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
        `${process.env.NEXT_PUBLIC_API_URL}/api/blog/${slug}`,
        {
          method: "PUT",
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

  useEffect(() => {
    let isMounted = true;
    if (blog && isMounted) {
      getBlog();
    }
    return () => {
      isMounted = false;
    };
  }, [blog]);

  return (
    <main className="blog__create">
      <h1> Edit a Blog Post </h1>
      <form action="" className="create__form" onSubmit={handleSubmit}>
        <div className="form__group">
          <label htmlFor="title"> Title </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder={blog?.title ?? "Enter a title"}
          />
        </div>
        <div className="form__group">
          <label htmlFor="content"> Content </label>
          <input
            name="content"
            id="content"
            placeholder={blog?.content ?? "Enter the body"}
          />
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
          <input
            type="text"
            name="cover-photo"
            id="cover-photo"
            placeholder={
              blog?.photo_cover_url ?? "Enter a URL from unsplash.com"
            }
          />
        </div>
        <button type="submit"> Create </button>
      </form>
    </main>
  );
};

export default Edit;
