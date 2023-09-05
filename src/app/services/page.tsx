/* eslint-disable react/no-unescaped-entities */
"use client";
import { motion } from "framer-motion";
import { fadeEffect, fadeEffect2 } from "@/config/framer.config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSchool,
  faBookOpen,
  faFaceGrinBeam,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Intro from "@/components/Home/Intro";
import SessionForm from "@/components/Session/Form";
import "./page.scss";

const Services: React.FunctionComponent = (): JSX.Element => {
  return (
    <main className="services">
      <Intro>
        <Image
          src={"/assets/logos/logo-3-nobg2.webp"}
          alt="logo"
          width={965}
          height={477.55}
          className="content__logo"
        />
        <h1>Services</h1>
      </Intro>
      <section className="services__cards">
        <motion.div
          variants={fadeEffect2}
          initial="hidden"
          whileInView="visible"
          viewport={{ margin: "-150px -150px -150px -150px", once: true }}
          className="services__cards-group"
        >
          <div className="services__card">
            <div className="card__header">
              <h1>
                Mentoring and Consulting for New Teachers and Teachers in
                Training
              </h1>
            </div>
            <p className="card__desc">
              Mentoring and facilitative coaching with teachers in training, new
              teachers, and veteran teachers who desire a supportive space to
              share their creative ideas, professional challenges, and engage in
              professional development. This is a space for the elementary
              education warriors to uplift and support each other on an as
              needed basis.
            </p>
          </div>
          <div className="services__card">
            <div className="card__header">
              <h1>Consulting and Conferring with Parents and Caregivers</h1>
            </div>
            <p className="card__desc">
              Consultation services for parents and caregivers of elementary
              education students, including students with disabilities. "Helping
              you, help your child, implement strategies to address their
              academic challenges and reach their full potential."
            </p>
          </div>
          <div className="services__card">
            <div className="card__header">
              <h1>
                Increasing the Awareness of Diverse Literature to Increase
                Childhood Literacy
              </h1>
            </div>
            <p className="card__desc">
              Promoting the advancement of childhood literacy via writing for
              publication and circulating its literary works into the world is a
              passion. Sharing about books across all genres that is reflective
              of children from all walks of life, and spreading the joy of
              reading to school aged children is a joy. Young readers from all
              backgrounds should have access to, and engagement with, diverse,
              high quality literature. Consider an author visit at your school.
              Visit sydneywjoshua.com for published works.
            </p>
          </div>
        </motion.div>
        <motion.div
          variants={fadeEffect}
          initial="hidden"
          whileInView="visible"
          viewport={{ margin: "-150px -150px -150px -150px", once: true }}
          className="about__badges"
        >
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
        </motion.div>
      </section>
      <section className="services__contact">
        <Image
          src={"/assets/logos/logo-3-nobg2.webp"}
          alt="logo"
          width={975}
          height={475}
          className="contact__logo"
        />
        <SessionForm />
      </section>
    </main>
  );
};

export default Services;
