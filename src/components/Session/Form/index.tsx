/* eslint-disable react/no-unescaped-entities */
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { fadeEffect } from "@/config/framer.config";
import { useSession } from "next-auth/react";
import "./style.scss";

type SessionFormProps = {};

const SessionForm: React.FunctionComponent = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { status, data: session } = useSession();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (session?.user) {
        if (
          e.currentTarget.first_name.value !== "" ||
          e.currentTarget.last_name.value !== "" ||
          e.currentTarget.email.value !== "" ||
          e.currentTarget.reason.value
        ) {
          alert("Session scheduled!");
          // setLoading(true);
          // const res = await fetch(
          //   `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/sessions`,
          //   {
          //     method: "POST",
          //     headers: {
          //       "Content-Type": "application/json",
          //     },
          //     body: JSON.stringify({
          //       first_name: e.currentTarget.first_name.value,
          //       last_name: e.currentTarget.last_name.value,
          //       email: e.currentTarget.email.value,
          //       reason: e.currentTarget.reason.value,
          //     }),
          //   }
          // );
          // const response = await res.json();
          // setLoading(false);
          // return response;
        }
      } else {
        throw new Error("You have to sign in!");
      }
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };
  return (
    <motion.div
      variants={fadeEffect}
      initial="hidden"
      whileInView="visible"
      className="session__form"
      viewport={{ margin: "-150px -150px -150px -150px", once: true }}
    >
      <h1>Schedule a session!</h1>
      <p>
        Interested in scheduling a session with us? Fill out the form below with
        your preferred date and time, and we'll get back to you as soon as
        possible. Your path to success starts here!
      </p>
      <form onSubmit={handleSubmit}>
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
  );
};

export default SessionForm;
