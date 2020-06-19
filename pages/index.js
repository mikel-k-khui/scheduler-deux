import React from 'react'
import Head from 'next/head'
import ButtonAppBar from '../components/ButtonAppBar'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Slottable</title>
      </Head>
      <ButtonAppBar />
    </div>
  )
}
