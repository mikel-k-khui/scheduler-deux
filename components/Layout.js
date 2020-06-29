import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import Daily from '../components/Daily'
import { useSlotsContext } from '../state/slots'

export default function Layout(props) {
  const { slotsOptions, slotsDispatcher } = useSlotsContext()
  const { dateDisplayed, resourceFilter, view } = slotsOptions
  const { resources, slots, appointments } = props
  const tomorrow = new Date()
  tomorrow.setDate(dateDisplayed.getDate() + 1)

  const weekList = [dateDisplayed, tomorrow].map(date => DailyContainer(date))
  return { weekList }
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
