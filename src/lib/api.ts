import axios from "axios"
import * as CryptoJS from 'crypto-js';

const timestamp = new Date().getTime().toString();

const hash = CryptoJS.MD5(timestamp+process.env.NEXT_PUBLIC_PRIVATE_KEY_MARVEL+process.env.NEXT_PUBLIC_PUBLIC_KEY_MARVEL).toString()

export const api = axios.create({
    baseURL: "http://gateway.marvel.com",
    params: {
        apikey: process.env.NEXT_PUBLIC_PUBLIC_KEY_MARVEL,
        ts: timestamp,
        hash: hash,
    }
})