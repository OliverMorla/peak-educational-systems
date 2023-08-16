import HomeAbout from "@/components/Home/About";
import Intro from "@/components/Home/Intro";
import Image from "next/image";
import "./page.scss";

const About: React.FunctionComponent = (): JSX.Element => {
  return (
    <>
      <main className="about">
        <Intro>
          <Image
            src={"/assets/logos/logo-3-nobg2.png"}
            alt="logo"
            width={965}
            height={477.55}
            className="content__logo"
          />
          <div className="content__text">
            <div className="text">
              <h1>Visual</h1>
              <p>Truth in Every Story</p>
            </div>
            <div className="text">
              <h1>Tactile</h1>
              <p>Empowering Citizens with Knowledge</p>
            </div>
            <div className="text">
              <h1>Auditory</h1>
              <p>News You Can Trust, Voices You Can Believe</p>
            </div>
          </div>
        </Intro>
        <HomeAbout />
      </main>
    </>
  );
};

export default About;
