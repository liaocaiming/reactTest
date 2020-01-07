import * as React from "react";
import { connect } from "react-redux";
import * as immutable from "immutable";
import styleCss from './index.css';

console.log(immutable);
interface Iprops {
  dispatch: any;
  match: any;
  history: any;
  $$user?: any;
}
@(connect((state: any) => {
  console.log(state);
  return state;
}) as any)
export default class Cart extends React.PureComponent<Iprops, any> {
  constructor(props: Iprops) {
    super(props);
  }
  public componentWillMount() {
    console.log(this.props);
  }
  public updateName = () => {
    const { dispatch } = this.props;
    dispatch({
      type: "USER/CAIMINGLIAO",
      payload: "CaimingLiao"
    });
  };

  public render() {
    console.log(this.props);
    return <span className={styleCss.btn} onClick={this.updateName}>userList</span>;
  }
}
// export default connect((state) => state)(Cart)
