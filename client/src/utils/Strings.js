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

export const uppercase = string => string.toUpperCase()

export const formatSystem = system => {
  let str = ''
  if (system === 'PC' || system === 'PS4') {
    str = system
  } else {
    str = capitalize(noUnderscores(system))
  }
  return str
}

export const formatGamers = gamers => {
  let str = ''
  gamers.forEach((gamer, index) => {
    str += gamer.username
    if (index !== gamers.length - 1) {
      str += ', '
    }
  })
  return str
}

export const formatOccupation = occupation => {
  return occupation
    .split('_')
    .map(string => capitalize(string))
    .join(' ')
}

export const formatGender = gender => {
  switch (gender) {
    case 'MALE':
      return 'Male'
    case 'FEMALE':
      return 'Female'
    case 'OTHER':
      return 'Other'
    default:
      return 'Not a gender'
  }
}

export const mapTags = tag => {
  switch (tag) {
    case 'CARD_AND_BOARD_GAME':
      return 'Card & Board Game'
    case 'DRIVING_SLASH_RACING_GAME':
      return 'Driving/Racing Game'
    case 'FPS':
      return 'FPS'
    case 'MMORPG':
      return 'MMORPG'
    case 'MOBA':
      return 'MOBA'
    case 'POINT_AND_CLICK':
      return 'Point and Click'
    case 'RHYTHM_AND_MUSIC_GAME':
      return 'Rhythm & Music Game'
    case 'RPG':
      return 'RPG'
    case 'RTS':
      return 'RTS'
    case 'SERIES_COLON_SOULS':
      return 'Series: Souls'
    case 'SHOOT_HYPHEN_EM_UP':
      return `Shoot 'Em Up`
    default:
      return tag
        .toLowerCase()
        .split('_')
        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ')
  }
}

export const mapGameType = type => {
  switch (type) {
    case 'CASUAL':
      return 'Casual Matchmaking'
    case 'COMPETITIVE':
      return 'Competitive Matchmaking'
    default:
      return capitalize(type)
  }
}

export const currencyFormat = num => {
  return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
