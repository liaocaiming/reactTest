import * as React from 'react';
// import { connect } from 'react-redux';

export default class Cart extends React.PureComponent<any, any> {
  constructor(props:any) {
    super(props);
  }
  public componentWillMount () {
    console.log(this.props)
  }
  render () {
    return <span>cart</span>
  }
}
// export default connect((state) => state)(Cart)