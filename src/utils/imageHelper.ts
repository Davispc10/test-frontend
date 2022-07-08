export function renderImage({
  path,
  extension,
}: {
  path: string;
  extension: string;
}) {
  return path.split("/").pop() == "image_not_available"
    ? require("@/assets/marvel-logo.png")
    : path + "." + extension;
}
