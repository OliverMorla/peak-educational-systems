"use client";

import { useRef, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession, signOut } from "next-auth/react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import Login from "@/components/Modal/Login";
import Image from "next/image";
import Link from "next/link";
import "./style.scss";
import ProfileSidebarMenu from "../Modal/ProfileSidebarMenu";

const Header: React.FunctionComponent = (): JSX.Element => {
  const navRef = useRef<HTMLDivElement>(null);
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const path = usePathname();
  const { data: session, update } = useSession();
  if (session?.user?.name === "undefined undefined" || session?.user?.name === "null null") signOut();
  console.log(session?.user?.name);

  // debugging purposes
  console.log(session);
  useEffect(() => {
    // TIP: You can also use `navigator.onLine` and some extra event handlers
    // to check if the user is online and only update the session if they are.
    // https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine
    const interval = setInterval(() => update(), 1000 * 60 * 60);
    return () => clearInterval(interval);
  }, [update]);
  return (
    <>
      <header
        className="header"
        style={{
          backgroundColor: path.startsWith("/auth") ? "var(--senary)" : "",
        }}
      >
        <section className="header__title-section">
          <Image
            src={"/assets/logos/logo-3-nobg_small.webp"}
            alt="header__logo"
            width={125}
            height={75}
            className="header__logo"
          />
          <Link href={"/"}>
            <h1 className="header__title">Peak Educational Systems</h1>
          </Link>
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
          {session?.user && (
            <Link href="/auth/blog" className="nav__item">
              Blog
            </Link>
          )}
          {session?.user && (
            <Link href="/auth/news" className="nav__item">
              News
            </Link>
          )}
          <Link href="/contact" className="nav__item">
            Contact
          </Link>
          {session?.user === undefined && path !== "/about" && (
            <div
              className="nav__item login-btn"
              onClick={() => setIsLoginOpen(!isLoginOpen)}
            >
              Sign In
            </div>
          )}
          {path === "/about" && session?.user === undefined && (
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              className="nav__item"
            >
              <Link href={"/register"}>Become a Member</Link>
            </motion.div>
          )}
          {session?.user?.email === "admin@peakeducationalsystems.com" && (
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              className="nav__item admin-btn"
            >
              <Link href={"/auth/admin"}>Admin Panel</Link>
            </motion.div>
          )}
          {session?.user && (
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              className="nav__item profile-btn"
            >
              <Link href={"/auth/dashboard"}>
                {session?.user?.name === null
                  ? session?.user?.email
                  : session?.user?.name}
              </Link>
            </motion.div>
          )}
          {session?.user && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="nav__item logout-btn"
            >
              <button onClick={() => signOut()}>Log Out</button>
            </motion.div>
          )}
        </nav>

        {session?.user === undefined && isLoginOpen === false && (
          <Login isLoginOpen={isLoginOpen} setIsLoginOpen={setIsLoginOpen} />
        )}
      </header>
      {/* {true && <ProfileSidebarMenu />} */}
    </>
  );
};

export default Header;
