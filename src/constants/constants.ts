import { generateMD5Hash } from "@/services/serviceDataApi";
import { privateKey, publicKey } from "@/utils/utils";

export const timestamp = "1";
export const hash = generateMD5Hash(timestamp, privateKey, publicKey);

export const pageNumber = 1;
export const pageSize = 20;
export const offset = (pageNumber - 1) * pageSize;
export const totalPages = Math.ceil(1562 / pageSize);
