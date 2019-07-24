import { Component } from 'react'
import io from 'socket.io-client'
import fetch from 'isomorphic-fetch'
import Link from 'next/link'
import Head from 'next/head'
import Nav from '../components/nav'

class Home extends Component {
	// acá pedimos los datos de los mensajes viejos, esto se ejecuta tanto en el cliente como en el servidor
	static async getInitialProps ({ req }) {
		const response = await fetch('http://localhost:3000/messages')
		const messages = await response.json()
		return { messages }
	}

	static defaultProps = {
		messages: []
	}

	// en el estado guardamos un string vacío (el campo del formulario) y los mensajes que recibimos del API
	state = {
		field: '',
		messages: this.props.messages
	}

	// una vez que el componente se montó en el navegador nos conectamos al servidor de sockets
	// y empezamos a recibimos el evento `message` del servidor
	componentDidMount () {
		this.socket = io('http://localhost:3000/')
		this.socket.on('message', this.handleMessage)
	}

	// cuando el componente se va a desmontar es importante que dejemos de escuchar el evento
	// y que cerremos la conexión por sockets, esto es para evitar problemas de que lleguen mensajes
	componentWillUnmount () {
		this.socket.off('message', this.handleMessage)
		this.socket.close()
	}

	// cuando llega un mensaje del servidor lo agregamos al estado de nuestra página
	handleMessage = (message) => {
		this.setState(state => ({ messages: state.messages.concat(message) }))
	}

	// cuando el valor del input cambia actualizamos el estado de nuestra página
	handleChange = event => {
		this.setState({ field: event.target.value })
	}

	// cuando se envía el formulario enviamos el mensaje al servidor
	handleSubmit = event => {
		event.preventDefault()

		// creamos un objeto message con la fecha actual como ID y el valor del input
		const message = {
			id: (new Date()).getTime(),
			value: this.state.field
		}

		// enviamos el objeto por socket al servidor
		this.socket.emit('message', message)

		// lo agregamos a nuestro estado para que se muestre en pantalla y limpiamos el input
		this.setState(state => ({
			field: '',
			messages: state.messages.concat(message)
		}))
	}

	render () {
		return (
			<main>
				<div>
					<ul>
						{this.state.messages.map(message =>
							<li key={message.id}>{message.value}</li>
						)}
					</ul>
					<form onSubmit={this.handleSubmit}>
						<input
							onChange={this.handleChange}
							type='text'
							placeholder='Hola Platzi!'
							value={this.state.field}
						/>
						<button>Enviar</button>
					</form>
				</div>
			</main>
		)
	}
}

export default Home
