import { createStore, applyMiddleware } from 'redux'
import reducer from './reducer.js'
import reduxThunk from 'redux-thunk'

const store = createStore(reducer, applyMiddleware(reduxThunk))

let currentState = store.getState()
store.subscribe(()=>{
  const preState = currentState
  currentState = store.getState()
  console.log('上一个值', preState, '当前值', currentState)
})

export default store