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

export function setTargetDate(current, dayAway) {
  const targetDate = new Date(current)
  targetDate.setDate(current.getDate() + dayAway)
  return targetDate
}

export const confirmWeekday = date => date.getDay() >= 1 && date.getDay() <= 5

export function returnMondayOfWeek(date) {
  return confirmWeekday(date)
    ? startOfWeek(date, { weekStartsOn: 1 })
    : startOfWeek(setTargetDate(date, 3), { weekStartsOn: 1 })
}
