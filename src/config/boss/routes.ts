import { Cart, Hello } from '../../boss/routes/index';

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
  }
]