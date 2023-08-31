"use client";
import Image from "next/image";
import Intro from "@/components/Home/Intro";
import { motion } from "framer-motion";
import { fadeEffect2 } from "@/config/framer.config";
import "./page.scss";

const Contact: React.FunctionComponent = (): JSX.Element => {
  return (
    <main className="contact">
      <Intro>
        <Image
          src={"/assets/logos/logo-3-nobg2.webp"}
          alt="logo"
          width={965}
          height={477.55}
          className="content__logo"
        />
        <section className="contact-form">
          <h1>Contact Me</h1>
          <form action="" className="contact-form__form">
            <div className="contact-form__group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="contact-form__group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="contact-form__group">
              <label htmlFor="message">Message</label>
              <textarea
                name="message"
                id="message"
                cols={30}
                rows={10}
                placeholder="Enter your message here"
              ></textarea>
            </div>
            <button className="contact-form__btn">Send</button>
          </form>
        </section>
      </Intro>
    </main>
  );
};

export default Contact;
