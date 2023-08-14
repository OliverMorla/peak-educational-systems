/* eslint-disable react/no-unescaped-entities */
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
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
import { fadeEffect } from "@/config/framer.config";
import Marquee from "react-fast-marquee";
import Card from "@/components/news/card";
import Modal from "@/components/modal";
import Image from "next/image";
import "./page.scss";
import Session__Form from "@/components/session/form";

// Local News DB
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

  // On definition, call the getQuotes() to retrieve initial quote on page load
  const [quotes, setQuotes] = useState<Quote[]>((): any => {
    getQuotes().then((data) => setQuotes(data));
  });

  const [currentQuote, setCurrentQuote] = useState(0);

  // Quote handling functions
  const nextQuote = async () => {
    setCurrentQuote((prevCurrentQuote) => prevCurrentQuote + 1);
  };

  const previousQuote = () => {
    if (currentQuote !== 0) {
      setCurrentQuote((prevCurrentQuote) => prevCurrentQuote - 1);
    }
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
              {quotes ? (
                `"${quotes[currentQuote]?.quote}"`
              ) : (
                <Image
                  src={"/assets/loading/spinner.svg"}
                  alt={"loading.svg"}
                  width={25}
                  height={25}
                />
              )}
              {quotes ? `- ${quotes[currentQuote]?.author}` : ""}
            </motion.p>
            <div className="content__arrows">
              <FontAwesomeIcon
                icon={faArrowLeft}
                className="arrow__btn"
                width={68}
                onClick={previousQuote}
              />
              <FontAwesomeIcon
                icon={faArrowRight}
                className="arrow__btn"
                width={68}
                onClick={nextQuote}
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
          alt="about__logo"
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
            className="news__cards"
            viewport={{ margin: "-150px -150px -150px -150px", once: true }}
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
        <Session__Form />
      </section>
    </main>
  );
};

export default Home;
