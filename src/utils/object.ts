export const getObjectKeys = <T extends Record<string, unknown>>(obj: T) => {
  const objectKeys = []
  for (const objectKey in obj) objectKeys.push(objectKey)
  return objectKeys
}
