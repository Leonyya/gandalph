import { Component } from 'react'

import Clients from './Clients'
import { connect } from 'react-redux'
import { TwitterPicker } from 'react-color'
import Editor from 'react-simple-code-editor'
import {highlight, languages } from 'prismjs'

import 'prismjs/components/prism-javascript'
import 'prismjs/themes/prism-funky.css'


class ControlUI extends Component {
  static async getInitialProps({Component, ctx}) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {}
    return { pageProps }
  }
  constructor(props) {
    super(props)
    this.state = {
      clients: {},
      message: '',
      code: `
import mjs from 'memoryjs'
function NameOfYourModule() {
    var hello = "module_name"
    console.log("Hello from the ",hello)
}
export default NameOfYourModule()
      `,
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
    event.preventDefault()
  }
  handleOnChangeComplete(color) {
  }
  logOutAction(evt) {
    evt.preventDefault()
  }

  componentDidMount() {
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="row" id="header">
          <div className="col">
            <h3 className="name">Grandalph   <span className="badge badge-pill badge-warning"> Beta</span></h3>
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
                <label><h5>Clients connected</h5></label>
                <Clients></Clients>
            </div>
          </div>
          <div className="col-8">
            <div className="card" id="clientCard">
                <div className="card-body">
                    <label><h4>Inject code</h4></label>

                    <Editor
                        value={this.state.code}
                        onValueChange={code => this.setState({ code: code })}
                        highlight={code => highlight(code, languages.js)}
                        padding={10}
                        style={{
                            fontFamily:'"Fira code", "Fira Mono", monospace',
                            fontSize: 12,
                        }} />
                    <hr></hr>
                    <label>The return can be checked in logs panel. There's an integrated lib inside the VM where you code going to execute, that exposes the following WinAPIs:
                    <ul>
                        <li>
                            ReadProcessMemory
                        </li>
                        <li>
                            WriteProcessMemory
                        </li>
                        <li>
                            VirtualProtectEx
                        </li>
                        <li>
                            VirtualAllocEx
                        </li>
                    </ul>
                    Forever is included as part of the basis, with forever you could make the bot daemon/background process
                    more information refer to <a href="https://github.com/Leonyya/mqbot">github.com/Leonyya/mqbot</a>
                    </label>
                    <hr></hr>
                    <label><h6>DDoS execution | Load Tests</h6></label><br/>
                    <label>URI target</label>
                    &nbsp;<input type="text"></input>
                    &nbsp;<label>Concurrency preference</label>
                    &nbsp;<input type="text"></input>
                    &nbsp;<input type="button" value="Attack"></input>
                    <hr></hr>
                    <label><h6>Browser specific controllers</h6></label><br/>
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
            margin-bottom: 5px;
          }
          .name {
            color:white;
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