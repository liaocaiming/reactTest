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
      {
        path: 'moreUser',
        component: loadFile({
          load: () => import('@src/Htrade/routes/MoreUser')
        }),
        title: '用户管理',
        exact: true
      },

      {
        path: 'moreUser/:id',
        component: loadFile({
          load: () => import('@src/Htrade/routes/MoreUser/Detail')
        }),
        title: '用户管理',
        exact: true
      },


      {
        path: 'strategyList',
        component: loadFile({
          load: () => import('@src/Htrade/routes/StrategyList')
        }),
        title: '策略管理',
        exact: true
      },
      {
        path: 'strategyList/:id',
        component: loadFile({
          load: () => import('@src/Htrade/routes/StrategyList/StrategyItem')
        }),
        title: '策略详情',
        exact: true
      },

      {
        path: 'robotFollowList',
        component: loadFile({
          load: () => import('@src/Htrade/routes/RobotFollowList')
        }),
        title: '机器人跟单',
        exact: true
      },

      {
        path: 'robotFollowList/:id',
        component: loadFile({
          load: () => import('@src/Htrade/routes/RobotFollowList/Detail')
        }),
        title: '机器人跟单详情',
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