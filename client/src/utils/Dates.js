export const set12Hours = hour => (hour > 12 ? 12 - (24 - hour) : hour)

export const setAMPM = hour => (hour > 12 ? 'p.m.' : 'a.m.')

export const setMinutes = minutes => {
  if (isNaN(minutes)) return '00'
  if (minutes < 10 && minutes >= 0) return `0${minutes}`
  if (minutes < 0) return '00'
  if (minutes > 59) return '59'
  return minutes
}

export const addMinutes = (date, minutes) =>
  new Date(new Date(date).getTime() + minutes * 60000).getMinutes()

export const addMore = (cutoff, start) =>
  new Date().getMinutes() >= cutoff
    ? set12Hours(new Date().getHours() + start + 1)
    : set12Hours(new Date().getHours() + start)

export const convertTo24Hours = time12h => {
  const [time, modifier] = time12h.split(' ')
  let [hours, minutes] = time.split(':')
  if (hours === '12') {
    hours = '00'
  }

  if (modifier === 'p.m.') {
    hours = parseInt(hours, 10) + 12
  }
  let seconds = '00'
  return [hours, minutes, seconds]
}

export const convertToDay = inputDay => {
  const [month, day, year] = inputDay.split('/')
  return [year, month - 1, day]
}
