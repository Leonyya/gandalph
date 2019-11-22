import { Component } from 'react'
import { db , auth } from '../firebase/firebase'
import ClientLayout from './ClientLayout'
import { connect } from 'react-redux'
import { addFoo } from '../redux/actions'
import { EEXIST } from 'constants'

class ControlUI extends Component {
  static async getInitialProps({Component, ctx}) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {}
    return { pageProps }
  }
  constructor(props) {
    super(props)
    this.state = {
      clients: {},
      message: ''
    }
    this.logOutAction = this.logOutAction.bind(this)
    this.handleChangeMsg = this.handleChangeMsg.bind(this)
    this.handleSubMsg = this.handleSubMsg.bind(this)
    this.handleRxClick = this.handleRxClick.bind(this)
  }
  handleChangeMsg(event) {
    this.setState({ message: event.target.value })
  }
  handleSubMsg(event) {
    console.log('A name was submitted: ' + this.state.message)
    event.preventDefault()
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
  handleRxClick(evt) {
    evt.preventDefault()
    console.log("Click")
    this.props.addFoo()
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
          <div className="col-3">
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
                <form onSubmit={this.handleSubMsg}><input type="text" onChange={this.handleChangeMsg} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter message"/>
                <br/><small id="emailHelp" className="form-text text-muted">The message will be received instantly</small>
                <br/><input type="submit" className="btn btn-success" value="Send"/></form>
                <br/><input type="button" onClick={this.handleRxClick} className="btn btn-secondary" value="Muerdete"/>
      
              </div>
            </div>
          </div>
          <div className="col-9">
            <div className="card" id="clientCard">
              <label><h5>Clients connected</h5></label>
              <label>{this.props.foo}</label>
              <ClientLayout clients={this.state.clients} />
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
            background: rgba(255,255,255,.15);
            padding:10px;
          }

          .logoutbutton {
            margin-top: 5px;
            float:right;
          }

          #clientCard {
            -webkit-box-shadow: 12px 8px 15px 5px rgba(0,0,0,0.5);
            -moz-box-shadow: 12px 8px 15px 5px rgba(0,0,0,0.5);
            box-shadow: 12px 8px 15px 5px rgba(0,0,0,0.5);
          }
        `}</style>
      </div>
    )
  }
}

export default connect(null, { addFoo })(ControlUI)
