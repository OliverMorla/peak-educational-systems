import Intro from "@/components/home/sections/intro";
import "./page.scss";

const Services: React.FunctionComponent = (): JSX.Element => {
  return (
    <main className="services">
      <Intro>
        <h1>Services</h1>
      </Intro>
    </main>
  );
};

export default Services;
