// action types for slot reducer
export const SET_DATE = 'SET_DATE'
export const ADD_FILTER = 'ADD_FILTER'
export const CLEAR_FILTER = 'CLEAR_FILTER'
export const DAILY_VIEW = 'Daily'
export const WEEKLY_VIEW = 'Weekly'

// export interface slotsState {
//   dateDisplayed: Date
//   resourceFilter: null | string
//   view: 'DAILY' | 'WEEKLY'
// }

export const slotsInitialState = {
  dateDisplayed: new Date(),
  resourceFilter: undefined,
  view: WEEKLY_VIEW,
}
