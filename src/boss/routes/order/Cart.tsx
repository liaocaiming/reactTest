import * as React from 'react';
import { connect } from 'react-redux';
import img from '../images/2.jpg';
class Cart extends React.PureComponent<any, any> {
  constructor(props:any) {
    super(props);
    this.state = {
      val: 0
    }
  }
  public componentWillMount () {
    // console.log(this.props)
  }

  public componentDidMount () {
    this.setState({ val: this.state.val + 1})
    console.log(this.state.val)
    this.setState({ val: this.state.val + 1})
    console.log(this.state.val)
    setTimeout(() => {
      this.setState({ val: this.state.val + 1})
      console.log(this.state.val)
      this.setState({ val: this.state.val + 1})
      console.log(this.state.val)
    }, 0)
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