import { Cart, Hello, Login, Dragable } from '@screens/boss/routes';

export default [
  {
    path: '/',
    component: Hello,
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
  }
]