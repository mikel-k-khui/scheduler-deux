// action types for slot reducer
export const SET_DATE = 'SET_DATE'
export const ADD_FILTER = 'ADD_FILTER'
export const CLEAR_FILTER = 'CLEAR_FILTER'
export const DAILY_VIEW = 'Daily'
export const WEEKLY_VIEW = 'Weekly'

// TODO: fix in TS refactor
// export interface slotsState {
//   dateDisplayed: Date
//   resourceFilter: null | string
//   view: 'DAILY' | 'WEEKLY'
// }

export const slotsInitialState = {
  dateDisplayed: new Date(),
  resourceFilter: undefined,
  view: DAILY_VIEW,
}
