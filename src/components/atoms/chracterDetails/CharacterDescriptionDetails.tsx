import { descriptionValidation } from "@/libs/descriptionValidation";
import React from "react";

const CharacterDescriptionDetails = ({
  characterDesc,
}: {
  characterDesc?: string;
}) => {
  return <p className="text-justify">{descriptionValidation(characterDesc)}</p>;
};

export default CharacterDescriptionDetails;
