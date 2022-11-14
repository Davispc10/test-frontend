import React from "react";

import styles from "./styles.module.scss";

type ComicCardProps = {
  title: string;
  description: string;
  thumbnail: string;
};

export const ComicCard: React.FC<ComicCardProps> = ({ title, description, thumbnail }: ComicCardProps) => {
  return (
    <div  data-testid="comic-card" className={styles.comicCardWrapper}>
      <div data-testid="comic-thumbnail" className={styles.comicThumbnail} style={{ backgroundImage: `url(${thumbnail})` }}></div>
      <div className={styles.comicInfo}>
        <strong data-testid="comic-title" className={styles.comicTitle}>{title}</strong>
        <strong data-testid="comic-description" className={styles.comicDescription}>
          Description: <p>{description}</p>
        </strong>
      </div>
    </div>
  );
};
