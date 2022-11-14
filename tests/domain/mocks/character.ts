import { Character } from "@/domain/models";

export const characterMock = (): Character => ({
  id: 1,
  name: "any_name",
  description: "any_description",
  resourceURI: "any_resourceURI",
  thumbnail: "any_thumbnail",
});
