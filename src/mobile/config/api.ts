
import { config } from '@utils/lib/request';


const localApiPrefix = '/api/v1/';

export const urls = {
  login: 'authentication', // 登录
  register: 'users', // 注册
  checkTXid: 'deposit_records/check', // 检查转账id
  followRecords: 'follow_records', // 首页列表数据
  cancelFollowRecords: 'follow_records/destroy'
};

config([
  {
    prefix: localApiPrefix,
    urls,
  },
]);

export default urls;
