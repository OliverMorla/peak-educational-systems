/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
"use client";
import Image from "next/image";
import Intro from "@/components/Home/Intro";
import { About as Details } from "@/components/Home/About";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./page.scss";

const About: React.FunctionComponent = (): JSX.Element => {
  return (
    <>
      <main className="about__wrapper">
        <Intro>
          <Image
            src={"/assets/logos/logo-3-nobg2.webp"}
            alt="logo"
            width={965}
            height={477.55}
            className="content__logo"
          />
          <div className="section__content-text">
            <div className="content-text">
              <h1>Visual</h1>
              <p>Truth in Every Story</p>
            </div>
            <div className="content-text">
              <h1>Tactile</h1>
              <p>Empowering Citizens with Knowledge</p>
            </div>
            <div className="content-text">
              <h1>Auditory</h1>
              <p>News You Can Trust, Voices You Can Believe</p>
            </div>
          </div>
        </Intro>
        <Details />
        <section className="about-author">
          <aside className="about-author__details">
            <section className="about-author__details-photo">
              <Image
                src="/assets/portraits/portrait-1.webp"
                alt="about-author__image"
                className="about-author__image"
                width={325}
                height={445}
              />
              <div className="about-author__photo-footer">
                <h1 className="about-author__footer-heading">
                  Sydney W. Joshua
                </h1>
                <p className="about-author__footer-desc">Connect with me</p>
                <div className="about-author__footer-socials">
                  <FontAwesomeIcon
                    icon={faFacebook}
                    className="socials__icon"
                  />
                  <FontAwesomeIcon icon={faTwitter} className="socials__icon" />
                  <FontAwesomeIcon
                    icon={faInstagram}
                    className="socials__icon"
                  />
                </div>
              </div>
              <aside className="about-author__accomplishments">
                <h1 className="about-author__accomplishments-heading">
                  Accomplishments
                </h1>
                <ul className="about-author__accomplishments-desc">
                  <li>Published Author</li>
                  <li>Mentor/Model Elementary Teacher</li>
                  <li>Childhood Education (Grades 1- 6)</li>
                  <li>Students with Disabilities (Grades 1-6)</li>
                  <li>Lead Field Advisor ~ Mosaic Curriculum Team</li>
                  <li>Social Studies Leadership Team Member</li>
                  <li>New York State English Language</li>
                  <li>
                    Arts Test Scorer New York State Math Test Scorer Children's
                  </li>
                  <li>
                    Book Reviewer Society of Children's Book Writers &
                    Illustrators
                  </li>
                  <li>Member SCBWI Proofreader Consultant​</li>
                </ul>
              </aside>
            </section>
          </aside>
          <div className="about-author__summary">
            <h1 className="about-author__summary-heading">About the author</h1>
            <p className="about-author__summary-desc">
              Sydney W. Joshua knows all about what it takes to balance a career
              and her role as a mother. After graduating from college, she went
              to work on Wall Street, the financial capital of the world. Then
              she was employed at the famous Rockefeller Center in midtown
              Manhattan for many years, working alongside high-powered lawyers
              and in-house counsel, all while obtaining her first master’s
              degree, parenting two young children, and commuting from the
              suburbs. <br /> <br />
              Furthermore, her workplace was so accommodating that in the midst
              of it all, she was able to serve as vice president of the PTA at
              her children’s school for nearly ten years and also engage in
              numerous extracurricular activities. Following her work in the
              corporate world, Sydney began a second career as an elementary
              school teacher. <br /> <br />
              She is a credentialed model teacher and has mentored numerous
              novice teachers for over a decade. Her book about the trials and
              tribulations of the classroom teacher is in progress. These days,
              Sydney lives in Long Island, NY which is referenced in her first
              children’s picture book: S is for Street Games (2022).
            </p>
          </div>
        </section>
        <section className="about-books">
          <section className="about-books__books">
            <h1 className="about-books__books-heading">Published Books</h1>
            <div className="about-books__books-list">
              <Swiper
                modules={[Navigation, Scrollbar]}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                scrollbar={{ draggable: true }}
                width={800}
                className="about-books__swiper"
              >
                <SwiperSlide>
                  <img
                    src="/assets/books/book-banner-1.webp"
                    alt="about-books__slide"
                    className="about-books__slide"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src="/assets/books/book-banner-2.webp"
                    alt="about-books__slide"
                    className="about-books__slide"
                  />
                </SwiperSlide>
              </Swiper>
            </div>
          </section>
          <section className="about-books__book-reviews">
            <h1 className="about-books__book-reviews-heading">Book Reviews</h1>
            <div className="about-books__book-reviews-list">
              <div className="about-books__book-review">
                <p className="about-books__book-review-desc">
                  “S is for Superb! This cleverly written story takes us from
                  the city life to suburban life while highlighting each letter
                  of the alphabet. The relatable storyline is brought to life by
                  the nostalgic look back at childhood games, making this an
                  excellent and engaging read aloud! A definite must-have for
                  every library collection!”
                </p>
                <h1 className="about-books__book-review-heading">
                  -F.E. Underwood, MS in Ed, Early Childhood Teacher
                </h1>
              </div>
              <div className="about-books__book-review">
                <p className="about-books__book-review-desc">
                  “S is for Superb! This cleverly written story takes us from
                  the city life to suburban life while highlighting each letter
                  of the alphabet. The relatable storyline is brought to life by
                  the nostalgic look back at childhood games, making this an
                  excellent and engaging read aloud! A definite must-have for
                  every library collection!”
                </p>
                <h1 className="about-books__book-review-heading">
                  -F.E. Underwood, MS in Ed, Early Childhood Teacher
                </h1>
              </div>
            </div>
          </section>
        </section>
      </main>
    </>
  );
};

export default About;
