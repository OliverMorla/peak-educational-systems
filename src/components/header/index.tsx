"use client";

import { FunctionComponent, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import "./style.scss";

const Header: FunctionComponent = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLink, setShowLink] = useState(false);
  const [SignedIn, setSignedIn] = useState(false);
  const [signedInModal, setSignedInModal] = useState(false);
  return (
    <header>
      <nav className="navbar-wrapper">
        <h1 className="navbar-title">
          <Link href={"/"}>Peak Educational Systems</Link>
        </h1>
        <div className="navbar-link-wrapper">
          <Link className="" href="/">
            Home{" "}
          </Link>
          <Link className="" href="/services">
            Services
          </Link>
          <div
            className="navbar-link"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <Link className="" href="/about">
              About
            </Link>
            <div
              className="about-dropdown-dialog"
              style={
                showDropdown
                  ? { opacity: 1, pointerEvents: "auto" }
                  : { opacity: 0, pointerEvents: "none" }
              }
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <Link href={""} className="about-dropdown-item">
                Specialties
              </Link>
              <Link href={""} className="about-dropdown-item">
                Our Team
              </Link>
            </div>
          </div>
          <Link className="" href="/blog">
            Blog
          </Link>
          <Link className="" href="/contact">
            Contact
          </Link>
          {showLink && (
            <motion.div initial={{ x: 180 }} animate={{ x: 0 }}>
              <Link className="navbar-link" href="/user/join">
                Become a Member
              </Link>
            </motion.div>
          )}
          {SignedIn && (
            <Link
              className="navbar-link"
              href={"/user/dashboard"}
              onMouseEnter={() => setSignedInModal(true)}
              onMouseLeave={() => setSignedInModal(false)}
            >
              Oliver M
            </Link>
          )}
          <div
            className="signed-in-dialog"
            style={
              signedInModal
                ? { opacity: 1, pointerEvents: "auto" }
                : { opacity: 0, pointerEvents: "none" }
            }
            onMouseEnter={() => setSignedInModal(true)}
            onMouseLeave={() => setSignedInModal(false)}
          >
            <Link
              className="signed-dropdown-item"
              href={"/user/schedule-a-meeting"}
            >
              Schedule a Meeting
            </Link>
            <Link className="signed-dropdown-item" href={"/user/dashboard"}>
              Dashboard
            </Link>
            <Link className="signed-dropdown-item" href={"/events"}>
              Events
            </Link>
            <Link className="signed-dropdown-item" href={"/user/logout"}>
              Log Out
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
