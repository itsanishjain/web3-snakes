import React from "react";
import styles from "../../styles/Button.module.css";

export default function Button({action,text}) {
  return (
    <button onClick={action} className={styles.pushable}>
      {/* <span className={styles.shadow}></span> */}
      {/* <span className="edge"></span> */}
      <span className={styles.front}>{text}</span>
    </button>
  );
}
