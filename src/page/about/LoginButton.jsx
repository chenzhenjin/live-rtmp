import React, { useContext } from 'react'
import LoginContext from './LoginContext.js'

function LoginButton() {
  console.log('LoginButton update')
  const dispatch = useContext(LoginContext);
  const loginClick = () => {
    dispatch({ type: 'login', data: { name: 'Torion', pwd: '123456' } })
  }
  return <button onClick={loginClick}>loginReducer</button>
}

export default React.memo(LoginButton)