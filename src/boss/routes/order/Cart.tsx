import * as React from 'react';
import { connect } from 'react-redux';
import img from '../images/1.jpg';

class Cart extends React.PureComponent<any, any> {
  constructor(props:any) {
    super(props);
    this.state = {
      val: 0
    }
  }
  public componentWillMount () {
  }

  public componentDidMount () {

  }
  render () {
    return (
      <div>
        <span>cart</span>
        <img src={img} alt=""/>
        <span>dfsfa</span>
      </div>
    )
  }
}
export default connect((state) => state)(Cart)