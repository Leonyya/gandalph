import { Component } from 'react'
import { db } from '../firebase/firebase'
import ClientLayout from './ClientLayout'
import { connect } from 'react-redux'
import { TwitterPicker } from 'react-color'
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
    this.handleOnChangeComplete = this.handleOnChangeComplete.bind(this)
  }
  handleChangeMsg(event) {
    this.setState({ message: event.target.value })
  }
  handleSubMsg(event) {
    console.log('A name was submitted: ' + this.state.message)
    this.props.foo.map(client => {
      db.ref('client/'+client).update({"message": this.state.message})
    })
    event.preventDefault()
  }
  handleOnChangeComplete(color) {
    console.log(color.hex)
    this.props.foo.map(client => { 
      db.ref('client/'+client).update({"background": color.hex}) 
    })

  }
  logOutAction(evt) {
    evt.preventDefault()
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
                  <TwitterPicker  onChangeComplete={this.handleOnChangeComplete}/>  
                </div>
                <br/><label>Send a message to the selected client</label>
                <form onSubmit={this.handleSubMsg}><input type="text" onChange={this.handleChangeMsg} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter message"/>
                <br/><small id="emailHelp" className="form-text text-muted">The message will be received instantly</small>
                <br/><input type="submit" className="btn btn-success" value="Send"/></form>
              </div>
            </div>
          </div>
          <div className="col-9">
            <div className="card" id="clientCard">
              <label><h5>Clients connected</h5></label>
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

          #clstore && store.foo ? { foo: store.foo } : {}ientCard {
            -webkit-box-shadow: 12px 8px 15px 5px rgba(0,0,0,0.5);
            -moz-box-shadow: 12px 8px 15px 5px rgba(0,0,0,0.5);
            box-shadow: 12px 8px 15px 5px rgba(0,0,0,0.5);
          }
        `}</style>
      </div>
    )
  }
}

export default connect(state => state.fooReducer)(ControlUI)