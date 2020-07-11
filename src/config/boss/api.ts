
import { config } from '@utils/lib/request';


const localApiPrefix = '/api/';

export const urls = {
  get_indicators: 'get_indicators',
  results: 'results',
  realtime: 'realtime'

};

config([
  {
    prefix: localApiPrefix,
    urls,
  },
]);

export default urls;
