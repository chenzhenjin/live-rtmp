export const initState = {
  name: '',
  pwd: '',
  loading: false
}

export const loginReducer = function (state, action) {
  switch (action.type) {
    case 'login':
      return {
        ...state,
        ...action.data
      }
    default:
      return state
  }
}