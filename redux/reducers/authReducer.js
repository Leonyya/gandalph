import { authenticate } from '../types'
import { auth } from '../actions'

const INITIAL_STATE = {
    isLogged:false
}

export const authReducer = (state = INITIAL_STATE, action)=> {
    switch(action.type) {
        case authenticate: 
            return {
                isLogged: action.payload.isLogged
            }
        default:
            return state
    }
}