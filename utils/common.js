import { startOfWeek } from 'date-fns'

export function errorMessage(error, caller, message = undefined) {
  console.log(
    'ERROR :: ',
    caller,
    ' :: code:',
    error.code,
    ' :: message:',
    !message ? error.message : message
  )
}

export function logger(caller, message = undefined) {
  console.log('LOGGER :: ', caller, ' :: message: ', message)
}

export const sameDate = (thisDate, domDate) =>
  thisDate.getDate() === domDate.getDate() &&
  thisDate.getMonth() === domDate.getMonth() &&
  thisDate.getFullYear() === domDate.getFullYear()

export function setTargetDate(current, dayAway) {
  const targetDate = new Date(current)
  targetDate.setDate(current.getDate() + dayAway)
  return targetDate
}

export const confirmWeekday = date => date.getDay() >= 1 && date.getDay() <= 5

// returns current date or next Monday for weekends
export function getNextWeekday(date) {
  return confirmWeekday(date)
    ? date
    : startOfWeek(setTargetDate(date, 3), { weekStartsOn: 1 })
}

/*
 * Creates an array of 5 then iterate through starting with Monday by setting
 * by setting startOfWeek to Monday, then again for Tuesday until Friday.
 * @dateSelected any day of the week
 */

export function getWorkweek(dateSelected) {
  const nextWorkkday = getNextWeekday(dateSelected)
  const dayOfWorkday = nextWorkkday.getDay()
  const daysOfWeek = [1, 2, 3, 4, 5]
  const weekDayOffsets = daysOfWeek.map(day => day - dayOfWorkday)
  return weekDayOffsets.map(offset => setTargetDate(nextWorkkday, offset))
}

export function getInitials(displayName) {
  return displayName
    .split(' ')
    .reduce((accum, curr) => accum.concat(curr[0]), '')
}
