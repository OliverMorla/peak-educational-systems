"use client";
import { motion } from "framer-motion";
import { fadeEffect2 } from "@/config/framer.config";
import "./style.scss";
const Intro = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  return (
    <section className="intro__section">
      <section className="section__bg">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeEffect2}
          className="section__content"
        >
          {children}
        </motion.div>
      </section>
    </section>
  );
};

export default Intro;
