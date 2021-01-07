
import { config } from '@utils/lib/request';


const localApiPrefix = '/api/v1/';

export const urls = {
  login: 'authentication', // 登录
  register: 'users', // 注册
  checkTXid: 'deposit_records/check', // 检查转账id
  followRecords: 'follow_records', // 首页列表数据
  cancelFollowRecords: 'follow_records/destroy', // 取消跟单
  orderOpenSettingsUpdate: 'user_settings/update', // 跟新设置开单设置
  getOrderOpenSettingData: 'user_settings', // 获取开单设置
  getOrderOpenSettinOfficial: 'user_settings/official', // 推荐开单设置
  userSettings: 'user_settings', // 获取用户跟单设置
  setSecret: 'users/set_secret', // 绑定api
  StopOrStartUserSetting: 'follow_records/change'
};

config([
  {
    prefix: localApiPrefix,
    urls,
  },
]);

export default urls;
