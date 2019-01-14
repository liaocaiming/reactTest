const initialState = {
  name: 'liaoca', 
  list: [
    {
      name: 5555,
      title: 8888888
    }
  ]
}

export default function redux (state:any = initialState, action:any) {
  switch(action.type) {
    case 'liaocaiming':
      return (Object as any).assign({}, state, {
        name: 'liaocaiming'
      })
    default: 
      return state;
  }
}