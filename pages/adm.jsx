import { Component } from 'react'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

class AdminPanel extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="container">
            <div className="cpanelForm card text-center w-50">
              <div className="card-body">
                <h5 className="card-title">Hangoutmybrowser control panel</h5>
                <p className="card-text">v0.1 branch feature/globalhandler</p>
                <form>
                  <div className="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                  </div>
                  <div className="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                  </div>
                  <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                    <label className="form-check-label" for="exampleCheck1">Remember me</label>
                  </div>
                  <button type="submit" className="btn btn-primary">Submit</button>
                </form>
              </div>
          </div>
          <style jsx>{`
            .cpanelForm {
              background-image: linear-gradient(to top, #ffffff, #eeedfa, #dadcf5, #c5cbf1, #acbced, #9bb1ec, #89a6ea, #759ce9, #6993ea, #5e89eb, #5480eb, #4a76eb);              color:white;

            }
          `}</style>
      </div>
    )
  }
}

export default AdminPanel
