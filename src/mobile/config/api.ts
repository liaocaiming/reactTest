
import { config } from '@utils/lib/request';


const localApiPrefix = '/api/v1/';

export const urls = {
  login: 'authentication', // 登录
  register: 'users', // 注册
  checkTXid: 'deposit_records/check'
};

config([
  {
    prefix: localApiPrefix,
    urls,
  },
]);

export default urls;
