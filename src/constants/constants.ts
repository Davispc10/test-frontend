import { generateMD5Hash } from "@/services/serviceDataApi";
import { privateKey, publicKey } from "@/utils/utils";

export const timestamp = "1";
export const hash = generateMD5Hash(timestamp, privateKey, publicKey);
export const noImage =
  "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available";
export const pageNumber = 1;
export const pageSize = 20;
export const totalPages = Math.ceil(1562 / pageSize);
