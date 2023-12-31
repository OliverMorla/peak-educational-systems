/* eslint-disable react/no-unescaped-entities */
"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useInView } from "framer-motion";
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
import {
  fadeEffect,
  fadeEffect2,
  fadeEffectDelay1,
  fadeEffectDelay2,
  fadeEffectDelay3,
} from "@/config/framer.config";
import Link from "next/link";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import Typewriter from "typewriter-effect";
import Card from "@/components/News/Card";
import Modal from "@/components/Modal";
import SessionForm from "@/components/Session/Form";
import { Counter } from "@/components/Counter";
import ReactGA from "react-ga4";
import "./page.scss";

const Home: React.FunctionComponent = (): JSX.Element => {
  const pathname = usePathname();

  const TrackingID = process.env.NEXT_PUBLIC_GA_TRACKING_ID;
  ReactGA.initialize(TrackingID ?? "");
  ReactGA.send(pathname);

  const [eventSelect, setEventSelect] = useState("Events");
  const [hasRun, setHasRun] = useState<boolean>(false);
  const [quotes, setQuotes] = useState<Quote[]>();
  const [news, setNews] = useState<News[]>();
  const [currentQuote, setCurrentQuote] = useState(0);

  const getQuotes = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quotes`);
      const response = (await res.json()) as QuotesResponse;
      if (response?.quotes) return setQuotes(response?.quotes);
    } catch (err) {
      if (err instanceof Error) return console.log(err.message);
    }
  };

  const getNews = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/news/home`);
      const response = (await res.json()) as NewsCardResponse;
      if (response?.news) setNews(response?.news);
    } catch (err) {
      if (err instanceof Error) return console.log(err.message);
    }
  };

  const nextQuote = async () => {
    setCurrentQuote((prevCurrentQuote) => prevCurrentQuote + 1);
  };

  const previousQuote = () => {
    if (currentQuote !== 0) {
      setCurrentQuote((prevCurrentQuote) => prevCurrentQuote - 1);
    }
  };

  useEffect(() => {
    if (!hasRun) {
      getQuotes();
      getNews();
      setHasRun(true);
    }
  }, [hasRun]);

  const about__badges = useRef(null);
  const IsInView = useInView(about__badges, { once: true });

  return (
    <main className="home">
      {/* <Modal
        text="This website is still under construction hence, not everything is functional"
        type="Warning"
      /> */}
      <section className="home__intro-section">
        <section className="home__section-bg">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeEffect2}
            className="home__content"
          >
            <h1>
              <motion.span
                variants={fadeEffectDelay1}
                initial="hidden"
                animate="visible"
              >
                Discover,
              </motion.span>
              <motion.span
                variants={fadeEffectDelay2}
                initial="hidden"
                animate="visible"
              >
                &nbsp;Learn,
              </motion.span>
              <motion.span
                variants={fadeEffectDelay3}
                initial="hidden"
                animate="visible"
              >
                &nbsp;Explore
              </motion.span>
            </h1>
            <div className="content__border"></div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              key={currentQuote}
              className="content__quote"
            >
              {quotes ? (
                <Typewriter
                  onInit={(typewriter) => {
                    typewriter
                      .typeString(`"${quotes[currentQuote]?.quote}"`)
                      .changeDelay(100)
                      .start();
                  }}
                />
              ) : (
                <Image
                  src={"/assets/loading/spinner.svg"}
                  alt={"loading.svg"}
                  width={25}
                  height={25}
                />
              )}
              {quotes ? `- ${quotes[currentQuote]?.author}` : ""}
            </motion.div>
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
          </motion.div>
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
          <div className="about__badges" ref={about__badges}>
            <div className="badge">
              <FontAwesomeIcon icon={faSchool} className="badge__icon" />
              <h2>Quick Support</h2>
            </div>
            <div className="badge">
              <FontAwesomeIcon icon={faBookOpen} className="badge__icon" />
              <h2>
                {IsInView ? <Counter duration={1000} targetCount={2} /> : "2"}+
                Books Written
              </h2>
            </div>
            <div className="badge">
              <FontAwesomeIcon icon={faFaceGrinBeam} className="badge__icon" />
              <h2>
                {IsInView ? <Counter duration={50} targetCount={100} /> : "100"}
                + Members
              </h2>
            </div>
          </div>
        </motion.div>
        <Image
          src={"/assets/logos/logo-3-nobg2.webp"}
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
            {news?.map((news) => (
              <li
                key={news.id}
                style={{
                  listStyle: "none",
                }}
              >
                <Link href={`/auth/news/${news.id}`}>
                  <Card
                    id={news.id}
                    views={news.views}
                    key={news.id}
                    title={news.title}
                    author={news.users?.first_name}
                    number_of_comments={news._count?.comments || 0}
                    photo_cover_url={news.photo_cover_url}
                    category={news.category}
                    created_at={news.created_at}
                    updated_at={news.updated_at}
                  />
                </Link>
              </li>
            ))}
          </motion.div>
        </div>
        <section className="home__event-modal">
          <div className="event__header">
            <span
              onClick={() => setEventSelect("Blogs")}
              style={eventSelect === "Blogs" ? { fontWeight: "900" } : {}}
            >
              Blogs
            </span>
            <span
              onClick={() => setEventSelect("Events")}
              style={eventSelect === "Events" ? { fontWeight: "900" } : {}}
            >
              Events
            </span>
            <span
              onClick={() => setEventSelect("Meetings")}
              style={eventSelect === "Meetings" ? { fontWeight: "900" } : {}}
            >
              Meetings
            </span>
          </div>
          <div className="event__body">
            <span>
              <FontAwesomeIcon icon={faChalkboardTeacher} width={20} />
              {eventSelect === "Blogs"
                ? "Attend monthly workshops, webinars, and coaching sessions from industry leaders"
                : eventSelect === "Events"
                ? "Apply to programs/events in collaboration with our partners"
                : eventSelect === "Meetings"
                ? "Submit your resume to our partner companies"
                : ""}
            </span>
            <span>
              <FontAwesomeIcon icon={faUserGroup} width={20} />
              {eventSelect === "Blogs"
                ? "Make friends with Memberships members through social activities"
                : eventSelect === "Events"
                ? "Get help with homework and career advice in our Slack workspace"
                : eventSelect === "Meetings"
                ? "Experience a truly safe space for Black and Latinx CS students"
                : ""}
            </span>
            <span>
              <FontAwesomeIcon icon={faBookOpen} width={20} />
              {eventSelect === "Blogs"
                ? "Secure the bag at our annual career fairs"
                : eventSelect === "Events"
                ? "Find your life-long support system"
                : eventSelect === "Meetings"
                ? "Apply to programs/events in collaboration with our partners"
                : ""}
            </span>
          </div>
        </section>
      </section>
      <section className="home__contact-section">
        <Image
          src={"/assets/logos/logo-3-nobg2.webp"}
          alt="logo"
          width={975}
          height={475}
          className="contact__logo"
        />
        <SessionForm />
      </section>
    </main>
  );
};

export default Home;
