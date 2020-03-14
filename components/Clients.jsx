import { Component } from 'react'
class Clients extends Component {
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
              <th scope="col">ID</th>
              <th scope="col">Platform</th>
              <th scope="col">Location</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>

    )
  }

}



export default Clients
