import { LoginToBroker } from '../types'
import { Login2b } from '../actions'
import mqtt from 'mqtt'

const INITIAL_STATE = {
    isLogged:false
}
export const authReducer = (state = INITIAL_STATE, action)=> {
    let { username } =  action.payload
    let { password } = action.payload
    let client = mqtt.connect('ws://localhost:8888', {
        username: username,
        password: password
    })
    client.on('connect', ()=> {

    })
    switch(action.type) {
        case Login2b: return {
            isLogged
        }
    }
}