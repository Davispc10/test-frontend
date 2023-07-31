export function heroesWithoutPhoto(thumbnail: string) {
  if (thumbnail.trim() === "") {
    return "/logo-marvel.png";
  }
  return thumbnail;
}
