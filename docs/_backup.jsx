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
			stl: {},
			isFull: true
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
						let geo = { 'lat': pos.coords.latitude, 'lng': pos.coords.longitude }
						db.ref('client/'+uid).set({
							browser: txt,
							geo: geo,
							message: 'Bienvenido',
							background:'#ffffff'
						})
					})
				} else {
					db.ref('client/'+uid).set({
						browser: txt,
						geo: 'not available',
						message: 'Bienvenido',
						background:'#ffffff'
					})
				}
				let userRef = db.ref('client/'+uid+'/message')
				userRef.on('value', (snapshot) => {
		      		this.setState({message: snapshot.val()})
				});
				let bgUserRef = db.ref('client/'+uid+'/background')
				bgUserRef.on('value', (snapshot) => {
					this.setState({stl: { background : snapshot.val()}})
				})
      } else {
				alert("error")
      }
	})
	

	}

	componentWillUnmount () {
	}


	render () {
		return (
				<section className="client" style={this.state.stl}>
				<div className="container">
					<div className="row">
						<div className="col">
							<h1>{this.state.name}</h1>
							<img src="/static/crash.png" width="400px" height="350px"/><br/>
							<h3>{this.state.message}</h3>
						</div>
					</div>
				</div>
				<style jsx global>{`
						client {
							background-color:white;
							color:black;
							text-align:center;
						}
				`}</style>
				</section>
		)
	}
}

export default Home
