import crypto from 'crypto'
interface GenerateMarvelHashProps {
  time: string
  privateKey?: string
  publicKey?: string
}

export function generateHashMarvel({
  time,
  privateKey,
  publicKey,
}: GenerateMarvelHashProps) {
  return crypto
    .createHash('md5')
    .update(time + privateKey + publicKey)
    .digest('hex')
}
