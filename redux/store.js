import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers'
import ReduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'remote-redux-devtools'
export default function(initialState = {}, options) {

    const middleware = [
        ReduxThunk,
        () => next => action => {
            console.log('action', action)
            next(action)
        }
    ]

    const composeEnhancers = typeof window !== 'undefined' ? 
        window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE__ : compose

    return createStore(
        rootReducer,
        initialState,
        composeEnhancers(applyMiddleware(...middleware))
    )
}