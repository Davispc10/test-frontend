import { marvelApi } from "@/services/marvelApi";
import { CharactersApiResult } from "@/types/Character";
import { getFirstEightCharacters } from "@/utils/apiCommonCalls";
import { API_LINKS } from "@/utils/apiLinks";
import { PAGE_SIZE } from "@/utils/constants";
import { generateMd5Hash } from "@/utils/generateHash";
import { transformCharactersResponse } from "@/utils/transformResponses";
import CharacterView from "@/views/CharacterView";
import { AxiosError } from "axios";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetStaticPaths,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
} from "next";
import { useRouter } from "next/router";

export default function CharacterInfo({
  apiResult,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) {
    return <h1 className="text-5xl">loading</h1>;
  }

  return <CharacterView resultFromApi={apiResult} />;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getFirstEightCharacters();

  const paths = data?.data?.results?.map((character) => {
    return {
      params: {
        id: character.id.toString(),
      },
    };
  });

  return {
    paths: paths || [],
    fallback: true,
  };
};

export async function getStaticProps({
  params,
}: GetServerSidePropsContext<{ id?: string }>) {
  try {
    const { id } = params || {};

    if (!id) {
      return {
        notFound: true,
      };
    }

    const ts = Date.now();
    // const hash = generateMd5Hash(ts);
    // const apikey = process.env.NEXT_PUBLIC_API_MARVEL_KEY || "";

    // const rawResponse = await fetch(
    //   `https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=${apikey}&ts=${ts}&hash=${hash}`,
    //   {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );

    // const data = (await rawResponse.json()) as CharactersApiResult;

    const { data } = await marvelApi.get<CharactersApiResult>(
      API_LINKS.characterDetails(id),
      {
        params: {
          limit: PAGE_SIZE,
          offset: 0,
          ts: ts,
          hash: generateMd5Hash(ts),
        },
      }
    );

    return {
      props: {
        apiResult: transformCharactersResponse(data),
      },
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.response?.data);
    }
    return {
      notFound: true,
    };
  }
}
