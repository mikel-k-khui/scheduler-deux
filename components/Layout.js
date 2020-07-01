import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import { useSlotsContext } from '../state/slots'

export default function Layout(props) {
  const { slotsOptions, slotsDispatcher } = useSlotsContext()
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" style={{ margin: '0 auto' }}>
        {props.children}
      </Container>
    </React.Fragment>
  )
}
