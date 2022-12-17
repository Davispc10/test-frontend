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
    hash: hashMd5
  }
});


export function http_marvel_get(url: string) : any {
  return new Promise((resolve, reject) => {
    http_marvel.get(url).then(({data}: any) => {
    resolve(data)
    }).catch(err => {
      reject(err);
    })
  });

  // promise.then((res: any) => {
  //   setCharacteres(res)
  // });
  // promise.catch((err) => {
  //   console.log(err);
  // })
}

// console.log(hashMd5)
// console.log(ts)
// fetch(`${process.env.NEXT_PUBLIC_MARVEL_URL}/comics?ts=${ts}&apikey=${publicKey}&hash=${hashMd5}`)
// .then((res) => res.json())
// .then((res) => {
//   console.log(res)
// }).catch((err) => {
//   console.log(err)
// })




// export const fetcherStats = (url: string) =>
//   httpStats.get(url).then((res) => res.data);

// export const httpStats = axios.create({
//   baseURL: ,
// });
