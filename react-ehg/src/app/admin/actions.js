export const VALIDATE_NAME = 'VALIDATE_NAME'
export const VALIDATE_PASS = 'VALIDATE_PASS'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'

export function validateName(name) {
  return {
    type: VALIDATE_NAME,
    name
  }
}

export function validatePass(pass) {
  return {
    type: VALIDATE_NAME,
    pass
  }
}