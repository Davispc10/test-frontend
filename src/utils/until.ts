export const until = async <TError = Error, Data = unknown>(
  promise: () => Promise<Data>,
): Promise<[TError, null] | [null, Data]> => {
  try {
    const data = await promise()

    return [null, data]
  } catch (error) {
    return [error as TError, null]
  }
}
