export const noSpaces = string => string.replace(/ /g, '_')

export const noUnderscores = string => string.replace(/_/g, ' ')

export const capitalize = s =>
  s
    .toLowerCase()
    .split(' ')
    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ')

export const singleOrPlural = (decider, word) =>
  (decider.length || Number(decider)) === 1 ? String(word) : `${String(word)}s`

export const formatTags = tag => {
  const words = tag.split('_')
  console.log(words)
}

export const uppercase = string => string.toUpperCase()

export const formatSystems = systems => {
  let str = ''
  systems.forEach((i, index) => {
    if (i === 'PC' || i === 'PS4') {
      str += i
    } else {
      str += capitalize(noUnderscores(i))
    }
    if (index !== systems.length - 1) {
      str += ', '
    }
  })
  return str
}

export const formatGamers = gamers => {
  let str = ''
  gamers.forEach((gamer, index) => {
    str += capitalize(noUnderscores(gamer.username))
    if (index !== gamers.length - 1) {
      str += ', '
    }
  })
  return str
}
