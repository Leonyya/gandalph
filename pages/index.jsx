import { Component } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { auth, db } from '../firebase/firebase'
class Home extends Component {
	constructor(props) {
		super(props)
		this.state = {
			name: 'I think you got the wrong address',
			message:'',
			bgcolor: ''
		}
	}
	static getInitialProps({store, isServer, pathname,query}) {
	}
	componentDidMount () {
		auth.signInAnonymously().catch(error => {
			let errorCode = error.errorCode
			let errorMessage = error.message
		})
		auth.onAuthStateChanged( user => {
      if(user) {
        let isAnonymous = user.isAnonymous
        let uid = user.uid
				let txt = navigator.appCodeName + ' '
				txt += navigator.appName + ' '
				txt += navigator.appVersion + ' '
				txt += navigator.cookieEnabled + ' '
				txt += navigator.platform + ' '
				txt += navigator.userAgent
				if(navigator.geolocation) {
					navigator.geolocation.getCurrentPosition((pos) => {
						let geo = 'Latitude: '+pos.coords.latitude+' Longitude: '+pos.coords.longitude
						db.ref('client/'+uid).set({
							browser: txt,
							geo: geo,
							message: 'Bienvenido'
						})
					})
				} else {
					db.ref('client/'+uid).set({
						browser: txt,
						geo: 'not available'
					})
				}
				let userRef = db.ref('client/'+uid+'/message')
				userRef.on('value', (snapshot) => {
		      this.setState({message: snapshot.val()})
		    });
      } else {
				alert("error")
      }
    })
	}

	componentWillUnmount () {
	}


	render () {
		return (
			<section className={"section " + this.state.bgcolor}>
			<div className="container">

				<h1>{this.state.name}</h1>
				<img src="/static/crash.png"/>
				{this.state.message}
			</div>
			<style jsx global>{`
					black {
						background-color:black;
						color:white;
						text-align:center;
					}
					white {
						background-color:white;
						color:black;
					}
			`}</style>
			</section>
		)
	}
}

export default Home
