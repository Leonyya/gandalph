import { Component } from 'react'
import io from 'socket.io-client'
import fetch from 'isomorphic-fetch'
import Link from 'next/link'
import Head from 'next/head'
import Nav from '../components/nav'

class Home extends Component {
  static async getInitialProps({ req }) {
    const response = await fetch('http://localhost:3000/messages')
    const messages = await response.json()
    return { messages }
  }
  static defaultProps = {
    messages: []
  }
  state = {
    field: '',
    messages: this.props.messages
  }

  componentDidMount() {
    this.socket = io('http://localhost:3000/')
    this.socket.on('message', this.handleMessage)
  }
  componentWillUnmount() {
    this.socket.off('message', this.handleMessage)
    this.socket.close()
  }
  handleMessage(message) {
    this.setState(state => ({ messages: state.messages.concat(message) }))
  }
  handleChange(event) {
    this.setState({})
  }
  handleSubmit(event) {
    event.preventDefault()
    const message = {
      id: (new Date()).getTime(),
      value: this.state.field

    }
    this.socket.emit('message', message)
    this.setState(state => ({
      field: '',
      messages: state.messages.concat(message)
    }))
  }

  render(){
    return(
      <div>
        <Head>
          <title>Home</title>
        </Head>

        <Nav />

        <div className='hero'>
          <h1 className='title'>Welcome to Next.js!</h1>
          <p className='description'>
            To get started, edit <code>pages/index.js</code> and save to reload.
          </p>

          <div className='row'>
            <ul>
              {this.state.messages.map(messages =>
                <li key={message.id}>{message.value}</li>
              )}
            </ul>
            <form onSubmit={this.handleSubmit}>
              <input
                onChange = {this.handleSubmit}
                type='text'
                placeholder='hola '
                value={this.state.field}
              />
              <button>Enviar</button>
            </form>
          </div>
        </div>

        <style jsx>{`
          .hero {
            width: 100%;
            color: #333;
          }
          .title {
            margin: 0;
            width: 100%;
            padding-top: 80px;
            line-height: 1.15;
            font-size: 48px;
          }
          .title,
          .description {
            text-align: center;
          }
          .row {
            max-width: 880px;
            margin: 80px auto 40px;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
          }
          .card {
            padding: 18px 18px 24px;
            width: 220px;
            text-align: left;
            text-decoration: none;
            color: #434343;
            border: 1px solid #9b9b9b;
          }
          .card:hover {
            border-color: #067df7;
          }
          .card h3 {
            margin: 0;
            color: #067df7;
            font-size: 18px;
          }
          .card p {
            margin: 0;
            padding: 12px 0 0;
            font-size: 13px;
            color: #333;
          }
        `}</style>
      </div>
    )
  }
}

export default Home
