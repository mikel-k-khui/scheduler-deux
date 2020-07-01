export function errorMessage(error, caller, message = undefined) {
  console.log(
    'ERROR :: ',
    caller,
    ' :: code:',
    error.code,
    ' :: message:',
    !message ? error.message : message
  )
}

export function logger(caller, message = undefined) {
  console.log('LOGGER :: ', caller, ' :: message: ', message)
}
