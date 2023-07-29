import React from "react";
import { ArrowUUpLeft } from "@phosphor-icons/react";
import { BackButtonWrapper } from "../atoms/BackButton";

export const BackButton = () => {
  return (
    <div className="grid grid-row-1 place-items-center">
      <BackButtonWrapper>
        <ArrowUUpLeft className="text-3xl" />
      </BackButtonWrapper>
    </div>
  )
}