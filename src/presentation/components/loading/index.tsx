import React from "react";
import styles from "./styles.module.scss";

export const Loading: React.FC = () => {
  return <div data-testid="loading" className={styles.loading}>Loading...</div>;
};
