import React, { useState } from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import Subheader from '../components/Subheader'
import Layout from '../components/Layout'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Slottable</title>
      </Head>
      <Header />
      <Subheader />
      <Layout />
    </div>
  )
}
