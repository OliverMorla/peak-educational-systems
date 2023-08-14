/* eslint-disable react/no-unescaped-entities */
import { motion } from "framer-motion";
import { fadeEffect } from "@/config/framer.config";
import "./style.scss";
const Session__Form = () => {
  return (
    <motion.div
      variants={fadeEffect}
      initial="hidden"
      whileInView="visible"
      className="contact"
      viewport={{ margin: "-150px -150px -150px -150px", once: true }}
    >
      <h1>Schedule a session!</h1>
      <p>
        Interested in scheduling a session with us? Fill out the form below with
        your preferred date and time, and we'll get back to you as soon as
        possible. Your path to success starts here!
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
  );
};

export default Session__Form;
