import React from 'react'
import LazyLoad from '@/components/lazyLoad.js'
import { Switch, Route, Redirect } from 'react-router-dom'
const Intercept = (props) => {
  const routes = props.routes
  return <Switch>
    {
      routes.map((item, index) => {
        const AyncComponent = item.component && LazyLoad(() => item.component)
        console.log(item.component)
        return (
          <Route
            key={index}
            path={item.path}
            exact={item.exact}
            // component={AyncComponent}
            render={
              (props) => {
                if (item.meta.auth === 0) {
                  return <AyncComponent {...props}></AyncComponent>
                } else {
                  return <Redirect to={{ pathname: '/home', state: { form: props } }}></Redirect>
                }
              }
            }
          >
          </Route>
        )
      })
    }
  </Switch>
}

export default Intercept