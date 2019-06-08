export const objectIsEmpty = object =>
  Object.values(object).every(x => x === null || x === '')
