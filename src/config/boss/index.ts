import routes from './routes';
import bossReducers from '@screens/boss/reducers';
import appScreenReducer from '@shared/containers/appScreen/reducer';
import appReducer from '@shared/containers/app/reducer';
import api from './api';

const  reducers = {
  $$app: appReducer,
  $$appScreen:appScreenReducer,
  ...bossReducers
}

export {
  routes,
  reducers,
  api
}