export const noSpaces = string => string.replace(/ /g, '_')

export const noUnderscores = string => string.replace(/_/g, ' ')

export const capitalize = s =>
  s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()

export const singleOrPlural = (decider, word) =>
  (decider.length || Number(decider)) === 1 ? String(word) : `${String(word)}s`
