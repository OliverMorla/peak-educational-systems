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
  console.log(newsletterInput);
  // const [error, setError] = useState<string | undefined>(undefined);
  // const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const handleNewsletterForm = async (e) => {
    e.preventDefault();
    const newsletter_btn = document.querySelector(".newsletter__btn");

    if (newsletterInput !== "") {
      try {
        const response = await fetch("/api/newsletter", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: newsletterInput,
          }),
        });
        const result = await response.json();

        if (result?.status === "subscribed") {
          alert("Thank you for subscribing to our newsletter!");
        } else {
          alert(result?.title);
        }
      } catch (err) {
        console.log(err instanceof Error ? err.message : err);
      }
      newsletter_btn?.setAttribute("disabled", "true");
    } else {
      alert("Please enter your email!");
    }
  };

  return (
    <footer className="footer">
      <section className="footer__top">
        <div className="footer__about">
          <div className="footer__logo-wrapper">
            <Image
              src={"/assets/logos/logo-3-nobg.webp"}
              alt="footer__company-logo"
              width={125}
              height={75}
              className="footer__company-logo"
            />
            <h3 className="footer__company-name">Peak Educational Systems</h3>
          </div>
          <p className="footer__slogan">
            Planting the seeds of knowledge and creativity, one story and one
            lesson at a time. Together, we grow the future.
          </p>
          <div className="footer__policy-links">
            <Link href={""} className="footer__links-entry">
              Privacy Policy
            </Link>
            <Link href={""} className="footer__links-entry">
              Terms of Condition
            </Link>
            <Link href={""} className="footer__links-entry">
              FAQ
            </Link>
          </div>
        </div>
        <div className="footer__nav">
          <span className="footer__nav-title">Features</span>
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
          <section className="footer__contact">
            <h2 className="footer__contact-title">Contact Us</h2>
            <div className="footer__icon-wrapper">
              <FontAwesomeIcon icon={faFacebook} className="socials__btn" />
              <FontAwesomeIcon icon={faLinkedin} className="socials__btn" />
              <FontAwesomeIcon icon={faTwitter} className="socials__btn" />
              <FontAwesomeIcon icon={faInstagram} className="socials__btn" />
            </div>
          </section>
          <section className="footer__newsletter">
            <form>
              <input
                type="text"
                name="newsletter-text"
                id="footer__newsletter-input"
                value={newsletterInput}
                placeholder="Enter your email"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewsletterInput(e.currentTarget.value)
                }
              />

              <button
                className="footer__newsletter-button"
                onClick={handleNewsletterForm}
              >
                Subscribe
              </button>
            </form>
          </section>
        </div>
      </section>
      <section className="footer__bottom">
        <p className="footer__copyright">Copyright ©2023 All rights reserved</p>
      </section>
    </footer>
  );
};

export default Footer;
