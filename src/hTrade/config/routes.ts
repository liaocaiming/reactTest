import loadFile from '@containers/loadFile';

import Login from '@src/Htrade/routes/Login';

import Layout from '@src/hTrade/components/Layout';

const router = [
  {
    path: '/',
    component: Login,
  },
  {
    path: 'htrade',
    component: Layout,
    routes: [

      {
        path: 'role',
        component: loadFile({
          load: () => import('@src/Htrade/routes/Role')
        }),
        title: '角色管理',
        exact: true
      },

      {
        path: 'user',
        component: loadFile({
          load: () => import('@src/Htrade/routes/User')
        }),
        title: '用户管理',
        exact: true
      },

    ],
  },

]


function formatter(data: any, parentPath = '/') {
  return data.map((item: { path: string; routes?: any }) => {
    let { path } = item;

    if (path !== undefined) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
    };
    if (item.routes) {
      result.routes = formatter(item.routes, `${parentPath}${item.path}/`);
    }
    return result;
  });
}

const formatterRouter = formatter(router);

export default formatterRouter;