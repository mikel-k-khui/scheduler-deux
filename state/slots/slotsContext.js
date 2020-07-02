import { createContext, useReducer, useContext } from 'react'
import {
  SET_DATE,
  ADD_FILTER,
  CLEAR_FILTER,
  DAILY_VIEW,
  WEEKLY_VIEW,
  slotsInitialState,
} from './constant'

// actions applicable to dispaly of time slots
function slotsReducer(state, { action, payload }) {
  console.debug(
    'DEBUG :: Reducer',
    state,
    'with action',
    action,
    'and payload:',
    payload
  )

  const checkFilter = (state, { action, payload }) => {
    let stateConflicts = false

    if (!state.resourceFilter && action === CLEAR_FILTER) {
      stateConflicts = true
      console.error('SLOTS :: REDUCER :: ERROR :: No Filter Was Set')
    } else if (state.resourceFilter === payload.resourceFilter) {
      stateConflicts = true
      console.error('SLOTS :: REDUCER :: ERROR :: Filter Already Set')
    }

    return stateConflicts
      ? { ...state }
      : { ...state, resourceFilter: payload.resourceFilter }
  }

  switch (action) {
    case SET_DATE:
      return { ...state, dateDisplayed: payload.dateDisplayed }
      break
    case ADD_FILTER:
    case CLEAR_FILTER:
      return checkFilter(state, { action, payload })
      break
    case DAILY_VIEW:
      return { ...state, view: DAILY_VIEW }
      break
    case WEEKLY_VIEW:
      return { ...state, view: WEEKLY_VIEW }
      break
    default:
      console.error(
        'DEBUG :: SLOTS :: REDUCER :: Action does not exist',
        action
      )
      return { ...state }
  }
}

const slotsContext = createContext()

function SlotsProvider(props) {
  // example of use slotDispatcher(slotOptions, { action: SET_DATE, dateDisplayed: date })
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

export { SlotsProvider, useSlotsContext }
