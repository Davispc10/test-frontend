export const tryJsonParse = <T>(value: string, fallbackValue: T): T => {
  try {
    return JSON.parse(value) as T
  } catch {
    return fallbackValue
  }
}
