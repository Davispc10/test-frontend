import { useQuery } from "react-query";
import md5 from "md5";
import { api } from "@/services/api";

const publicKey = "d724d0ec5f7dfbf8641faecb901e8229";
const privateKey = "b676c1bbcb63a6dd6d914cef6d8943a205a193e0";

const time = Number(new Date());

const hash = md5(time + privateKey + publicKey);

// `/characters?apikey=${
//   tokens.public
// }&hash=${hash}&ts=${timestamp}&limit=30&orderBy=modified&offset=${page}${
//   search ? `&nameStartsWith=${search}` : ""
// }`

export const getAllHeroes = async (
  offset: number,
  perPage: number,
  search = ""
) => {
  try {
    let apiUrl = `${api}characters?offset=${offset}&limit=${perPage}&ts=${time}&apikey=${publicKey}&hash=${hash}`;

    if (search) {
      apiUrl += `&nameStartsWith=${search}`;
    }

    const { data } = await api.get(apiUrl);

    return data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// export function useAllCharacters() {
//   return useQuery("characters", () => getAllCharacters, {
//     staleTime: 1000 * 5, // 5seconds
//   });
// }

// export async function getAllCharacters(offset: number,
//   perPage: number,
//   search?: string) {
//   const { data } = await api.get(
//     `/characters?offset=${offset}&limit=${perPage}&ts=${time}&apikey=${publicKey}&hash=${hash}`
//   );

//   const totalCount = "";

//   const characters = data.data.results.map((result) => {
//     return {
//       id: result.id,
//       name: result.name,
//       description: result.description,
//       thumbnail: `${result.thumbnail.path}.${result.thumbnail.extension}`,
//     };
//   });

//   return characters;
// }
