import React, { useState } from "react";

import { Character } from "@/domain/models";
import { LoadCharacters } from "@/domain/features";
import { CharacterCard, Loading, Pagination } from "@/presentation/components";
import { useStringFilterSetup } from "@/presentation/hooks";
import { RequestHandler } from "@/data/contracts";

import styles from "./styles.module.scss";
import { Link } from "react-router-dom";

type HomeProps = {
  loadCharacters: LoadCharacters;
  requestHandler: RequestHandler<Character[]>;
};

export const Home: React.FC<HomeProps> = ({ loadCharacters, requestHandler }: HomeProps) => {
  const reqLength = 24;
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const useStringFilter = useStringFilterSetup((array) => setFilteredCharacters(array));

  const handleNextPage = async () => {
    setCurrentPage((prevState) => prevState + 1);
  };

  const handlePrevPage = async () => {
    setCurrentPage((prevState) => prevState - 1);
  };

  const {
    data: characters,
    isLoading,
    error,
  } = requestHandler.handle(["loadAllCharacters", currentPage.toString()], async () => {
    const result = await loadCharacters.loadAll(currentPage, reqLength);
    setFilteredCharacters(result);
    return result;
  });

  if (isLoading) {
    return <div className={styles.loadingWrapper}>
      <Loading />
    </div>;
  } else {
    return (
      <div className={styles.homeWrapper}>
        <div className={styles.searchFilter}>
          <input
            data-testid="search-filter"
            type="text"
            placeholder="Filtrar por nome"
            onChange={(event) => useStringFilter(event.target.value, characters, "name")}
          />
        </div>

        <div className={styles.characterCardsWrapper}>
          {filteredCharacters.map((item) => (
            <Link data-testid="link" to={{ pathname: `/characters/details/${item.id}` }} key={item.id}>
              <CharacterCard {...item} />
            </Link>
          ))}
        </div>

        <Pagination currentPage={currentPage} totalPages={10} handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} />

        {error && <div data-testid="load-error">{error}</div>}
      </div>
    );
  }
};
