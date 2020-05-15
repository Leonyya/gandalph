import React from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import './Admin.sass'

function Admin() {
    return (
      <>
        <div className="Navigation">
          
        </div>
        <div className="AppBar">
          <h3>Gandalph   <span className="badge badge-pill badge-warning"></span></h3>
        </div>
        <div className="container">

          <div className="row" id="content">
            <div className="column">
              <div>
                  <label><h5>Clients connected</h5></label>
              </div>
            </div>
            <div className="column-66">
              <div className="card" id="clientCard">
                  <div className="card-body">
                      <label><h5>Message Queue log</h5></label>
                      <textarea placeholder="" name="message_queue_log" id="commentField"></textarea>

                      {/*<Editor
                          value="print"
                          onValueChange={code => this.setState({ code: code })}
                          highlight={code => highlight(code, languages.js)}
                          padding={10}
                          style={{
                              fontFamily:'"Fira code", "Fira Mono", monospace',
                              fontSize: 12,
                          }} />*/}
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
                  </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
}

export default Admin