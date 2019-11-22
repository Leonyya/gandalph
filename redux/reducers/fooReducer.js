import { FOO } from '../types'
const INITIAL_STATE = {
    foo:''
}
export const fooReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FOO:
            return { ...state, foo: action.payload }
        default:
            return state
    }
}