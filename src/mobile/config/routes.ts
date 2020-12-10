import loadFile from '@containers/loadFile';

import Login from '@src/mobile/routes/Login';

import Layout from '@src/mobile/components/Layout';

const router =  [
  {
    path: '/',
    component: Login,
  },
  {
    path: 'mobile',
    component: Layout,
    routes: [
      {
        path: 'FollowOrderSet',
        component: loadFile({
          load: () => import('@src/boss/routes/FollowOrderSet')
        }),
        title: '下单设置',
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