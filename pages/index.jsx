import { Component } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Connect from '../components/Connect'
import firebase from 'firebase'

let firebaseConfig = {
	apiKey: process.env.FIREBASE_APIKEY,
	authDomain: process.env.FIREBASE_AUTHDOMAIN,
	databaseURL: process.env.FIREBASE_DATABASEURL,
	projectId: process.env.FIREBASE_APPID,
	storageBucket: process.env.FIREBASE_STORAGEBUCKET,
	messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
	appId: process.env.FIREBASE_APPID
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

	}

	componentWillUnmount () {
	}


	render () {
		return (
			<section className="section">
			<div className="container">
				<Connect/>
				<h1>{this.state.name}</h1>

			</div>
			<style jsx>{`
				background-color:black;
			`}</style>
			</section>
		)
	}
}

export default Home
