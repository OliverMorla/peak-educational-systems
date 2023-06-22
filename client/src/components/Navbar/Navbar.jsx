import React, { useEffect, useState } from "react";
import { Link, useLocation, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import "./Navbar.scss";

const Navbar = () => {
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLink, setShowLink] = useState(false);
  const [SignedIn, setSignedIn] = useState(false);
  const [signedInModal, setSignedInModal] = useState(false);

  useEffect(() => {
    setShowLink(location.pathname === "/about");
  }, [location.pathname]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <nav className="navbar-wrapper">
        <h1 className="navbar-title">
          <NavLink to={"/"}>Peak Educational Systems</NavLink>
        </h1>
        <div className="navbar-link-wrapper">
          <NavLink className={("active", "navbar-link")} to="/">Home </NavLink>
          <NavLink className={("active", "navbar-link")} to="/services">Services</NavLink>
          <div
            className="navbar-link"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <NavLink className={("active", "navbar-link")} to="/about">About</NavLink>
            <div
              className="about-dropdown-dialog"
              style={showDropdown ? { opacity: 1, pointerEvents: "auto" } : { opacity: 0, pointerEvents: "none" }}
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <Link className="about-dropdown-item">Specialties</Link>
              <Link className="about-dropdown-item">Our Team</Link>
            </div>
          </div>
          <NavLink className={("active", "navbar-link")} to="/blog">Blog</NavLink>
          <NavLink className={("active", "navbar-link")} to="/contact">Contact</NavLink>
          {showLink && (
            <motion.div initial={{ x: 180 }} animate={{ x: 0 }}>
              <NavLink className="navbar-link" to="/user/join">Become a Member</NavLink>
            </motion.div>
          )}
          {SignedIn && (
            <NavLink
              className="navbar-link"
              to={"/user/dashboard"}
              onMouseEnter={() => setSignedInModal(true)}
              onMouseLeave={() => setSignedInModal(false)}
            >
              Oliver M
            </NavLink>
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
            <Link className="signed-dropdown-item" to={"/user/schedule-a-meeting"}>Schedule a Meeting</Link>
            <Link className="signed-dropdown-item" to={"/user/dashboard"}>Dashboard</Link>
            <Link className="signed-dropdown-item" to={"/events"}>Events</Link>
            <Link className="signed-dropdown-item" to={"/user/logout"}>Log Out</Link>
          </div>
        </div>
      </nav>
    </motion.div>
  );
};

export default Navbar;
