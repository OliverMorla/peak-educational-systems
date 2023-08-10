"use client";

import { motion } from "framer-motion";
import { fadeEffect } from "@/config/framer.config";
import "./style.scss";
const Intro = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  return (
    <section className="intro__section">
      <section className="section__bg">
        <div className="section__content">{children}</div>
      </section>
    </section>
  );
};

export default Intro;
