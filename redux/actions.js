import { FOO, BAR, LoginToBroker } from './types'

export const addFoo = (uid) => ({
    type: FOO,
    payload: uid
})

export const addBar = () => ({
    type: BAR,
    payload: 'bar'
})

export const Login2b = (u) => ({
    type: LoginToBroker,
    payload: u
}) 

