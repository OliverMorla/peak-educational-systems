"use client";

/* eslint-disable react/no-unescaped-entities */
import { motion } from "framer-motion";
import { fadeEffect } from "@/config/framer.config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faSchool } from "@fortawesome/free-solid-svg-icons";
import { faFaceGrinBeam } from "@fortawesome/free-regular-svg-icons";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import "./style.scss";

const About: React.FunctionComponent = (): JSX.Element => {
  return (
    <section className="home__about-section">
      <motion.div
        variants={fadeEffect}
        initial="hidden"
        whileInView="visible"
        className="about"
        viewport={{ margin: "-150px -150px -150px -150px", once: true }}
      >
        <h1 className="about__title">About the company</h1>
        <p className="about__info">
          Peak Educational Systems was founded in 2004. Its mission was to
          provide academic support and engagement to elementary school aged
          children and consulting services for parents seeking guidance on how
          to best meet their child's academic needs.
          <br /> <br />
          Since its inception, Peak Educational Systems has expanded that
          mission by providing support for novice teachers while focusing on the
          importance of childhood literacy via writing for publication and
          circulating its literary works into the world. We believe that
          children from all backgrounds should have access to, and engagement
          with, diverse, high quality literature.
        </p>
        <div className="about__badges">
          <div className="badge">
            <FontAwesomeIcon icon={faSchool} className="badge__icon" />
            <h2>Quick Support</h2>
          </div>
          <div className="badge">
            <FontAwesomeIcon icon={faBookOpen} className="badge__icon" />
            <h2>2+ Books Written</h2>
          </div>
          <div className="badge">
            <FontAwesomeIcon icon={faFaceGrinBeam} className="badge__icon" />
            <h2>100+ Members</h2>
          </div>
        </div>
      </motion.div>
      <Image
        src={"/assets/logos/logo-3-nobg2.webp"}
        alt="logo"
        width={975}
        height={475}
        className="about__logo"
      />
      <div className="home__marquee">
        <Marquee
          style={{
            fontSize: "36px",
            fontWeight: "300",
            display: "flex",
            justifyContent: "space-between",
            gap: "20px",
          }}
        >
          NEWS NEWS NEWS NEWS NEWS NEWS NEWS NEWS NEWS NEWS NEWS NEWS NEWS NEWS
          NEWS NEWS NEWS NEWS
        </Marquee>
      </div>
    </section>
  );
};

export { About };
