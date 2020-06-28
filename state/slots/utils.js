import { DAILY_VIEW, WEEKLY_VIEW } from './constant'

// changes daily to weekly view and vice versa
export const toggleViews = viewState => {
  return DAILY_VIEW === viewState
    ? { action: WEEKLY_VIEW, payload: {} }
    : { action: DAILY_VIEW, payload: {} }
}
