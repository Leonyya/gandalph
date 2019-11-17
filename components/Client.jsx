import { Component } from 'react'

class Client extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clients: {}
    }
  }
  componentDidMount() {
    this.setState({ clients: this.props.clients })
  }


}
export default Client
