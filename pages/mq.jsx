import { Component } from 'react'
import { auth } from '../redux/actions'
import { connect } from 'react-redux'
import ScriptPanel from '../components/ScriptPanel'
class AdminLogin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: 'hh@gg.kk',
      passwd: ''
    }
    this.onSub = this.onSub.bind(this)
  }
  onSub(evt) {
    this.props.dispatch(auth({
      username: this.state.email, 
      password: this.state.passwd}))
    evt.preventDefault() 
  }
  render() {
    return (
      <div className="container">
            <div className="cpanelForm card text-center w-50 mb-2">
              <div className="card-body">
                <h5 className="card-title">Controls</h5>
                <form>
                  <div className="form-group">
                    <label>Hash provided by the tool</label>
                    <input type="password" onChange={(evt) => this.setState({passwd:evt.target.value})}className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                  </div>
                  <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                    <label className="form-check-label">Remember me</label>
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
              top:100%;
            }
          `}</style>
      </div>
    )
  }
}

const _connectedAdminLogin = connect()(AdminLogin)
function mapStateToProps(state, ownProps) {
  console.log(state.authReducer.isLogged)
  return {
    isLogged: state.authReducer.isLogged
  }
}

class AdminPanel extends Component {
    static async getInitialProps({Component, ctx}) {
        const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {}
        return { pageProps }
    }
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <div>
                
                {this.props.isLogged ? <ScriptPanel/> : <_connectedAdminLogin/> }
            </div>
        )
    }
}

export default connect(mapStateToProps)(AdminPanel)
