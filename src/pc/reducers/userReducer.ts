import { fromJS } from 'immutable';

import { createReducer } from '@utils/index';

console.log(createReducer);

const initialState = fromJS({
  userName: 'liaocaiming', 
  list: [
    {
      name: 5555,
      title: 8888
    }
  ]
})

export default function userReducer ($$state:any = initialState, action:any) {
  switch(action.type) {
    case 'liaocaiming':
      // const app = state.mergeIn(['name'], action.payload);
      // console.log(app, 12434);
      return $$state
    default: 
    //  const app =  $$state.mergeIn(['name'], action.payload);
    //  console.log(app)
      return $$state;
  }
}