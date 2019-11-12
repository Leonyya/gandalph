import React, { Component } from 'react'
import { db, auth } from '../../firebase/firebase'
import { connect } from 'react-redux'
class withAuth extends Component {
  constructor() {
    super(props)

  }
  render() {
    return (
      
    )
  }
}

export default connect(
  mapState,
  mapDispatch,
  null
)(withAuth)
