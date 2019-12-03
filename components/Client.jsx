import { connect } from 'react-redux'
import { Component, useState } from 'react'
import { addFoo } from '../redux/actions'
import mapIcon from '../static/maps.png'
import MapContainer from '../modules/Map'
import {
    Modal,
    Button
 } from 'react-bootstrap'

class Client extends Component {
    constructor(props) {
      super(props)
      this.handleModal = this.handleModal.bind(this)
      this.toggleClient = this.toggleClient.bind(this)
      this.handleCloseModal = this.handleCloseModal.bind(this)
      this.state ={
        isChecked: false,
        show: false
      }
    }
    handleModal() {
        this.setState({
            show:true
        })
    }
    handleCloseModal() {
        this.setState({
            show:false
        })
    }
    toggleClient() {
      this.setState({ isChecked: !this.state.isChecked})
      this.props.addFoo(Object.keys(this.props.obj).toString())
    }
    render() {
      return (
        <>
            <Modal dialogClassName="insideM" show={this.state.show} onHide={this.handleCloseModal}>
                <Modal.Header closeButton>
                <Modal.Title>Geolocation of Client  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <MapContainer pos={ this.props.obj[Object.keys(this.props.obj).toString()].geo }/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>

                        <br/>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={this.handleCloseModal}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
            <tr>
                <th scope="row"> <input type="checkbox" onChange={this.toggleClient}></input> </th>
                <td> { Object.keys(this.props.obj).toString() }</td>
                <td> { this.props.obj[Object.keys(this.props.obj).toString()].browser } </td>
                <td><img src={mapIcon} onClick={this.handleModal}/> </td>
            </tr>
            <style jsx global>{`
                .insideM {
                    width: 50vw;    /* Occupy the 90% of the screen width */
                    max-width: 50vw;
                    height:500px;
                    min-height:500px
                }
            `}</style>
        </>
      )
    }
  }
  export default connect(null, { addFoo })(Client)