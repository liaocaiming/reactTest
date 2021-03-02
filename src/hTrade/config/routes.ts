import loadFile from '@containers/loadFile';

import Login from '@src/Htrade/routes/Login';

import Layout from '@src/hTrade/components/Layout';

const router = [
  {
    path: '/',
    component: Login,
  },
  {
    path: 'Htrade',
    component: Layout,
    routes: [
      {
        path: 'bindUser',
        component: loadFile({
          load: () => import('@src/Htrade/routes/BindUser')
        }),
        title: '账户绑定',
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