import React from "react";

import styles from "./styles.module.scss";

export const Header: React.FC = () => {
  return (
    <div className={styles.headerWrapper}>
      <h1>DINHEIROW MARVEL</h1>
      <strong>Pedro Freitas</strong>
    </div>
  );
};
