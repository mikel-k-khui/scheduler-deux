import React from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import Subheader from '../components/Subheader'
import Layout from '../components/Layout'
import Daily from '../components/Daily'
import {
  firebaseInitialize,
  getCallable,
  GET_SETUPS,
  GET_APPOINTMENTS,
} from '../utils'
import firebase from 'firebase'

export default function Home(props) {
  // check if firebase works after build. This function will not re-initialize.
  firebaseInitialize()
  console.log('Start of props', props)
  return (
    <div>
      <Head>
        <title>Scheduler 2.0</title>
      </Head>
      <Header />
      <Subheader props={{ ...props }} />
      <Layout props={{ ...props }} />
    </div>
  )
}

const tempSlots = {
  '1': '6:00am',
  '2': '6:30am',
  '3': '7:00am',
  '4': '7:30am',
}

export async function getStaticProps() {
  // initialize firebase in build to pull initial data
  firebaseInitialize()
  let setups = await getCallable(GET_SETUPS)
  let appointments = await getCallable(GET_APPOINTMENTS)

  setups = {
    slots: { ...tempSlots },
    resources: [
      {
        id: 'ikWEiUKk3VMK90w6mPm5TIAZbrl1',
        email: 'doctor.strange@marvel.world',
        displayName: 'Doctor Stephen Strange',
        workHours: { '1': true, '2': true, '3': false, '4': true },
      },
      {
        id: '3598uadsgkjbqw8ka',
        email: 'tony.stark@marvel.world',
        displayName: 'Tony Stark',
        workHours: { '1': true, '2': false, '3': true, '4': true },
      },
    ],
  }
  const testDate = new Date()
  appointments = [
    {
      date: testDate.toJSON(),
      id: 'agddagdagagddag',
      requesterEmail: 'elton@me.com',
      requesterName: 'Elton John',
      resourceId: '3598uadsgkjbqw8ka',
      slot: '3',
    },
    {
      date: testDate.toJSON(),
      id: 'agddag8g829gnv9',
      requesterEmail: 'lady.gaga@me.com',
      requesterName: 'lady Gaga',
      resourceId: 'ikWEiUKk3VMK90w6mPm5TIAZbrl1',
      slot: '2',
    },
  ]

  return {
    props: { ...setups, appointments },
  }
}
