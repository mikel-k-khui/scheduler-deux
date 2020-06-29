import React from 'react'
import { startOfWeek } from 'date-fns'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import Daily from '../components/Daily'
import { useSlotsContext, WEEKLY_VIEW } from '../state/slots'

export default function Layout(props) {
  const { slotsOptions, slotsDispatcher } = useSlotsContext()
  const { dateDisplayed, resourceFilter, view } = slotsOptions
  const tomorrow = new Date()
  tomorrow.setDate(dateDisplayed.getDate() + 1)

  const weekList = view === WEEKLY_VIEW ? getWeekDates : [dateDisplayed]
  return <div> {weekList}</div>
}

/*
 * Creates an array of 5 then iterate through starting with Monday by setting
 * by setting startOfWeek to Monday, then again for Tuesday until Friday.
 * @dateSelected any day of the week
 */

function getWeekDates(dateSelected) {
  const weekDays = new Array(5)
  return weekDays.map((noValue, index) => startOfWeek(dateSelected, index + 1))
}

function DailyContainer(props) {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" style={{ margin: '0 auto' }}>
        <Daily props={props} />
      </Container>
    </React.Fragment>
  )
}
