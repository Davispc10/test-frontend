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
  GetServerSidePropsContext,
  GetStaticPaths,
  InferGetStaticPropsType,
} from "next";

export default function Teste({
  apiResult,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  // return <CharacterView resultFromApi={apiResult} />;
  return <h1>teste</h1>
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getFirstEightCharacters();

  const paths = data?.data?.results?.map((character) => {
    return {
      params: {
        id: character.id.toString(),
      },
    };
  })

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
