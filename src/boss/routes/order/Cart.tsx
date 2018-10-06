import * as React from 'react';
import { connect } from 'react-redux';
import img from '../images/1.jpg';
class Cart extends React.PureComponent<any, any> {
  constructor(props:any) {
    super(props);
  }
  public componentWillMount () {
    console.log(this.props)
  }
  render () {
    return (
      <div>
        <span>cart</span>
        <img src={img} alt=""/>
      </div>
    )
  }
}
export default connect((state) => state)(Cart)