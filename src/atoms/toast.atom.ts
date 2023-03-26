import { atom } from "jotai";
import { toast as totastInstance } from "react-toastify";

// Esse atom é responsável por armazenar uma instância do react-toastify para ser usada em qualquer lugar da aplicação
export const toast = atom(totastInstance);
