import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { theme } from '../components'
import { SlotsProvider } from '../state/slots'
import 'react-calendar/dist/Calendar.css'

// measure  TTFB, FCP, LCP, FID, and CLS
// export function reportWebVitals(metric) {
//   if (metric.label === 'web-vital') {
//     console.log('PERFORMANCE :: ', metric) // The metric object ({ id, name, startTime, value, label }) is logged to the console
//   }
// }

export default function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <React.Fragment>
      <Head>
        <title>Scheduler 2.0</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <SlotsProvider>
          <Component {...pageProps} />
        </SlotsProvider>
      </ThemeProvider>
    </React.Fragment>
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
}
