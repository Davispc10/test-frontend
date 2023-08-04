'use client'

import { useContext } from "react";
import { CharacterContext } from "@/contexts/CharacterProvider";

export const useCharacter = () => useContext(CharacterContext);