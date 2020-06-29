import firebase, { app, auth, functions } from 'firebase/app'
import { errorMessage } from './common'

export function firebaseInitialize() {
  const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID,
  }

  try {
    app()
    console.log(`FIREBASE :: APP EXISTS...`)
  } catch (err) {
    console.log('FIREBASE :: INITIALIZE_APP...')
    return firebase.initializeApp(firebaseConfig)
  }
}

export function firebaseAnonSignIn() {
  return auth()
    .signInAnonymously()
    .catch(err => errorMessage(err, 'ANONYMOUS_USER'))
}

export function firebaseUserSignIn(email, password) {
  return auth()
    .signInWithEmailAndPassword(email, password)
    .catch(err => errorMessage(err, 'USER_LOGIN'))
}

export async function getCallable(functionName, data = {}) {
  const callFunction = functions().httpsCallable(functionName)

  try {
    const results = await callFunction({ ...data })
    console.log('What is in callable?', results)
    return results
  } catch (err) {
    errorMessage(err, 'GET_CALLABLE')
    return null
  }
}
