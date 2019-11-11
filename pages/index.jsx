import { Component } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Connect from '../components/Connect'
import { connect } from 'react-redux'

class Home extends Component {
	constructor(props) {
		super(props)
		this.state = {
			name: 'I think you got the wrong address'
		}
	}
	static getInitialProps({store, isServer, pathname,query}) {
		store.dispatch({type:'FOO', payload: 'foo'})
		return { custom: 'custom' }
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
				<img src="/static/crash.png"/>
				Prop from redux {this.props.foo}
				Prop from initial {this.props.custom}
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

export default connect(state => state)(Home)
