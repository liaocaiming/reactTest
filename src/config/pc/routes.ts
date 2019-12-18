
import loadFile from '@containers/loadFile';

export default [
  {
    path: '/',
    component: loadFile({
      load: () => import('@screens/pc/routes/userManage/UserList/index')
    }),
    title: 'hello word',
    exact: true,
    state: {
      title: 'hello word'
    }
  }
]