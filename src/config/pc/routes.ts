import { UserList } from '../../pc/routes/index';

export default [
  {
    path: '/',
    component: UserList,
    title: 'hello word',
    exact: true,
    state: {
      title: 'hello word'
    }
  }
]