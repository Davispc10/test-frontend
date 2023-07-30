import { marvelApi } from "@/services/marvelApi";
import { CharactersApiResult } from "@/types/Character";
import { PAGE_SIZE } from "@/utils/constants";
import { generateMd5Hash } from "@/utils/generateHash";
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
    const { data } = await marvelApi.get<CharactersApiResult>("/characters", {
      params: {
        limit: PAGE_SIZE,
        offset: 0,
        ts: Date.now(),
        hash: generateMd5Hash(),
      },
    });

    return {
      props: {
        apiResult: data,
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
