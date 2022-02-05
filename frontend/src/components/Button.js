import React from "react";
import styles from "../../styles/Button.module.css";

export default function Button() {
  return (
    <button className={styles.pushable}>
      {/* <span className={styles.shadow}></span> */}
      {/* <span className="edge"></span> */}
      <span className={styles.front}>Lets Get Started</span>
    </button>
  );
}
