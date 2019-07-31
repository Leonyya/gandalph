import { Component } from 'react'
import io from 'socket.io-client'
import fetch from 'isomorphic-fetch'
import Link from 'next/link'
import Head from 'next/head'
import Nav from '../components/nav'
import Connect from '../components/Connect'
import firebase from 'firebase'

let firebaseConfig = {
	apiKey: "AIzaSyBCyovJbc8AuTHaCOJI070fo-Q7YG6VZrQ",
	authDomain: "infinity-2020.firebaseapp.com",
	databaseURL: "https://infinity-2020.firebaseio.com",
	projectId: "infinity-2020",
	storageBucket: "",
	messagingSenderId: "1064260992291",
	appId: "1:1064260992291:web:8181fee94896c0a7"
};
try {
	firebase.initializeApp(firebaseConfig)
} catch(err) {
	if(!/already exists/.test(err.message)) {
		console.log('Firebase initialization error',err.stack)
	}
}

const database = firebase.database()

class Home extends Component {
	constructor(props) {
		super(props)
		this.state = {
			name: 'Leon'
		}
	}

	componentDidMount () {
		const nameRef= database.ref().child('name')
		nameRef.on('value', snapshot => {
			this.setState({
				name: snapshot.val()
			})
		})
	}

	componentWillUnmount () {
	}


	render () {
		return (
			<div className="page-style">
				<Connect/>
				<h1>{this.state.name}</h1>
				<style jsx>{`
					background-color:black;
				`}</style>
			</div>
		)
	}
}

export default Home
