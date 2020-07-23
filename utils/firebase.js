import firebase, { app, auth, functions } from 'firebase/app'
import { errorMessage, logger } from './common'

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
  } catch (err) {
    console.log('FIREBASE :: INITIALIZE_APP...')
    return firebase.initializeApp(firebaseConfig)
  }
}

export function firebaseAnonSignIn() {
  return auth()
    .signInAnonymously()
    .then(user =>
      logger(
        'SUCCEESSFUL LOGIN',
        `${user.id} is logged under ${
          !user.isAnonymous ? 'anonymous' : user.email
        }.`
      )
    )
    .catch(err => errorMessage(err, 'ANONYMOUS_USER'))
}

export function firebaseUserSignIn(email, password) {
  return auth()
    .signInWithEmailAndPassword(email, password)
    .catch(err => errorMessage(err.cod, 'USER_LOGIN', email))
}

// call the provided callable then catches all error, log it and return null
export async function getCallable(functionName, data = {}) {
  const callFunction = functions().httpsCallable(functionName)
  console.log('DEBUG :: data trigger?', data)

  try {
    const results = await callFunction(data)
    console.log('DEBUG :: CALLABLE :: results?', results)
    return results.data
  } catch (err) {
    errorMessage(err, 'GET_CALLABLE')
    return null
  }
}

export function getUser() {
  return auth().currentUser
}

export function getUserId() {
  return auth().currentUser.uid
}

export function isUserAnonymous() {
  return auth().currentUser.isAnonymous
}
