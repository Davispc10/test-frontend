import md5 from 'md5'
import { privKey, pubKey } from '@/services/constants'

export const getTimestamp = () => Date.now().toString()
export const getHash = (timestamp: string) => md5(timestamp + privKey + pubKey)

