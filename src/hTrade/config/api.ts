
import { config } from '@utils/lib/request';


const localApiPrefix = '/api/v1/';
// const localApiPrefix = '/';
const bianceFApiPrefix = '/fapi/'

export const urls = {
  excel_data: 'excel_data', // 
  role: 'role/list', // 角色列表

  // 用户信息
  userList: 'users', // 用户列表
  addUser: 'users', // 新增用户
  editUser: 'users/update', // 编辑用户

  // 返佣
  invite_records: 'invite_records', // 获取邀请列表
  invite_records_update: 'invite_records/update', // 设置返佣金额

  // 策略
  trade_signals: 'trade_signals', // 获取策略列表
  push_records: 'push_records', // 获取推送列表

  addAndUpdateUser: 'user/addAndUpdate', // 新增和编辑用户;
  strategyList: 'strategy/list', // 策略列表
  strategyOrderList: 'strategy/order/list', // 策略开单详情列表
  follow_recordsShow: 'follow_records/detail', // 订单详情
  robotFollowList: 'robot/follow/list', // 机器人列表
  userProfitList: 'user/profit/list', // 用户曲线收益列表
  userDetail: 'user/detail', // 用户详情
  authentication: 'authentication'
};


// export const bianceUrls = {
//   v1PremiumIndex: 'v1/premiumIndex' // 最新标记价格和资金费率
// };


config([
  {
    prefix: localApiPrefix,
    urls,
  },
  // {
  //   prefix: bianceFApiPrefix,
  //   urls: bianceUrls,
  // },
]);

export default { ...urls };
