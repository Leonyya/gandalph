import { Component } from 'react'
import { connect } from 'react-redux'
import { auth } from '../firebase/firebase'
import ControlUI from '../components/ControlUI'
class AdminLogin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      passwd: ''
    }
    this.onSub = this.onSub.bind(this)
  }
  onSub(evt) {
    evt.preventDefault()
    const email = this.state.email
    const passwd = this.state.passwd
    auth.signInWithEmailAndPassword(email, passwd)
      .catch(function(error){
        var errorCode = error.code
        var errorMessage = error.message
        alert(errorMessage)
      })
  }
  render() {
    return (
      <div className="container">
            <div className="cpanelForm card text-center w-50 mb-2">
              <div className="card-body">
                <h5 className="card-title">Hangoutmybrowser control panel</h5>
                <form>
                  <div className="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" onChange={(evt) => this.setState({email:evt.target.value})} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                    <small id="emailHelp" className="form-text text-muted">Only privilege people got access</small>
                  </div>
                  <div className="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" onChange={(evt) => this.setState({passwd:evt.target.value})}className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                  </div>
                  <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                    <label className="form-check-label" for="exampleCheck1">Remember me</label>
                  </div>
                  <button type="button" onClick={this.onSub} className="btn btn-primary">Log in</button>
                </form>
              </div>

          </div>
          <style jsx global>{`
              body {
                background-image:url("/static/RollingWaves.jpg");
              }
            .cpanelForm {
              margin-top: 5%;
              background: linear-gradient(0deg, rgba(0,0,0,0.5537757437070938) 0%, rgba(0,0,0,1) 100%);
              color:white;
              left:30%;
            }
          `}</style>
      </div>
    )
  }
}

class AdminPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: false
    }
    auth.onAuthStateChanged( user => {
      if(user) {
        if(user.isAnonymous) {
          let uid = user.uid
          this.setState({
            currentUser:null
          })
        } else {
          this.setState({
            currentUser: auth.currentUser
          })
        }

      } else {
        this.setState({
          currentUser:false
        })
      }
    })
  }
  render() {
    let isLoggedIn = false
    if(this.state.currentUser != false && this.state.currentUser != null) {
      isLoggedIn = true
    }
    return (
      <div>
        { isLoggedIn ? ( <ControlUI/> ): ( <AdminLogin/> ) }
      </div>
    )
  }
}

export default AdminPanel
