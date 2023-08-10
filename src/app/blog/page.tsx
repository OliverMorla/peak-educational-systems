import Intro from "@/components/home/sections/intro";
import "./page.scss";

const Blog: React.FunctionComponent = (): JSX.Element => {
  return (
    <main className="blog">
      <Intro>
        <h1> Blog </h1>
      </Intro>
    </main>
  );
};

export default Blog;
