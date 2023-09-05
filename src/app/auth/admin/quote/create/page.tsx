"use client";
import "./page.scss";

const Create: React.FunctionComponent = (): JSX.Element => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // @ts-ignore
    const author = e.currentTarget.author?.value;
    const quote = e.currentTarget.quote?.value;
    const category = e.currentTarget.category?.value;
    const coverPhoto = e.currentTarget.coverPhoto?.value;

    let FormInputs = {
      author: author,
      quote: quote,
      category: category,
      coverPhoto: coverPhoto,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/blog/create`,
        {
          method: "POST",
          headers: {
            "quote-Type": "application/json",
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
      author === "" ||
      quote === "" 
    ) {
      alert("Please fill out all fields");
    }
  };
  return (
    <main className="quote__create">
      <h1> Create a Quote </h1>
      <form action="" className="create__form" onSubmit={handleSubmit}>
        <div className="form__group">
          <label htmlFor="author"> Author </label>
          <input type="text" name="author" id="author" />
        </div>
        <div className="form__group">
          <label htmlFor="quote"> Quote </label>
          <input name="quote" id="quote" />
        </div>
        <button type="submit"> Create </button>
      </form>
    </main>
  );
};

export default Create;
