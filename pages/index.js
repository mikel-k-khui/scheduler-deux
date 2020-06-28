import React from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import Subheader from '../components/Subheader'
import Layout from '../components/Layout'
import Daily from '../components/Daily'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Scheduler 2.0</title>
      </Head>
      <Header />
      <Subheader />
      <Layout>
        <Daily />
      </Layout>
    </div>
  )
}
