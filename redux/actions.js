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
        let client = mqtt.connect('ws://localhost:8888', {
            username: p.username,
            password: p.password
        })

        client.on('connect', ()=> {
            client.subscribe('sonde', () => {
                client.publish('sonde', 'Redux logged in saukzesfuly')
            })
        })
    } catch(e){
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

