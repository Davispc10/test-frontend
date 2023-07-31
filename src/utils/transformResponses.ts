import { CharactersApiResult } from "@/types/Character";

export function transformCharactersResponse(
  apiResult: CharactersApiResult
): CharactersApiResult {
  const resultsFormatted = apiResult.data.results.map((character) => {
    let thumb = character.thumbnail;
    let description = character.description;
    if (character.thumbnail.path.includes("image_not_available")) {
      thumb = {
        path: "/images/marvel-placeholder",
        extension: "jpg",
      };
    }
    if (character.description === "") {
      description = "No description available";
    }
    return { ...character, thumbnail: thumb, description };
  });
  return {
    ...apiResult,
    data: { ...apiResult.data, results: resultsFormatted },
  };
}
