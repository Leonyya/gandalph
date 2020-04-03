import { FOO, BAR, authenticate } from './types'
import mqtt from 'mqtt'
export const addFoo = (uid) => ({
    type: FOO,
    payload: uid
})

export const addBar = () => ({
    type: BAR,
    payload: 'bar'
})

export const auth = (p) => {
    try {
        console.log(p)
        let client = mqtt.connect('mqtt://localhost:8888', {
            username: p.username,
            password: p.password
        })
        //let client = new Paho.Client("mqtt://localhost",/* Number(8888), "/", "clientId"*/)
        client.on(
            'connect',
            (message) => {
                console.log(`${new Date().toLocaleString()} connected to broker`)
                client.subscribe('sonde')
                client.publish('sonde', 'Connected from browser')
            }
        )

        client.on(
            'message',
            (topic, message) => {
                console.log(`Message received on topic ${topic}: ${message.toString()}`)
            }
        )
    } catch(e){
        console.error(e)
        return {
            type: authenticate,
            payload: {
                isLogged: false
            }
        }
    }

    return {
        type: authenticate,
        payload: {
            isLogged: true
        }
    }
}

