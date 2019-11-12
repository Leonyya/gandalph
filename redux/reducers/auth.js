const INITIAL_STATE = {
  currentUser: null,
}

export const authReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case 'login':
      return {
        ...state,
        currentUser: action.currentUser
      }
    case 'deauth':
      return {
        ...state,
        currentUser: null
      }
    default:
      return state
  }
}
