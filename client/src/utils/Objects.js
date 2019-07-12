export const objectIsEmpty = object =>
  Object.values(object).every(x => x === null || x === '')

export const isEmpty = obj => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) return false
  }
  return true
}

export const emptyStrings = obj => {
  for (const key in obj) {
    if (isValidUrl(obj[key])) return false
  }
  return true
}

const isValidUrl = string => {
  try {
    new URL(string)
    return true
  } catch (_) {
    return false
  }
}
