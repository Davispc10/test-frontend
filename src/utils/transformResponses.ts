import { CharactersApiResult } from "@/types/Character";

export function transformCharactersResponse(
  apiResult: CharactersApiResult
): CharactersApiResult {
  const resultsFormatted = apiResult.data.results.map((character) => {
    let thumb = character.thumbnail;
    if (character.thumbnail.path.includes("image_not_available")) {
      thumb = {
        path: "/images/marvel-placeholder",
        extension: "jpg",
      };
    }
    return { ...character, thumbnail: thumb };
  });
  return {
    ...apiResult,
    data: { ...apiResult.data, results: resultsFormatted },
  };
}
