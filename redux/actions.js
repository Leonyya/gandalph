import { FOO, BAR } from './types'

export const addFoo = (uid) => ({
    type: FOO,
    payload: uid
})

export const addBar = () => ({
    type: BAR,
    payload: 'bar'
})