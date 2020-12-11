import loadFile from '@containers/loadFile';

import Login from '@src/mobile/routes/Login';

import Layout from '@src/mobile/components/Layout';

const router =  [
  {
    path: '/',
    component: Login,
    title: '登录'
  },
  {
    path: 'mobile',
    component: Layout,
    routes: [
      {
        path: 'pay',
        component: loadFile({
          load: () => import('@src/mobile/routes/Pay')
        }),
        title: '支付',
        exact: true
      },
      {
        path: 'home',
        component: loadFile({
          load: () => import('@src/mobile/routes/Home')
        }),
        title: '首页',
        exact: true
      },
      {
        path: 'bindAccount',
        component: loadFile({
          load: () => import('@src/mobile/routes/BindAccount')
        }),
        title: '账户绑定',
        exact: true
      },

      {
        path: 'order',
        component: loadFile({
          load: () => import('@src/mobile/routes/Order')
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