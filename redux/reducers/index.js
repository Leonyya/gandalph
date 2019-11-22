import { fooReducer } from './fooReducer'
import { barReducer } from './barReducer'
import { combineReducers } from 'redux'

export default combineReducers({ fooReducer,barReducer })