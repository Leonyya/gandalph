import { fooReducer } from './fooReducer'
import { barReducer } from './barReducer'
import { authReducer } from './authReducer'
import { combineReducers } from 'redux'

export default combineReducers({ fooReducer, barReducer, authReducer })