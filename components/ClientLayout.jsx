import { Component } from 'react'
import { connect } from 'react-redux'
import { getFoo } from '../redux/selector'
class ClientLayout extends Component {
  static getInitialProps({store}) {
    store.dispatch({type: 'FOO', payload: 'bar'})
  }  
  constructor(props) {
    super(props)
    this.state = {
      clients: {}
    }
    this.computeForClient = this.computeForClient.bind(this)
  }
  componentDidMount() {
    this.setState({ clients: this.props.clients })
  }
  componentDidUpdate(prevProps) {
    if(this.props.clients !== prevProps.clients) {
      this.setState({ clients: this.props.clients })
    }
  }
  computeForClient() {
    let clientList = []
    const clients = this.state.clients
    for(let client in clients) {
      clientList.push({ [client] : clients[client] })
    }
    return clientList
  }

  render(){
    return (
      <div>
        { this.props.foo } 
        <table class="table">
          <thead>
            <tr>
              <th scope="col"> UID </th>
              <th scope="col"> Browser </th>
              <th scope="col"> Geolocation </th>
            </tr>
          </thead>
          <tbody>
            { this.computeForClient().map( (client) => ( <Client obj={client}/> ))}
          </tbody>
        </table>

      </div>
    )
  }

}

const Client = (props) => (
    <tr>
      <th scope="row"> { Object.keys(props.obj).toString() } </th>
      <td> { props.obj[Object.keys(props.obj).toString()].browser } </td>
      <td> { props.obj[Object.keys(props.obj).toString()].geo.toString()} </td>
    </tr>
)

export default connect(state => ({ cl: getFoo }))(ClientLayout)
