const initValue = {
  uid: '', userName: '', password: ''
}

const init = () => {
  return initValue
}

interface IState {
  uid?: string;
  userName:string;
  password: string;
}

interface IAction {
  type?: string;
  payload?: object;
}

export {
  init,
  initValue
}

export default (state: IState, action: IAction) => {
  const { payload = {} } = action;
  return {...state, ...payload }
}