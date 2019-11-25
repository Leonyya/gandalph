import { Component } from 'react'
import { connect } from 'react-redux'
import { getFoo } from '../redux/selector'
import mapIcon from '../static/maps.png'

class ClientLayout extends Component {

  constructor(props) {
    super(props)
    this.state = {
      clients: {},
      foo: this.props.foo
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
      { this.state.foo }
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

class Client extends Component {
  constructor(props) {
    super(props)
    this.handleMapClick = this.handleMapClick.bind(this)
  }
  handleMapClick() {
  }
  render() {
    return (
      <tr>
        <th scope="row"> { Object.keys(this.props.obj).toString() } </th>
        <td> { this.props.obj[Object.keys(this.props.obj).toString()].browser } </td>
        <td><img src={mapIcon} onClick={this.handleMapClick}/> </td>
      </tr>
    )
  }
}

export default connect(getFoo)(ClientLayout)
