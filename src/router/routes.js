const routes = [
  {
    path: '/',
    exact: true,
    meta: {
      auth: 1
    }
  },
  {
    path: '/home',
    component: import('@/page/home/home.jsx'),
    meta: {
      auth: 0
    }
  },
  {
    path: '/state',
    component: import('@/page/state/state.jsx'),
    meta: {
      auth: 1
    }
  },
  {
    path: '/about',
    component: import('@/page/about/about.jsx'),
    meta: {
      auth: 0
    }
  },
]
export default routes