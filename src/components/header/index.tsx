"use client";

import Link from "next/link";
import Image from "next/image";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";

const Header: React.FunctionComponent = (): JSX.Element => {
  const navRef = useRef<HTMLDivElement>(null);
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
      </nav>
      {/* <DropdownMenu /> */}
    </header>
  );
};

export default Header;
