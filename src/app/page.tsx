/* eslint-disable react/no-unescaped-entities */
"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faBookOpen,
  faChalkboardTeacher,
  faSchool,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { faFaceGrinBeam } from "@fortawesome/free-regular-svg-icons";
import Marquee from "react-fast-marquee";
import Card from "@/components/News/Card";
import { motion } from "framer-motion";
import { fadeEffect } from "@/config/framer.config";
import Modal from "@/components/Modal";
import Image from "next/image";
import "./page.scss";
import { useState } from "react";

const NewsDB: News[] = [
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
  {
    id: 3,
    title: "Managing Work-Life Balance: Tips for Teachers by Teachers",
    author: "Sydney",
    comments: 15,
    photo_cover:
      "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
  },
];

const Home: React.FunctionComponent = (): JSX.Element => {
  const getQuotes = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/quotes`,
        {
          method: "GET",
        }
      );
      const response = await res.json();
      return response;
    } catch (err) {
      if (err instanceof Error) return console.log(err.message);
    }
  };

  const [quotes, setQuotes] = useState<Quote[]>((): any => {
    getQuotes().then((data) => setQuotes(data));
  });

  const [currentQuote, setCurrentQuote] = useState(0);

  const handleQuote = async () => {
    setCurrentQuote((prevCurrentQuote) => prevCurrentQuote + 1);
  };

  return (
    <main className="home">
      <Modal
        text="This page is still under construction hence, not everything is functional"
        type="Warning"
      />
      <section className="home__intro-section">
        <section className="home__section-bg">
          <div className="home__content">
            <h1>Discover, Learn, Explore</h1>
            <div className="content__border"></div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              key={currentQuote}
              className="content__quote"
            >
              "{quotes && quotes[currentQuote]?.quote}" -{" "}
              {quotes && quotes[currentQuote]?.author}
            </motion.p>
            <div className="content__arrows">
              <FontAwesomeIcon
                icon={faArrowLeft}
                className="arrow__btn"
                width={68}
              />
              <FontAwesomeIcon
                icon={faArrowRight}
                className="arrow__btn"
                width={68}
                onClick={handleQuote}
              />
            </div>
            <div className="content__border"></div>
          </div>
        </section>
      </section>
      <section className="home__about-section">
        <motion.div
          className="about"
          variants={fadeEffect}
          initial="hidden"
          whileInView="visible"
          viewport={{ margin: "-150px -150px -150px -150px", once: true }}
        >
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
        </motion.div>
        <Image
          src={"/assets/logos/logo-3-nobg2.png"}
          alt="logo"
          width={975}
          height={475}
          className="about__logo"
        />
        <div className="home__marquee">
          <Marquee
            style={{
              fontSize: "36px",
              fontWeight: "300",
              display: "flex",
              justifyContent: "space-between",
              gap: "20px",
            }}
          >
            NEWS NEWS NEWS NEWS NEWS NEWS NEWS NEWS NEWS NEWS NEWS NEWS NEWS
            NEWS NEWS NEWS NEWS NEWS
          </Marquee>
        </div>
      </section>
      <section className="home__news-section">
        <div className="news">
          <div className="news__title">
            <h1>News</h1>
            <p>Become a member to get access to the latest news!</p>
          </div>
          <motion.div
            variants={fadeEffect}
            initial="hidden"
            whileInView="visible"
            viewport={{ margin: "-150px -150px -150px -150px", once: true }}
            className="news__cards"
          >
            {NewsDB.map((news) => (
              <li
                key={news.id}
                style={{
                  listStyle: "none",
                }}
              >
                <Card
                  key={news.id}
                  id={news.id}
                  title={news.title}
                  author={news.author}
                  comments={news.comments}
                  photo_cover={news.photo_cover}
                />
              </li>
            ))}
          </motion.div>
        </div>
        <section className="home__event-modal">
          <div className="event__header">
            <span>Blogs</span>
            <span>Events</span>
            <span>Meetings</span>
          </div>
          <div className="event__body">
            <span>
              <FontAwesomeIcon icon={faChalkboardTeacher} width={20} /> Attend
              monthly workshops, webinars, and coaching sessions from industry
              leaders
            </span>
            <span>
              <FontAwesomeIcon icon={faUserGroup} width={20} />
              Make friends with Memberships members through social activities
            </span>
            <span>
              <FontAwesomeIcon icon={faBookOpen} width={20} /> Secure the bag at
              our annual career fairs
            </span>
          </div>
        </section>
      </section>
      <section className="home__contact-section">
      <Image
          src={"/assets/logos/logo-3-nobg2.png"}
          alt="logo"
          width={975}
          height={475}
          className="contact__logo"
        />
        <motion.div
          variants={fadeEffect}
          initial="hidden"
          whileInView="visible"
          viewport={{ margin: "-150px -150px -150px -150px", once: true }}
          className="contact"
        >
          <h1>Schedule a session!</h1>
          <p>
            Interested in scheduling a session with us? Fill out the form below
            with your preferred date and time, and we'll get back to you as soon
            as possible. Your path to success starts here!
          </p>
          <form>
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
        </motion.div>
      </section>
    </main>
  );
};

export default Home;
