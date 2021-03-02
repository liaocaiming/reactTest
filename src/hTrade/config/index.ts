import routes from './routes';
import hTradeReducers from '@src/hTrade/reducers/hTradeReducer';
import appScreenReducer from '@shared/containers/appScreen/reducer';
import appReducer from '@shared/containers/app/reducer';
import api from './api';

const reducers = {
  app: appReducer,
  screen: appScreenReducer,
  Htrade: hTradeReducers
}

export {
  routes,
  reducers,
  api
}