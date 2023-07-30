import { marvelApi } from "@/services/marvelApi";
import { CharactersApiResult } from "@/types/Character";
import { getFirstEightCharacters } from "@/utils/apiCommonCalls";
import { API_LINKS } from "@/utils/apiLinks";
import { PAGE_SIZE } from "@/utils/constants";
import { generateMd5Hash } from "@/utils/generateHash";
import { transformCharactersResponse } from "@/utils/transformResponses";
import HomeView from "@/views/HomeView";
import { AxiosError } from "axios";
import type { InferGetStaticPropsType } from "next/types";

export default function Home({
  apiResult,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <HomeView resultFromApi={apiResult} />;
}

export async function getStaticProps() {
  try {
    const data = await getFirstEightCharacters();

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
