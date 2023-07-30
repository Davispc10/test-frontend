import MD5 from "crypto-js/md5";

export function generateMd5Hash(ts:number) {
  const seed =
    ts +
    (process.env.API_MARVEL_PRIVATE_KEY || "") +
    (process.env.NEXT_PUBLIC_API_MARVEL_KEY || "");
  return MD5(seed).toString();
}
