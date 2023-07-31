import axios from 'axios'
import md5 from 'md5'

const publicKey = process.env.apiKeyPublic
const privateKey = process.env.apiKeyPrivate
const timeStamp = process.env.timeStamp
const hash = md5(`${timeStamp}${privateKey}${publicKey}`)

const api = axios.create({
  baseURL: 'https://gateway.marvel.com/',
  params: {
    apikey: publicKey,
    ts: timeStamp,
    hash: hash,
  },
})

export default api
