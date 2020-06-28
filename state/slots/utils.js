import { DAILY_VIEW, WEEKLY_VIEW } from './constant'

// changes daily to weekly view and vice versa
export const toggleViews = viewState => {
  console.log('In toggleView', viewState, 'vs', DAILY_VIEW)
  return DAILY_VIEW === viewState
    ? { action: WEEKLY_VIEW, payload: {} }
    : { action: DAILY_VIEW, payload: {} }
}
