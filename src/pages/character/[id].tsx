import crypto from "crypto";
import { motion } from "framer-motion";
import type {
  GetStaticPaths,
  GetStaticPathsResult,
  GetStaticProps,
  NextPage,
} from "next";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "reactstrap";

import { Character, CharactersResponse } from "@/@types/character";
import {
  ResourceItem,
  ResourceItemExternalItemResponse,
} from "@/components/ResourceItem";
import { api } from "@/services/api";

type CharacterPageProps = {
  character: Character;
};

const Character: NextPage<CharacterPageProps> = ({ character }) => {
  const [comics, setComics] = useState<ResourceItemExternalItemResponse[]>([]);
  const [isLoadingMoreComics, setIsLoadingMoreComics] = useState(false);
  const [currentComicsPage, setCurrentComicsPage] = useState(1);

  const handleLoadMoreComics = useCallback(
    async (nextPage: number) => {
      if (
        isLoadingMoreComics ||
        nextPage > Math.ceil(character.comics.available / 20)
      )
        return;
      setIsLoadingMoreComics(true);
      try {
        const response = await api.get(`characters/${character.id}/comics`, {
          params: {
            offset: (nextPage - 1) * 20, // offset is 0 based and page is 1 based (offset = (page - 1) * 20) so we need to subtract 1 from page to get the offset value
          },
        });
        setComics((oldComics) => [...oldComics, ...response.data.data.results]);
        setCurrentComicsPage(nextPage);
      } catch {
      } finally {
        setIsLoadingMoreComics(false);
      }
    },
    [character.comics.available, character.id, isLoadingMoreComics]
  );

  useEffect(() => {
    async function fetchComics() {
      handleLoadMoreComics(currentComicsPage);
    }
    fetchComics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>{character.name} Marvel Characters - Dinheirow</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container className="mt-3 pb-4">
        <div className="d-flex justify-center">
          <motion.img
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            alt={character.name}
            layoutId={String(character.id)}
            className="rounded object-center object-cover"
            height={550}
            width="100%"
          />
        </div>

        <h1 className="text-center fw-bold mt-3">{character.name}</h1>
        <p className="text-center">
          {character.description || "description not informed"}
        </p>

        <section className="mt-5">
          <h4>Comics</h4>
          {character.comics.available === 0 && (
            <p className="mt-2">No comics found</p>
          )}
          <Row md={3} lg={4} className="g-4">
            {comics.map((resource) => (
              <ResourceItem item={resource} key={resource.id} />
            ))}

            {character.comics.available > character.comics.returned && (
              <Col>
                <button
                  disabled={isLoadingMoreComics}
                  className="load-more-comics shadow-md"
                  onClick={() => handleLoadMoreComics(currentComicsPage + 1)}
                >
                  {isLoadingMoreComics ? (
                    <Spinner color="primary" />
                  ) : (
                    <>
                      Load more <br />
                      Comics
                    </>
                  )}
                </button>
              </Col>
            )}
          </Row>
        </section>
      </Container>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  let paths: GetStaticPathsResult["paths"] = [];

  try {
    const ts = Math.round(new Date().getTime() / 1000);
    const response = await api.get<CharactersResponse>("/characters", {
      params: {
        limit: 10,
        ts,
        hash: crypto
          .createHash("md5")
          .update(
            `${ts}${process.env.MARVEL_PRIVATE_KEY}${process.env.NEXT_PUBLIC_MARVEL_API_KEY}`
          )
          .digest("hex"),
      },
    });
    paths = response.data.data.results.map((character) => ({
      params: {
        id: String(character.id),
      },
    }));
  } catch {}

  return {
    paths,
    fallback: "blocking",
  };
};

type Params = {
  id: string;
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { id } = ctx.params as Params;

  try {
    const ts = Math.round(new Date().getTime() / 1000);
    const response = await api.get<CharactersResponse>(`/characters/${id}`, {
      params: {
        ts,
        hash: crypto
          .createHash("md5")
          .update(
            `${ts}${process.env.MARVEL_PRIVATE_KEY}${process.env.NEXT_PUBLIC_MARVEL_API_KEY}`
          )
          .digest("hex"),
      },
    });

    return {
      props: {
        character: response.data.data.results[0],
      },
      revalidate: 60 * 60 * 8, // 8 hours
    };
  } catch {
    return {
      props: {},
      notFound: true,
      revalidate: 60 * 10, // 10 minutes
    };
  }
};

export default Character;
