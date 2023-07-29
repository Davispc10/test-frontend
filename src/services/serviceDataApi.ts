import crypto from 'crypto';

export function generateMD5Hash(ts: string, privateKey: string, publicKey: string) {
  const hash = crypto.createHash('md5');
  hash.update(ts + privateKey + publicKey);
  return hash.digest('hex');
}