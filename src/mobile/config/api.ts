
import { config } from '@utils/lib/request';


const localApiPrefix = '/api/';

export const urls = {
  login: 'v1/authentication', // 登录
  register: 'v1/users'
};

config([
  {
    prefix: localApiPrefix,
    urls,
  },
]);

export default urls;
