import React from 'react'
import { withRouter } from 'react-router-dom'
import FormDemo from './FormDemo.jsx'


class About extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      number: 0
    }
    this.cache = {}
    this.testCallback.bind(this)
  }
  UNSAFE_componentWillReceiveProps(nextProps, nextState) {
    console.log('about UNSAFE_componentWillReceiveProps', nextProps)
  }
  componentWillUnmount() {
    console.log('about componentWillUnmount')
  }
  UNSAFE_componentWillUpdate(nextProps, nextState) {
    console.log('about UNSAFE_componentWillUpdate', nextState)
  }
  get getRoutePath() {
    let pathnameSearch = this.props.history.location.pathname + this.props.history.location.search
    if (this.cache['getRoutePath'] !== pathnameSearch) {
      console.log('getRoutePath', this.props.history)
      this.cache['getRoutePath'] = pathnameSearch
      return pathnameSearch
    } else {
      return this.cache['getRoutePath']
    }
  }
  goToHome() {
    console.log('goToHome', this.props)
    this.props.history.push('/home')
  }
  addUrlSearch() {
    this.props.history.push({ pathname: '/about', search: '?id=15' })
  }
  numberChange(event) {
    this.setState({
      number: event.target.value
    })
  }
  testCallback() {
    return 'about testCallback'
  }
  render() {
    console.log('about render')
    return <div style={{ paddingBottom: '70px' }}>
      <FormDemo callback={this.testCallback}></FormDemo>
      <button onClick={() => { this.addUrlSearch() }}>追加search</button>
      <p>{this.getRoutePath}</p>
      <p>{this.getRoutePath}</p>
      <button onClick={() => { this.goToHome() }}>跳转home</button>
      <div>
        <input type="text" value={this.state.number} onChange={(event) => { this.numberChange(event) }} />
      </div>
    </div>
  }
}

export default withRouter(About)