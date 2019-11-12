import Router from 'next/router'
import { LOGIN, HOOK, DEAUTH } from '../types'
import * as firebase from 'firebase/app'
import 'firebase/auth'

export const login = ({email, passwd}, type) => {
  if(type != LOGIN) {
    throw new Error('Wrong call')
  }
  return (dispatch) => {
    firebase.auth().signInWithEmailAndPassword(email, passwd)
      .catch(function(error){
        var errorCode = error.code
        var errorMessage = error.message
        alert(errorMessage)
      })
  }
}
