import { Md5 } from 'ts-md5';

export const PUBLIC_KEY = '7bfe41ebd0f4f4631c41dfe891402576';
const PRIVATE_KEY = '0f4fcdaac01df9619fdf63bcc699d2a5f87896be';
export const ts = Number(new Date());
export let hash = Md5.hashStr(`${ts}${PRIVATE_KEY}${PUBLIC_KEY}`);