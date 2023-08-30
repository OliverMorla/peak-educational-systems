import "./page.scss";

const Create: React.FunctionComponent = (): JSX.Element => {
  return (
    <main className="blog__create">
      <h1> Create a Blog Post </h1>
      <form action="" className="create__form">
        <div className="form__group">
          <label htmlFor="title"> Title </label>
          <input type="text" name="title" id="title" />
        </div>
        <div className="form__group">
          <label htmlFor="content"> Content </label>
          <textarea name="content" id="content" cols={30} rows={10}></textarea>
        </div>
        <button type="submit"> Create </button>
      </form>
    </main>
  );
};

export default Create;
