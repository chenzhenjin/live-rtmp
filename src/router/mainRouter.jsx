import React from 'react'
import MainLayout from './mainLayout.jsx'
import { HashRouter as Hash } from 'react-router-dom'
export default class MainRouter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    // basename为路由前加项目之类，没事就不要加了
    return <Hash basename="">
      <MainLayout></MainLayout>
    </Hash>
  }
}