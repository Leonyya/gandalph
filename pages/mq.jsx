import { Component } from 'react'
import mqtt from 'mqtt'
class MQ extends Component {
    constructor(props) {
        super(props)
        let client = mqtt.connect('mqtt://localhost:1883')
        client.on('connect', ()=> {
            client.publish('presence', 'Hello mqtt')
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