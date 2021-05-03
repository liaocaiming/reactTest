
import { config } from '@utils/lib/request';



const localApiPrefix = '/api/v1/';

export const urls = {
  users: 'users', // 注册
  users_get_code: 'users/get_code', // 获取验证码



};

config([
  {
    prefix: localApiPrefix,
    urls,
  },
]);

export default urls;
