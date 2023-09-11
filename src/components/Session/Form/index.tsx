/* eslint-disable react/no-unescaped-entities */
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { fadeEffect } from "@/config/framer.config";
import { useSession } from "next-auth/react";
import "./style.scss";

type SessionFormProps = {
  first_name: string;
  last_name: string;
  email: string;
  reason: string;
};

const SessionForm: React.FunctionComponent = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [formInputs, setFormInputs] = useState<SessionFormProps>({
    first_name: "",
    last_name: "",
    email: "",
    reason: "",
  });
  const { status, data: session } = useSession();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!session?.user) {
        throw new Error("You must be logged in to schedule a session!");
      }

      if (
        !formInputs.first_name ||
        !formInputs.last_name ||
        !formInputs.email ||
        !formInputs.reason
      ) {
        throw new Error("Please fill out all fields!");
      }

      if (session?.user) {
        alert("Session scheduled!");
      }
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormInputs({
      ...formInputs,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <motion.div
      variants={fadeEffect}
      initial="hidden"
      whileInView="visible"
      className="session-form"
      viewport={{ margin: "-150px -150px -150px -150px", once: true }}
    >
      <h1 className="session-form__title">Schedule a session!</h1>
      <p className="session-form__description">
        Interested in scheduling a session with us? Fill out the form below with
        your preferred date and time, and we'll get back to you as soon as
        possible. Your path to success starts here!
      </p>
      <form onSubmit={handleSubmit} className="session-form__form">
        {error && <p className="session-form__error">{error}</p>}
        <input
          type="text"
          name="first_name"
          id="form__first-name"
          placeholder="Enter first name"
          className="session-form__input"
        />
        <input
          type="text"
          name="last_name"
          id="form__last-name"
          placeholder="Enter last name"
          className="session-form__input"
        />
        <input
          type="text"
          name="email"
          id="form__email"
          placeholder="Enter email address"
          className="session-form__input"
        />
        <textarea
          name="reason"
          id="form__reason"
          placeholder="Enter a reason"
          className="session-form__textarea"
        />
        <button type="submit" className="session-form__button">
          {loading ? "Sending..." : "Submit"}
        </button>
      </form>
    </motion.div>
  );
};

export default SessionForm;
