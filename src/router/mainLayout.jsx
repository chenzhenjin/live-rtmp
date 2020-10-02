import React from 'react'
import { Redirect, Route, Switch, Link } from 'react-router-dom'
import LazyLoad from '@/components/lazyLoad.js'
import "./mainLayout.scss"
export default class MainLayout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tabbarActive: 'live'
    }
  }
  render() {
    return <div className="main">
      <Switch>
        <Route path="/" exact render={() => <Redirect to="/live" />}></Route>
        <Route path="/live" component={LazyLoad(() => import('@/page/live/live.jsx'))}></Route>
        <Route path="/state" component={LazyLoad(() => import('@/page/state/state.jsx'))}></Route>
        <Route render={() => <Redirect to="/live" />}></Route>
      </Switch>
      <div className="tabbar">
        <div className="tabbar-flex">
          <div className={this.state.tabbarActive === 'live' ?
            'tabbar-link active' : 'tabbar-link'}>
            <i className="iconfont iconzhiboguanli"></i>
            <Link to="/live"
              onClick={() => { this.changeActive('live') }}
            >
              现场直播
          </Link>
          </div>
          <div className={this.state.tabbarActive === 'state' ?
            'tabbar-link active' : 'tabbar-link'}>
            <i className="iconfont icondongtaigonggao"></i>
            <Link to="/state"
              onClick={() => { this.changeActive('state') }}
            >
              最新动态
          </Link>
          </div>
        </div>
      </div>
    </div>
  }
  changeActive(value) {
    this.setState({
      tabbarActive: value
    })
  }
}