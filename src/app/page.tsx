"use client"

import { FunctionComponent, useEffect } from "react";
import styles from "./page.module.css";

const Home: FunctionComponent = () => {

  useEffect(() => {
    alert("Website is under construction, not everything is functional yet.")
  })

  return (
    <main>
      <h1 className={styles.wrapper}>Home</h1>
    </main>
  );
};

export default Home;
