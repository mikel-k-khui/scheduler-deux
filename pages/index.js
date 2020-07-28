import React, { Fragment } from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import Subheader from '../components/Subheader'
import Layout from '../components/Layout'
import {
  firebaseAnonSignIn,
  firebaseInitialize,
  getCallable,
  GET_SETUPS,
  GET_APPOINTMENTS,
  getUserId,
  isUserAnonymous,
} from '../utils'
import { SlotsProvider } from '../state/slots'
import firebase, { auth } from 'firebase'

export default function Home(props) {
  // check if firebase works after build. This function will not re-initialize.
  firebaseInitialize()

  // console.log('Start of props and user', isUserAnonymous(), getUserId(), props)
  return (
    <Fragment>
      <Head>
        <title>Scheduler 2.0</title>
      </Head>
      <Header />
      <SlotsProvider>
        <Subheader props={{ ...props }} />
        <Layout props={{ ...props }} />
      </SlotsProvider>
    </Fragment>
  )
}

const tempSlots = {
  '1': '6:00am',
  '2': '6:30am',
  '3': '7:00am',
  '4': '7:30am',
  '5': '8:00am',
  '6': '8:30am',
  '7': '9:00am',
  '8': '9:30am',
}

const tempResources = [
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
  {
    id: '3598uadsgsdgdsgw8ka',
    email: 'steve.rogers@marvel.world',
    displayName: 'Steve Rogers',
    workHours: {
      '1': true,
      '2': true,
      '3': true,
      '4': true,
      '5': true,
      '6': true,
      '7': true,
      '8': true,
    },
  },
  {
    id: '3598uadsgkjbqw8gka',
    email: 'starksmart.hulk@marvel.world',
    displayName: 'Bruce Banner',
    workHours: {
      '1': true,
      '2': true,
      '3': true,
      '4': true,
      '5': true,
      '6': false,
      '7': true,
      '8': true,
    },
  },
]

export async function getStaticProps() {
  // initialize firebase in build to pull initial data
  firebaseInitialize()
  if (process.env.NODE_ENV === 'development') {
    firebase.functions().useFunctionsEmulator('localhost:5001')
  }

  const today = new Date()
  let setups = await getCallable(GET_SETUPS)
  let appointments = await getCallable(GET_APPOINTMENTS, {
    today: today.toString(),
  })
  await firebaseAnonSignIn()

  if (!setups) {
    setups = {
      slots: { ...tempSlots },
      resources: [...tempResources],
    }
  }

  if (!appointments) {
    appointments = [
      {
        date: today.toJSON(),
        id: 'agddagdagagddag',
        requesterEmail: 'elton@me.com',
        requesterName: 'Elton John',
        resourceId: '3598uadsgkjbqw8ka',
        slot: '3',
      },
      {
        date: today.toJSON(),
        id: 'agddag8g829gnv9',
        requesterEmail: 'lady.gaga@me.com',
        requesterName: 'lady Gaga',
        resourceId: 'ikWEiUKk3VMK90w6mPm5TIAZbrl1',
        slot: '2',
      },
    ]
  }

  return {
    props: { ...setups, appointments },
  }
}
