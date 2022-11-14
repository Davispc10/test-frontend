import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

import { LoadCharactersComics, LoadCharactersComicsResult } from "@/domain/features";
import { ComicCard, Pagination } from "@/presentation/components";
import { useStringFilterSetup } from "@/presentation/hooks";
import { RequestHandler } from "@/data/contracts";

import styles from "./styles.module.scss";

type CharacterDetailsProps = {
  loadCharactersComics: LoadCharactersComics;
  requestHandler: RequestHandler<LoadCharactersComicsResult>;
};

export const CharacterDetails: React.FC<CharacterDetailsProps> = ({ loadCharactersComics, requestHandler }: CharacterDetailsProps) => {
  const reqLength = 12;
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredComics, setFilteredComics] = useState([]);
  const useStringFilter = useStringFilterSetup((array) => setFilteredComics(array));

  const handleNextPage = async () => {
    setCurrentPage((prevState) => prevState + 1);
  };

  const handlePrevPage = async () => {
    setCurrentPage((prevState) => prevState - 1);
  };

  const { data, isLoading, error } = requestHandler.handle(["loadCharactersComics", currentPage.toString()], async () => {
    const result = await loadCharactersComics.loadAll(Number(id), currentPage, reqLength);
    setFilteredComics(result.comics);
    return result;
  });

  const { totalComics, comics } = data || {};

  return (
    <div className={styles.characterDetailsWrapper}>
      <Link data-testid="back-button" to={{ pathname: "/" }} className={styles.backButton}>
        <div>&larr;</div>
        <span>Back</span>
      </Link>
      {filteredComics.length > 0 && (
        <div className={styles.searchFilter}>
          <input
            data-testid="search-filter"
            type="text"
            placeholder="Filtrar por titulo"
            onChange={(event) => useStringFilter(event.target.value, comics, "title")}
          />
        </div>
      )}

      <div className={styles.comicCardsWrapper}>
        {filteredComics.length === 0 ? (
          <div className={styles.noData}>Nenhum dado encontrado</div>
        ) : (
          filteredComics.map((item) => <ComicCard {...item} key={item.id} />)
        )}
      </div>

      {filteredComics.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(totalComics / reqLength)}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
        />
      )}
      {error && <div data-testid="load-error">{error}</div>}
    </div>
  );
};
