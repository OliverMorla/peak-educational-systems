"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import { motion } from "framer-motion";

const Header: React.FunctionComponent = (): JSX.Element => {
  const navRef = useRef<HTMLDivElement>(null);
  const path = usePathname();
  
  // const currentUser = {
  //   id: 1,
  //   name: "Sydney",
  //   email: "admin@peakeducationalsystems.com",
  // };

  const currentUser = {
    id: 1,
    name: "John Doe",
    email: "guest@gmail.com",
  };

  // const currentUser = undefined;

  return (
    <header className="header">
      <section className="header__title-section">
        <Image
          src={"/assets/logos/logo-3-nobg_small.webp"}
          alt="header__logo"
          width={125}
          height={75}
          className="header__logo"
        />
        <h1 className="header__title">Peak Educational Systems</h1>
      </section>
      <FontAwesomeIcon
        icon={faBars}
        className="header__toggle-btn"
        width={25}
        onClick={() => navRef.current?.classList.toggle("open")}
      />
      <nav className="header__nav" ref={navRef}>
        <Link href="/" className="nav__item">
          Home
        </Link>
        <Link href="/services" className="nav__item">
          Services
        </Link>
        <Link href="/about" className="nav__item">
          About
        </Link>
        <Link href="/blog" className="nav__item">
          Blog
        </Link>
        <Link href="/contact" className="nav__item">
          Contact
        </Link>
        {path === "/about" && currentUser === undefined && (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link href={"/register"} className="nav__item">
              Become a Member
            </Link>
          </motion.div>
        )}
        {currentUser?.email === "admin@peakeducationalsystems.com" && (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link href={"/auth/admin"} className="nav__item admin-btn">
              Admin Panel
            </Link>
          </motion.div>
        )}
        {currentUser && (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link href={"/auth/dashboard"} className="nav__item profile-btn">
              {currentUser.name}
            </Link>
          </motion.div>
        )}
      </nav>
    </header>
  );
};

export default Header;
