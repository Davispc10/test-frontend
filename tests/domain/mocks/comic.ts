import { Comic } from "@/domain/models";

export const comicMock = (): Comic => ({
  id: 1,
  title: "any_title",
  description: "any_description",
  thumbnail: "any_thumbnail"
});
