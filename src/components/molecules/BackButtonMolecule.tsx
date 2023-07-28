import { ArrowUUpLeft } from "@phosphor-icons/react";
import React from "react";
import { BackButton } from "../atoms/BackButton";

export const BackButtonMolecule = () => {
  return (
    <div className="grid grid-row-1 place-items-center">
        <BackButton>
          <ArrowUUpLeft className="text-3xl" />
        </BackButton>
    </div>
  )
}