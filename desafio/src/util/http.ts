import axios from "axios";
import md5 from 'md5';

const publicKey: string = String(process.env.NEXT_PUBLIC_MARVEL_KEY_PUBLIC);
const privateKey: string = String(process.env.NEXT_PUBLIC_MARVEL_KEY_PRIVATE);
const ts = Date.now();
const hashMd5 = md5(ts.toString().concat(privateKey).concat(publicKey))

export const http_marvel = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MARVEL_URL,
  params: {
    ts: ts,
    apikey: publicKey,
    hash: hashMd5,
  }
});


export function http_marvel_get(url: string, params?: {}) : Promise<any> {
  return new Promise((resolve, reject) => {
    http_marvel.get(url,params).then(({data}: any) => {
    resolve(data)
    }).catch(err => {
      reject(err);
    })
  });
}

export function http_marvel_url(url: string) : Promise<any> {
  return new Promise((resolve, reject) => {
    http_marvel.get(url).then(({data}: any) => {
    resolve(data)
    }).catch(err => {
      reject(err);
    })
  });
}