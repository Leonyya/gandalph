import { Component } from 'react'
import { connect } from 'react-redux'
import withAuth from '../components/Session/withAuth.js'
class AdminLogin extends Component {
  constructor(props) {
    super(props)
  }
  onSub() {

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
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                    <small id="emailHelp" className="form-text text-muted">Only privilege people got access</small>
                  </div>
                  <div className="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                  </div>
                  <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                    <label className="form-check-label" for="exampleCheck1">Remember me</label>
                  </div>
                  <button type="submit" className="btn btn-primary">Log in</button>
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
  }
  render() {
    return(
      <withAuth>
        
      </withAuth>
    )
  }
}

export default AdminPanel
