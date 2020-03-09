import { Component } from 'react'
import mqtt from 'mqtt'
class MQ extends Component {
    constructor(props) {
        super(props)
        let client = mqtt.connect('mqtt://localhost:8888')
        client.on('connect', ()=> {
            client.subscribe('sonde', () => {
                client.publish('sonde', 'First connection browser')
            })
        })

        
    }
    render() {
        return (
            <div>
                MQ    
            </div>
        )

    }
}

export default MQ