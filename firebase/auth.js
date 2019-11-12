import { auth } from './firebase'

export const fHook =  () => auth.signInAnonymously().catch(error => {
    let errorCode = error.errorCode
    let errorMessage = error.message
    this.setState({
      message:"Error conectando"
    })
  })
}

export const fLogin = (email, password) =>
                          auth.signInWithEmailAndPassword(email, password)

export const fDeauth = () => auth.signOut()
