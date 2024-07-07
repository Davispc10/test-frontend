import axios from "axios";

import { md5 } from "@/utils/createMd5Hash";

export const httpClient= axios.create({
  baseURL: 'http://gateway.marvel.com/v1/public/',
  params: {
    ts: new Date().getTime(),
    apikey: '778f3a844b4fdeac52207bd47f390715',
    hash: md5(new Date().getTime() + 'e5b649a7701d6d00bb9ae686e8d6d2d08f1490fd' + '778f3a844b4fdeac52207bd47f390715').toLowerCase()
  }
})