
import loadFile from '@containers/loadFile';

export default [
  {
    path: '/',
    component: loadFile({
      load: () => import('@src/pc/routes/userManage/UserList/index')
    }),
    title: 'hello word',
    exact: true,
    state: {
      title: 'hello word'
    }
  },
  {
    path: '/test',
    component: loadFile({
      load: () => import('@src/pc/routes/Test')
    }),
    title: 'hello word',
    exact: true,
    state: {
      title: 'hello word'
    }
  }
]