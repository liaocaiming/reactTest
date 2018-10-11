import * as React from 'react';
import { connect } from 'react-redux';

interface Iprops {
  dispatch: any;
  match: any;
  history: any;
  $$user?:any;
}
class Cart extends React.PureComponent<Iprops, any> {
  constructor(props:Iprops) {
    super(props);
  }
  public componentWillMount () {
    console.log(this.props)
  }
  public updateName = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'USER/CAIMINGLIAO',
      payload: 'CaimingLiao'
    })
  }

  public render () {
    console.log(this.props.$$user.getIn(['userName']))
    return <span onClick={this.updateName}>userList</span>
  }
}
export default connect((state) => state)(Cart)