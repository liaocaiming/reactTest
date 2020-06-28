import { Cart, Login, Dragable, Chart, Rate, Home } from '@screens/boss/routes';

export default [
  {
    path: '/',
    component: Home,
    title: 'hello word',
    exact: true,
    state: {
      title: 'hello word'
    }
  },
  {
    path: '/cart',
    component: Cart,
    title: '购物车',
    exact: true
  },
  {
    path: '/login',
    component: Login,
    title: '登录',
    exact: true
  },
  {
    path: '/dragable',
    component: Dragable,
    title: '拖拽',
    exact: true
  },
  // chart
  {
    path: '/chart',
    component: Chart,
    title: '拖拽',
    exact: true
  },

  {
    path: '/rate',
    component: Rate,
    title: '拖拽',
    exact: true
  },
]