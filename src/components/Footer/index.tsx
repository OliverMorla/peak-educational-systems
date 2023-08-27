"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import "./style.scss";

const Footer = () => {
  const [newsletterInput, setNewsletterInput] = useState<string>("");
  // const [error, setError] = useState<string | undefined>(undefined);
  // const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const handleNewsletterForm = (): void => {
    const newsletter_btn = document.querySelector(".newsletter__btn");

    if (newsletterInput !== "") {
      alert("Thanks for Subscribing to our Newsletter!");
      newsletter_btn?.setAttribute("disabled", "true");
    } else {
      alert("Please enter your email!");
    }
  };

  return (
    <footer className="footer">
      <section className="footer__section-top">
        <div className="footer__about">
          <div className="about__title">
            <Image
              src={"/assets/logos/logo-3-nobg.png"}
              alt="header-logo"
              width={125}
              height={75}
              className="header-logo"
            />
            <h3>Peak Educational Systems</h3>
          </div>
          <p className="about__slogan">
            Planting the seeds of knowledge and creativity, one story and one
            lesson at a time. Together, we grow the future.
          </p>
          <div className="about__links">
            <Link href={""} className="links__entry">
              Privacy Policy
            </Link>
            <Link href={""} className="links__entry">
              Terms of Condition
            </Link>
            <Link href={""} className="links__entry">
              FAQ
            </Link>
          </div>
        </div>
        <div className="footer__features">
          <span>Features</span>
          <Link href="" className="features__item">
            Home
          </Link>
          <Link href="" className="features__item">
            About Us
          </Link>
          <Link href="" className="features__item">
            Services
          </Link>
          <Link href="" className="features__item">
            News
          </Link>
          <Link href="" className="features__item">
            Testimonials
          </Link>
          <Link href="" className="features__item">
            Contact Us
          </Link>
          <Link href="" className="features__item">
            Blogs
          </Link>
        </div>
        <div className="footer__socials">
          <section className="socials__contact">
            <h2 className="contact__title">Contact Us</h2>
            <div className="contact__wrapper">
              <FontAwesomeIcon icon={faFacebook} className="socials__btn" />
              <FontAwesomeIcon icon={faLinkedin} className="socials__btn" />
              <FontAwesomeIcon icon={faTwitter} className="socials__btn" />
              <FontAwesomeIcon icon={faInstagram} className="socials__btn" />
            </div>
          </section>
          <section className="socials__newsletter">
            <input
              type="text"
              name="newsletter-text"
              id="newsletter-text"
              value={newsletterInput}
              placeholder="Enter your email"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewsletterInput(e.currentTarget.value)
              }
            />
            <button className="newsletter__btn" onClick={handleNewsletterForm}>
              Subscribe
            </button>
          </section>
        </div>
      </section>
      <section className="footer__section-bottom">
        <p className="bottom__text">Copyright ©2023 All rights reserved</p>
      </section>
    </footer>
  );
};

export default Footer;
