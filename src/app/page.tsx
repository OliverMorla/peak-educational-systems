/* eslint-disable react/no-unescaped-entities */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faBookOpen,
  faSchool,
} from "@fortawesome/free-solid-svg-icons";
import { faFaceGrinBeam } from "@fortawesome/free-regular-svg-icons";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import Modal from "@/components/Modal";
import "./page.scss";

const NewsDB = [
  {
    id: 1,
    title: "10 Interactive Classroom Activities for Engaging Students",
    author: "Sydney",
    comments: 29,
    photo_cover:
      "https://images.unsplash.com/photo-1495727034151-8fdc73e332a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1730&q=80",
  },
  {
    id: 2,
    title: "The Future of Education: Integrating Technology into Lesson Plans",
    author: "Sydney",
    comments: 11,
    photo_cover:
      "https://images.unsplash.com/photo-1581726707445-75cbe4efc586?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1752&q=80",
  },
];

const Home: React.FunctionComponent = (): JSX.Element => {
  return (
    <main className="home">
      <Modal
        text={
          "This page is still under construction hence, not everything is functional"
        }
        type={"Warning"}
      />
      <section className="home__section-one">
        <section className="home__section-bg">
          <div className="home__content">
            <h1>Discover, Learn, Explore</h1>
            <div className="content__border"></div>
            <p className="content__quote">
              "Be dedicated to change the way in which people see mental illness
              at all levels of society. If not for yourself, advocate for those
              who are struggling in silence.” — Germany Kent
            </p>
            <div className="content__arrows">
              <FontAwesomeIcon
                icon={faArrowLeft}
                className="arrows__btn"
                width={68}
              />
              <FontAwesomeIcon
                icon={faArrowRight}
                className="arrows__btn"
                width={68}
              />
            </div>
            <div className="content__border"></div>
          </div>
        </section>
      </section>
      <section className="home__section-two">
        <div className="home__about">
          <h1 className="about__title">About the company</h1>
          <p className="about__info">
            Peak Educational Systems was founded in 2004. Its mission was to
            provide academic support and engagement to elementary school aged
            children and consulting services for parents seeking guidance on how
            to best meet their child's academic needs.
            <br /> <br />
            Since its inception, Peak Educational Systems has expanded that
            mission by providing support for novice teachers while focusing on
            the importance of childhood literacy via writing for publication and
            circulating its literary works into the world. We believe that
            children from all backgrounds should have access to, and engagement
            with, diverse, high quality literature.
          </p>
          <div className="about__badges">
            <div className="badge">
              <FontAwesomeIcon icon={faSchool} className="badge__icon" />
              <h2>Quick Support</h2>
            </div>
            <div className="badge">
              <FontAwesomeIcon icon={faBookOpen} className="badge__icon" />
              <h2>2+ Books Written</h2>
            </div>
            <div className="badge">
              <FontAwesomeIcon icon={faFaceGrinBeam} className="badge__icon" />
              <h2>100+ Members</h2>
            </div>
          </div>
        </div>
        <Image
          src={"/assets/logos/logo-3-nobg.png"}
          alt="logo-3-nobg"
          width={2550}
          height={1650}
          className="about__logo"
        />
        <div className="home__marquee">
          <Marquee
            style={{
              fontSize: "36px",
              fontWeight: "300",
              display: "flex",
              gap: "10px",
            }}
          >
            NEWS NEWS NEWS NEWS NEWS NEWS NEWS NEWS NEWS NEWS NEWS NEWS NEWS
            NEWS NEWS NEWS NEWS
          </Marquee>
        </div>
      </section>
      <section className="home__section-three">
        <div className="home__news">
          <div className="news__title">
            <h1>News</h1>
            <p>Become a member to get access to the latest news!</p>
          </div>
          <div className="news__cards"></div>
        </div>
      </section>
      <section className="home__contact">
        <Image
          src={"/assets/logos/logo-3-nobg.png"}
          alt="logo-3-nobg"
          width={2550}
          height={1650}
          className="contact__logo"
          style={{
            objectFit: "contain",
          }}
        />
        <div className="contact_wrapper">
          <h1>Schedule a session!</h1>
          <p>
            Interested in scheduling a session with us? Fill out the form below
            with your preferred date and time, and we'll get back to you as soon
            as possible. Your path to success starts here!
          </p>
          <form action="">
            <input
              type="text"
              name="first_name"
              id="form__first-name"
              placeholder="Enter first name"
            />
            <input
              type="text"
              name="last_name"
              id="form__last-name"
              placeholder="Enter last name"
            />
            <input
              type="text"
              name="email"
              id="form__email"
              placeholder="Enter email address"
            />
            <textarea
              name="reason"
              id="form__reason"
              placeholder="Enter a reason"
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Home;
