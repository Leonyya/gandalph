import { BAR } from '../types' 
const INITIAL_STATE = {
    bar: ''
}

export const barReducer = (state = INITIAL_STATE, action) => {
    switch( action.type ) {
        case BAR: 
            return {
                ...state,
                bar: 'bar'
            }
        default:
            return state
    }
}