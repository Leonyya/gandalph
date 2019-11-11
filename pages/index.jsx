import { Component } from 'react'
import Link from 'next/link'
import Head from 'next/head'

class Home extends Component {
	constructor(props) {
		super(props)
		this.state = {
			name: 'I think you got the wrong address'
		}
	}
	static getInitialProps({store, isServer, pathname,query}) {
	}
	componentDidMount () {
	}

	componentWillUnmount () {
	}


	render () {
		return (
			<section className="section">
			<div className="container">

				<h1>{this.state.name}</h1>
				<img src="/static/crash.png"/>

			</div>
			<style jsx>{`
					background-color:white;
					color:black;
					text-align:center;
			`}</style>
			</section>
		)
	}
}

export default Home
