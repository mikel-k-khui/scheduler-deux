// import { createContext, useReducer } from 'react'
// import {
//   SET_DATE,
//   ADD_FILTER,
//   CLEAR_FILTER,
//   DAILY_VIEW,
//   WEEKLY_VIEW,
// } from './constant'

// const slotsInitialState = {
//   dateDisplayed: new Date(),
//   resourceFilter: null,
//   view: 'DAILY',
// }

// function slotsReducer(state, { type, payload }) {
//   const types = {
//     [SET_DATE]: { ...state, dateDisplayed: payload.dateDisplayed },
//     [ADD_FILTER]: (state, payload) => ({
//       ...state,
//       resourceFilter: payload.resourceFilter,
//     }),
//     [CLEAR_FILTER]: (state, payload) =>
//       state.resourceFilter && { ...state, resourceFilter: null },
//     [DAILY_VIEW]: { ...state, view: 'DAILY' },
//     [WEEKLY_VIEW]: { ...state, view: 'WEEKLY' },
//   }

//   return types[type]
// }

// // example of use slotDispatcher(slotOptions, { type: SET_DATE, dateDisplayed: date })
// const [slotsOptions, slotsDispatcher] = useReducer(slotsReducer, slotsInitialState)

// const slotsContext = createContext([slotsOptions, slotsDispatcher])

// const { Provider, Consumer } = slotsContext

// function slotsProvider(children) {
//   return <Provider value={[slotsOptions, slotsDispatcher]}>{children}</Provider>
// }

// function slotsConsumer(children) {
//   return <Consumer>{children}</Consumer>
// }

// export { slotsConsumer, slotsProvider }
