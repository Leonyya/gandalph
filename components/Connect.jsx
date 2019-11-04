import { Component } from 'react'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

class Connect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: ""
    }
  }
  componentDidMount() {

    firebase.auth().signInAnonymously().catch(error => {
      let errorCode = error.errorCode
      let errorMessage = error.message
      this.setState({
        message:"Error conectando"
      })
    })
    firebase.auth().onAuthStateChanged( user => {
      if(user) {
        let isAnonymous = user.isAnonymous
        let uid = user.uid
        firebase.database().ref('client/'+uid).set({
          email: 'one'
        })
        this.setState({
          message:"Conectado"
        })
      } else {
        this.setState({
          message:"Desconectado"
        })
      }
    })
  }
  render() {
    return (
      <div>
        {this.state.message}
      </div>
    )
  }
}

export default Connect
