export const descriptionValidation = (desc?: string) => {
  if (!desc) {
    return "descrição não informada.";
  }

  return desc;
};
