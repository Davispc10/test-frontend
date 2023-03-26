import { atom } from "jotai";

// Esse atom é responsável por armazenar o valor da busca
export const searchAtom = atom<string | undefined>(undefined);
