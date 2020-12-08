
import { config } from '@utils/lib/request';


const localApiPrefix = '/api/';

export const urls = {
  get_indicators: 'get_indicators', // 获取牛币列表；
  results: 'results', // 获取历史的费率；
  realtime: 'realtime', // 获取实时的费率；

  force_orders: 'force_orders', // 获取市场强平订单
  open_interest: 'open_interest', //未平仓合约数  
  open_interest_hist: 'open_interest_hist', // 获取合约持仓量； 
  long_short_account_ratio: 'long_short_account_ratio', // 大户账号数多空比； 
  long_short_position_ratio: 'long_short_position_ratio', // 大户持仓量多空币 
  long_short_user_ratio: 'long_short_user_ratio', // 多空持仓人数比
  long_short_taker_ratio: 'long_short_taker_ratio', // 合约主动买卖量
  depth: 'depth', // 深度接口
};

config([
  {
    prefix: localApiPrefix,
    urls,
  },
]);

export default urls;
