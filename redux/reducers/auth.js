export const authReducer = (state = { currentUser: '' }, action) => {
  switch(action.type) {
    case 'login':
      return {
        ...state,
        currentUser: action.payload
      }
    default:
      return state
  }
}
