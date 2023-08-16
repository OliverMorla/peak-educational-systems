import Intro from "@/components/Home/Intro";
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
