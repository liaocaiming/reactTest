
import { config } from '@utils/lib/request';


const localApiPrefix = '/api/';
// const localApiPrefix = '/';

export const urls = {

  bindUser: 'bind_user', // 
};

config([
  {
    prefix: localApiPrefix,
    urls,
  },
]);

export default urls;
