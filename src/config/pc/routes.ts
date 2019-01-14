import { UserList } from '@screens/pc/routes';

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