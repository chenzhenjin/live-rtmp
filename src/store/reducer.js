const setTheme = 'SETTHEME'
const defaultState = {
  theme: 'black',
  userInfo: {
    name: 'Torion'
  },
  thunk: 'loadingThunk'
}

export default (state = defaultState, actions) => {
  switch (actions.type) {
    case setTheme:
      return {
        ...state,
        theme: actions.data,
      }
    case 'setthunk':
      return {
        ...state,
        thunk: actions.data
      }
    default:
      return state
  }
}