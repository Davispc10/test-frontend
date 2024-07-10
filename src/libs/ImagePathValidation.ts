export const imagePathValidation = (path?: string, extension?: string) => {
  if (!path || !extension || path.includes("image_not_available")) {
    return "/marvel-logo.webp";
  }

  return `${path}.${extension}`;
};
