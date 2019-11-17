import { Component } from 'react'
import { db , auth } from '../firebase/firebase'

class ControlUI extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clients: {},
    }
    this.logOutAction = this.logOutAction.bind(this)
    this.getClientUIDs = this.getClientUIDs.bind(this)
  }

  logOutAction(evt) {
    evt.preventDefault()
    auth.signOut()
      .then(function() {
      })
      .catch(function(error) {
        alert("Firebase error connection")
      });
  }
  componentDidMount() {
    let clientsRef = db.ref('client/');
    clientsRef.on('value', (snapshot) => {
      const clientes = snapshot.val()
      // for(let client in clientes) {
      //   this.setState(state => state.clients.push(clientes[client]))
      // }
      this.setState({ clients: clientes })
    });
  }




  render() {
    return (
      <div className="container-fluid">
        <div className="row" id="header">
          <div className="col">
            <h3>Control Interface HMB <span className="badge badge-pill badge-warning"> Beta</span></h3>
          </div>
          <div className="col">
            <div className="logoutbutton">
              <button type="button" onClick={this.logOutAction} className="btn btn-danger">Logout</button>
            </div>
          </div>
        </div>
        <div className="row" id="content">
          <div className="col-4">
            <div className="card">
              <div className="card-body">
                <label> Toggle beetwen background colors </label><br/>
                <div className="btn-group btn-group-toggle" data-toggle="buttons">
                  <label className="btn btn-secondary active">
                    <input type="radio" name="options" id="option1" autocomplete="off" checked /> On
                  </label>
                  <label className="btn btn-secondary">
                    <input type="radio" name="options" id="option2" autocomplete="off" /> Off
                  </label>
                </div>
                <br/><label>Send a message to the selected client</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter message"/>
                <br/><small id="emailHelp" className="form-text text-muted">The message will be received instantly</small>
                <br/><input type="button" className="btn btn-success" value="Send"/>
              </div>
            </div>
          </div>
          <div className="col-8">
            <div className="card">
              <label><h5>Clients connected</h5></label>

              { this.getClientUIDs() }

            </div>
          </div>
        </div>
        <style jsx global>{`
          body {
            background-image:url("/static/RollingWaves.jpg");
          }

          #header {
            margin-top: 5px;
          }

          #content {
            margin-top:4px;
            background-color: #737373;
            padding:10px;
            margin-right:1px;
            margin-left:1px;
          }

          .logoutbutton {
            margin-top: 5px;
            float:right;
          }
        `}</style>
      </div>
    )
  }
}


export default ControlUI
