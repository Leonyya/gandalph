import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react'
import React from 'react'
export class MapContainer extends  React.Component {
    constructor(props) {
        super(props)
        console.log(this.props.pos)
    }
    render() {
        return (
            <Map google={this.props.google} zoom={17} initialCenter={this.props.pos}>
                <Marker onClick={this.onMarkerClick}
                    name={'Current location'} position={this.props.pos}/>

                    <InfoWindow onClose={this.onInfoWindowClose}>
                        <div>
                            <h1>Location</h1>
                        </div>
                    </InfoWindow>
            </Map>

        )
    }

}

export default GoogleApiWrapper({
    apiKey: process.env.GOOGLE_MAPS_KEY
})(MapContainer)