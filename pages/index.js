import React, { useState } from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import Subheader from '../components/Subheader'
import Layout from '../components/Layout'
import Calendar from 'react-calendar'

export default function Home() {
  const [state, setState] = useState({ date: new Date() })

  const onChange = function (date) {
    setState({ date })
  }

  return (
    <div>
      <Head>
        <title>Slottable</title>
      </Head>
      <Header />
      <Subheader />
      <Layout>
        <Calendar onChange={onChange} value={state.date} />
      </Layout>
    </div>
  )
}
