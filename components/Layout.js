import React from 'react'
import { startOfWeek } from 'date-fns'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import Daily from '../components/Daily'
import { useSlotsContext, WEEKLY_VIEW } from '../state/slots'

export default function Layout({ props }) {
  const { slotsOptions, slotsDispatcher } = useSlotsContext()
  const { dateDisplayed, resourceFilter, view } = slotsOptions

  // returns an array of DAILY DOM with containers
  const weekList =
    view === WEEKLY_VIEW
      ? getWeekDates(dateDisplayed).map((date, index) =>
          DailyContainer({ ...props, date }, `daily-container-${index}`)
        )
      : [DailyContainer({ ...props, date: dateDisplayed }, 'daily-container-0')]
  return <> {weekList}</>
}

/*
 * Creates an array of 5 then iterate through starting with Monday by setting
 * by setting startOfWeek to Monday, then again for Tuesday until Friday.
 * @dateSelected any day of the week
 */

function getWeekDates(dateSelected) {
  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

  return weekDays.map((day, index) =>
    startOfWeek(dateSelected, { weekStartsOn: index + 1 })
  )
}

function DailyContainer(props, key) {
  return (
    <React.Fragment key={key}>
      <CssBaseline />
      <Container maxWidth="lg" style={{ margin: '0 auto' }}>
        <Daily props={props} />
      </Container>
    </React.Fragment>
  )
}
