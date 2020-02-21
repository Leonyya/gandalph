import { Component } from 'react'
import mqtt from 'mqtt'
class MQ extends Component {
    constructor(props) {
        super(props)
        let client = mqtt.connect('mqtt://localhost:8888', {
            username: 'matteoe',
            password: '1234'
        })
        client.on('connect', ()=> {
            console.log('connected')
        })
        client.publish('buildexe', '127.0.0.1')
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