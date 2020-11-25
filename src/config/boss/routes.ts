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
        path: 'bindUser',
        component: loadFile({
          load: () => import('@screens/boss/routes/BindUser')
        }),
        title: '账户绑定',
        exact: true
      },

      {
        path: 'orderSet',
        component: loadFile({
          load: () => import('@screens/boss/routes/OrderSet')
        }),
        title: '下单设置',
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


      {
        path: 'bestCoinList',
        component: loadFile({
          load: () => import('@screens/boss/routes/BestCoinList')
        }),
        title: '牛逼赛选列表',
        exact: true
      },

      {
        path: 'statistics',
        component: loadFile({
          load: () => import('@screens/boss/routes/Statistics')
        }),
        title: '合约数据统计',
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