import React from 'react'
import { Redirect, Route, Switch, Link } from 'react-router-dom'
import LazyLoad from '@/components/lazyLoad.js'
import "./mainLayout.scss"
export default class MainLayout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tabbarActive: 'home'
    }
  }
  render() {
    return <div className="main">
      <Switch>
        <Route path="/" exact render={() => <Redirect to="/home" />}></Route>
        <Route path="/home" component={LazyLoad(() => import('@/page/home/home.jsx'))}></Route>
        <Route path="/state" component={LazyLoad(() => import('@/page/state/state.jsx'))}></Route>
        <Route render={() => <Redirect to="/home" />}></Route>
      </Switch>
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
              <span>最新动态(未开发不加版本号)</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  }
  changeActive(value) {
    console.log('changeActive 123456', window.a.b)
    this.setState({
      tabbarActive: value
    })
  }
}