import * as React from "react";
import { connect } from "react-redux";

interface Iprops {
  dispatch: any;
  match: any;
  history: any;
  $$user?: any;
}

interface IState {
  num: number;
}

@(connect((state: any) => {
  console.log(state);
  return state;
}) as any)
export default class Cart extends React.PureComponent<Iprops, IState> {
  constructor(props: Iprops) {
    super(props);
    this.state = {
      num:0
    }
  }
 
  public updateName = () => {
    const { dispatch } = this.props;
    // dispatch({
    //   type: "USER/CAIMINGLIAO",
    //   payload: "CaimingLiao"
    // });
  };

  public componentDidMount () {
    setTimeout(() => {
      this.setState({
        num: 2
      })
      console.log(this.state.num, 'num')
    }, 100)
    document.body.addEventListener('click', () => {
      this.setState({
        num: 3
      })
      console.log(this.state.num)
    })
  }

  public render() {
    console.log(this.props);
    return <span id='btn' onClick={this.updateName}>userList</span>;
  }
}
