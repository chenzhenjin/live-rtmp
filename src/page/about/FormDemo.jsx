import React, { useEffect, useState, useCallback, useReducer } from 'react'
import { Form, Input, Button } from 'antd'
import NewPrice from './newPrice.jsx'
import LoginContext from './LoginContext.js'
import { initState, loginReducer } from './loginReducer.js'
import LoginButton from './LoginButton.jsx'
const FormDemo = React.memo(() => {
  console.log('formdemo update')
  const [formVal, changeFormVal] = useState({ username: 'chenzhenjin', password: '' })
  const [memoText, changeMemoText] = useState({ text: 'memo' })
  const [form] = Form.useForm()
  const [state, dispatch] = useReducer(loginReducer, initState)
  const { name, pwd } = state
  useEffect(() => {
    console.log('FormDemo useEffect', formVal)
    form.validateFields()
    return () => {
      console.log('FormDemo unmount')
    }
  }, [formVal])
  const onFinish = (values) => {
    changeFormVal(values)
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const changeText = (event) => {
    changeMemoText({ text: 'mymemo' })
  }
  const textCallback = useCallback(() => {
    return memoText + 'useCallback'
  }, [memoText])

  return <LoginContext.Provider value={dispatch}>
    <Form form={form} name="basic" initialValues={formVal} onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <Form.Item label="username" name="username" rules={[{
        required: true,
        message: 'please input username'
      }]}>
        {/* name 属性的 Form.Item 包装的控件，不能控制value，数据同步将被 Form 接管 重新包裹input才能摆脱 */}
        <Input></Input>
      </Form.Item>
      <Form.Item label="password" name="password" rules={[{
        required: true,
        message: 'please input password'
      }]}>
        <Input.Password></Input.Password>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          submit
      </Button>
      </Form.Item>
    </Form>
    <p>{formVal.username + formVal.password}</p>
    <LoginButton></LoginButton>
    <p>{name + pwd}</p>
    <button onClick={changeText}>父切换memo文本</button>
    <NewPrice text={memoText} callback={textCallback}></NewPrice>
  </LoginContext.Provider>
})

export default FormDemo