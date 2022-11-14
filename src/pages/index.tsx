import crypto from "crypto";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useCallback, useState } from "react";
import { DebounceInput } from "react-debounce-input";
import { Button, Container, Row, Spinner } from "reactstrap";

import {
  Character as CharacterItemProps,
  CharactersResponse,
} from "@/@types/character";
import { Character } from "@/components/Character";
import { api } from "@/services/api";

type HomeProps = {
  baseCharacters: Pick<CharacterItemProps, "id" | "name" | "thumbnail">[];
  total: number;
};

const PER_PAGE_ITENS = 8;

const Home: NextPage<HomeProps> = ({ baseCharacters, total }) => {
  const [characters, setCharacters] = useState(baseCharacters);
  const [isSearching, setIsSearching] = useState(false);
  const [totalItens, setTotalItens] = useState(total);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const hasNextPage = currentPage * PER_PAGE_ITENS < totalItens;

  const handleLoadMore = useCallback(
    async (nextPage: number) => {
      if (isSearching || nextPage > Math.ceil(totalItens / PER_PAGE_ITENS))
        return;
      setIsSearching(true);
      try {
        const response = await api.get<CharactersResponse>("/characters", {
          params: {
            limit: PER_PAGE_ITENS,
            offset: (nextPage - 1) * PER_PAGE_ITENS, // offset is 0 based and page is 1 based (offset = (page - 1) * 10) so we need to subtract 1 from page to get the offset value
            ...(search.trim() !== "" && { nameStartsWith: search }),
          },
        });
        setCharacters((prevCharacters) => [
          ...prevCharacters,
          ...response.data.data.results,
        ]);
        setCurrentPage(nextPage);
      } catch {
      } finally {
        setIsSearching(false);
      }
    },
    [isSearching, totalItens, search]
  );

  const handleCharacterSearch = useCallback(async (value: string) => {
    setIsSearching(true);
    try {
      const response = await api.get<CharactersResponse>("/characters", {
        params: {
          nameStartsWith: value,
          limit: PER_PAGE_ITENS,
        },
      });

      if (response.status === 200) {
        setCharacters(response.data.data.results);
        setTotalItens(response.data.data.total);
        setCurrentPage(1);
        setSearch(value);
      }
    } catch {
    } finally {
      setIsSearching(false);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Marvel Characters - Dinheirow</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container className="mt-3 pb-4">
        <h1 className="text-center fw-bold">CHARACTERS</h1>

        <DebounceInput
          placeholder="Digite qual personagem deseja procurar"
          className="form-control form-control-lg mt-2 mx-auto search-input"
          minLength={1}
          debounceTimeout={500}
          onChange={(event) => handleCharacterSearch(event.target.value)}
        />

        {isSearching && <Spinner color="primary" />}

        <Row xs={2} md={3} lg={4} className="g-4 mt-3">
          {characters.map((character) => (
            <Character character={character} key={character.id} />
          ))}
        </Row>

        {hasNextPage && (
          <Button
            color="primary"
            size="lg"
            className="mt-4 w-100"
            disabled={isSearching}
            onClick={() => handleLoadMore(currentPage + 1)}
          >
            {isSearching ? <Spinner color="white" /> : "Carregar mais..."}
          </Button>
        )}
      </Container>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  let baseCharacters: CharacterItemProps[] = [];
  let total = 0;

  try {
    const ts = Math.round(new Date().getTime() / 1000);
    const response = await api.get<CharactersResponse>("/characters", {
      params: {
        limit: PER_PAGE_ITENS,
        ts,
        hash: crypto
          .createHash("md5")
          .update(
            `${ts}${process.env.MARVEL_PRIVATE_KEY}${process.env.NEXT_PUBLIC_MARVEL_API_KEY}`
          )
          .digest("hex"),
      },
    });
    baseCharacters = response.data.data.results;
    total = response.data.data.total;
  } catch {}

  return {
    props: {
      baseCharacters,
      total,
    },
    revalidate: 60 * 60 * 8, // 8 hours
  };
};

export default Home;
