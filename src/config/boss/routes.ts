import loadFile from '@containers/loadFile';

import Login from '@screens/boss/routes/Login';

import Layout from '@shared/components/Layout';

const router =  [
  {
    path: '/',
    component: Login,
  },
  {
    path: 'boss',
    component: Layout,
    routes: [
      {
        path: 'chart',
        component: loadFile({
          load: () => import('@screens/boss/routes/Chart')
        }),
        title: '汇率-价格统计图',
        exact: true
      },
    
      {
        path: 'rate',
        component: loadFile({
          load: () => import('@screens/boss/routes/Rate')
        }),
        title: '汇率柱形统计图',
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