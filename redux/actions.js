import { FOO, BAR } from './types'

export const addFoo = () => ({
    type: FOO,
    payload: 'foo'
})

export const addBar = () => ({
    type: BAR,
    payload: 'bar'
})