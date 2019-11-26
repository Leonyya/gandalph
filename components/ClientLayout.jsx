import { Component } from 'react'
import Client from './Client'
class ClientLayout extends Component {
  static async getInitialProps(ctx) {
    const { store } = ctx
    return {}
  }
  constructor(props) {
    super(props)
    this.state = {
      clients: {},
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
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th scope="col"> UID </th>
              <th scope="col"> Browser </th>
              <th scope="col"> Geolocation </th>
            </tr>
          </thead>
          <tbody>
            { this.computeForClient().map( (client, index) => ( <Client obj={client} key={index}/> ))}
          </tbody>
        </table>
      </div>

    )
  }

}



export default ClientLayout
