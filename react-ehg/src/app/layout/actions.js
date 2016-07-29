import { browserHistory } from 'react-router'

export const SIGN_OUT = 'SIGN_OUT'

export function signOut() {
  return {
    type: SIGN_OUT
  }
}