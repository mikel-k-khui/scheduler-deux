import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'

export default function Layout(props) {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" style={{ margin: '0 auto' }}>
        {props.children}
      </Container>
    </React.Fragment>
  )
}
