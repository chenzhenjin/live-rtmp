import React, { useEffect, useState, useRef, useLayoutEffect, useMemo } from 'react'
import { Input } from 'antd'
import { connect } from 'react-redux'
import store from '@/store'

const thunkTestAction = function (data) {
  return (dispatch, getState) => {
    new Promise((resolve, reject) => {
      resolve(data)
    }).then(data => {
      dispatch({
        type: 'setthunk',
        data
      })
      console.log('setthunk', getState())
    })
  }
}

const NewPrice = React.memo((props) => {
  console.log('NewPrice update', props)
  store.dispatch(thunkTestAction('testThunk'))
  const [price, changePrice] = useState(0)
  const [memoText, changeMemoText] = useState('memo')
  const [number, setNumber] = useState(0)
  const buttonRef = useRef()
  const fixRef = useRef(0)
  useEffect(() => {
    console.log('NewPrice useEffect', price, memoText, number)
    return () => {
      console.log('NewPrice unmount')
    }
  }, [price, memoText, number, fixRef])
  useLayoutEffect(() => {
    console.log('NewPrice useLayoutEffect')
  })
  const onPriceChange = (event) => {
    if (+event.target.value > 20) {
      setTimeout(() => {
        changePrice(20)
      }, 1000)
    }
    changePrice(event.target.value)
    console.log('onPriceChange', event)
  }
  const changeText = () => {
    console.log('buttonRef', buttonRef.current)
    changeMemoText('mymemo')
  }
  const changeFix = () => {
    console.log('changeFix', fixRef.current)
    fixRef.current += 1
  }
  const changeNumber = () => {
    setNumber(number + 1)
  }
  const logNumber = () => {
    setTimeout(() => {
      console.log(number, fixRef)
    }, 3000)
  }
  const sum = useMemo(() => {
    console.log('number * 10')
    return number * 10
  }, [number])
  const changeTheme = () => {
    if (props.theme === 'black') {
      props.setTheme('white')
    }
  }
  return <>
    <span>memo测试{props.text.text}</span>
    <Input value={price} onChange={onPriceChange}></Input>
    <button ref={buttonRef} onClick={changeText}>切换memo文本</button>
    <span>子memo{memoText}</span>
    <div>
      <p>{'number * 10 is ' + sum}</p>
      <p>{'number * 10 is ' + sum}</p>
      <p>{'fixRef' + fixRef.current}</p>
      <button onClick={changeFix}>add ref</button>
      <button onClick={changeNumber}>+1</button>
      <button onClick={logNumber}>log</button>
    </div>
    <div>
      <p>{props.theme}</p>
      <button onClick={changeTheme}>setWhite</button>
    </div>
    <div>
      <p>{props.thunk}</p>
    </div>
  </>
})

const stateToProps = (state, componentProps) => {
  console.log('stateToProps', state, componentProps)
  return {
    theme: state.theme,
    thunk: state.thunk
  }
}

const dispatchToProps = (dispatch, componentProps) => {
  console.log('dispatchToProps', dispatch, componentProps)
  return {
    setTheme(data) {
      setTimeout(() => {
        dispatch({ type: 'SETTHEME', data })
      }, 1000)
    }
  }
}
//dispatchToProps不传，默认传入dispatch方法
export default connect(stateToProps, dispatchToProps)(NewPrice)