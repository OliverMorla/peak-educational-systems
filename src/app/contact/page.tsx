"use client";
import { ChangeEvent, useState, useRef } from "react";
import Image from "next/image";
import Intro from "@/components/Home/Intro";
import "./page.scss";

const Contact: React.FunctionComponent = (): JSX.Element => {
  const contactBtn = useRef<HTMLButtonElement>(null);
  const [isButtonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [input, setInput] = useState({
    name: "",
    email: "",
    message: "",
  });
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      if (!input.name || !input.email || !input.message)
        return alert("Please fill all the fields");
      new Promise((resolve, reject) => {
        setButtonDisabled(true);
        contactBtn.current?.setAttribute("disabled", "disabled");
        setTimeout(() => {
          resolve("resolved");
        }, 2000);
      }).then(() => {
        contactBtn.current?.removeAttribute("disabled");
        setButtonDisabled(false);
        alert("Message sent successfully!");
      });
    } catch (err) {
      if (err instanceof Error) return alert(err.message);
    }
  };
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
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setInput({ ...input, name: e.target.value })
                }
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
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setInput({ ...input, email: e.target.value })
                }
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
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setInput({ ...input, message: e.target.value })
                }
                placeholder="Enter your message here"
              ></textarea>
            </div>
            <button
              className="contact-form__btn"
              onClick={handleSubmit}
              ref={contactBtn}
            >
              {isButtonDisabled ? "Sending..." : "Send"}
            </button>
          </form>
        </section>
      </Intro>
    </main>
  );
};

export default Contact;
