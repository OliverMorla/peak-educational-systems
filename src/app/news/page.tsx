import Intro from "@/components/home/sections/intro";
import "./page.scss";

const News: React.FunctionComponent = (): JSX.Element => {
  return (
    <main className="news">
      <Intro>
        <h1> News </h1>
      </Intro>
    </main>
  );
};

export default News;
