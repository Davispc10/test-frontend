import { marvelApi } from "@/services/marvelApi";
import { CharactersApiResult } from "@/types/Character";
import { API_LINKS } from "@/utils/apiLinks";
import { PAGE_SIZE } from "@/utils/constants";
import { generateMd5Hash } from "@/utils/generateHash";
import { transformCharactersResponse } from "@/utils/transformResponses";
import CharacterView from "@/views/CharacterView";
import { AxiosError } from "axios";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";

export default function CharacterInfo({
  apiResult,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <CharacterView resultFromApi={apiResult} />;
}

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext<{ id?: string }>) {
  const { id } = params || {};

  if (!id) {
    return {
      notFound: true,
    };
  }

  try {
    const { data } = await marvelApi.get<CharactersApiResult>(
      API_LINKS.characterDetails(id),
      {
        params: {
          limit: PAGE_SIZE,
          offset: 0,
          ts: Date.now(),
          hash: generateMd5Hash(),
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
