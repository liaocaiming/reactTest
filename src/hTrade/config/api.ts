
import { config } from '@utils/lib/request';


const localApiPrefix = '/api/';
// const localApiPrefix = '/';
const bianceFApiPrefix = '/fapi/'

export const urls = {
  excel_data: 'excel_data', // 
  role: 'role/list', // 角色列表
  userList: 'user/list', // 用户列表
  addAndUpdateUser: 'user/addAndUpdate', // 新增和编辑用户;
  strategyList: 'strategy/list', // 策略列表
  strategyOrderList: 'strategy/order/list', // 策略开单详情列表
  follow_recordsShow: 'follow_records/detail', // 订单详情
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
