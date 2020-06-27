import { createContext, useReducer, useContext } from 'react'
import {
  SET_DATE,
  ADD_FILTER,
  CLEAR_FILTER,
  DAILY_VIEW,
  WEEKLY_VIEW,
} from './constant'

// export interface slotsState {
//   dateDisplayed: Date
//   resourceFilter: null | string
//   view: 'DAILY' | 'WEEKLY'
// }

const slotsInitialState = {
  dateDisplayed: new Date(),
  resourceFilter: null,
  view: 'DAILY',
}

function slotsReducer(state, { type, payload }) {
  const types = {
    [SET_DATE]: { ...state, dateDisplayed: payload.dateDisplayed },
    [ADD_FILTER]: (state, payload) => ({
      ...state,
      resourceFilter: payload.resourceFilter,
    }),
    [CLEAR_FILTER]: (state, payload) =>
      state.resourceFilter && { ...state, resourceFilter: null },
    [DAILY_VIEW]: { ...state, view: 'DAILY' },
    [WEEKLY_VIEW]: { ...state, view: 'WEEKLY' },
  }

  return types[type]
}

export const slotsContext = createContext()

function slotsProvider(props) {
  // example of use slotDispatcher(slotOptions, { type: SET_DATE, dateDisplayed: date })
  /* eslint react-hooks/rules-of-hooks: 1 */
  const { Provider } = slotsContext
  const [slotsOptions, slotsDispatcher] = useReducer(
    slotsReducer,
    slotsInitialState
  )
  /* eslint react/react-in-jsx-scope: 1*/
  return <Provider value={{ slotsOptions, slotsDispatcher }} {...props} />
}

function useSlotsContext() {
  return useContext(slotsContext)
}

export { slotsProvider, useSlotsContext }
