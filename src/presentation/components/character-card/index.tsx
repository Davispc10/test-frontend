import React from "react";

import styles from "./styles.module.scss";

type CharacterCardProps = {
  name: string;
  description: string;
  thumbnail: string;
};

export const CharacterCard: React.FC<CharacterCardProps> = ({ name, description, thumbnail }: CharacterCardProps) => {
  return (
    <div  data-testid="character-card" className={styles.characterCardWrapper}>
      <div data-testid="character-thumbnail" className={styles.characterThumbnail} style={{ backgroundImage: `url(${thumbnail})` }}></div>
      <div className={styles.characterInfo}>
        <strong data-testid="character-name" className={styles.characterName}>{name}</strong>
        <strong data-testid="character-description" className={styles.characterDescription}>
          Description: <p>{description}</p>
        </strong>
      </div>
    </div>
  );
};
