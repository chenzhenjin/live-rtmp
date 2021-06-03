import React from 'react'
import { withRouter, Redirect, Route, Switch, Link } from 'react-router-dom'
import LazyLoad from '@/components/lazyLoad.js'
import routes from './routes.js'

import "./mainLayout.scss"
import Intercept from './intercept.jsx'
class MainLayout extends React.Component {
  constructor(props) {
    super(props)
    console.log('MainLayout', props)
    this.state = {
      tabbarActive: props.location.pathname.slice(1)
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate', nextProps)
    if (nextProps.location.pathname === this.props.location.pathname) {
      return false
    }
    return true
  }
  //全局监听路由
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      console.log('UNSAFE_componentWillReceiveProps', nextProps)
      this.setState({
        tabbarActive: nextProps.location.pathname.slice(1)
      })
    }
  }

  render() {
    return <div className="main">
      <Intercept routes={routes}></Intercept>
      {/* exact为true时，’/link’与’/’是不匹配的 避免/about匹配到/ */}
      {/* <Switch>
        <Route path="/" exact render={() => <Redirect to="/home" />}></Route>
        <Route path="/home" component={LazyLoad(() => import('@/page/home/home.jsx'))}></Route>
        <Route path="/state" component={LazyLoad(() => import('@/page/state/state.jsx'))}></Route>
        <Route path="/about" component={LazyLoad(() => import('@/page/about/about.jsx'))}></Route>
        <Route render={() => <Redirect to="/home" />}></Route>
      </Switch> */}
      <div className="tabbar">
        <div className="tabbar-flex">
          <div className={this.state.tabbarActive === 'home' ?
            'tabbar-link active' : 'tabbar-link'}>
            <i className="iconfont iconzhiboguanli"></i>
            <Link to="/home"
              onClick={() => { this.changeActive('home') }}
            >
              现场直播测试
          </Link>
          </div>
          <div className={this.state.tabbarActive === 'state' ?
            'tabbar-link active' : 'tabbar-link'}>
            <i className="iconfont icondongtaigonggao"></i>
            <Link to="/state"
              onClick={() => { this.changeActive('state') }}
            >
              <span>最新动态(1.1.0版本号)</span>
            </Link>
          </div>
          <div className={this.state.tabbarActive === 'about' ?
            'tabbar-link active' : 'tabbar-link'}>
            <Link to="/about?id=10" onClick={() => { this.changeActive('about') }}>
              <span>关于</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  }
  changeActive(value) {
    // console.log('changeActive 123456', window.a.b)
    // this.setState({
    //   tabbarActive: value
    // })
  }
}

export default withRouter(MainLayout)