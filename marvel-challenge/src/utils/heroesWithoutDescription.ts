export function heroesWithoutDescription(description: string) {
  if (description.trim() === "") {
    return "There's no description.";
  } else {
    return description;
  }
}
