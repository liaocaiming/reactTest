import * as React from 'react';
import { connect } from 'react-redux';
import img from '../images/1.jpg';
import { Button } from  'antd';
window.console.log(111, 'nextProps')

// import { TestComponent } from '@screens/boss/components';
interface IState {
  val: number
}
class Cart extends React.PureComponent<any, IState> {
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

  public componentWillReceiveProps (nextProps: any) {
    window.console.log(nextProps, 'nextProps')
  }

  public onBtn = () => {
    let { val } = this.state;
    this.setState({
      val: ++val
    })
  }

  render () {
    return (
      <div>
        <Button onClick={this.onBtn}>按钮</Button>
        <span>cart</span>
        <img src={img} alt=""/>
        <div>{this.state.val}范德萨发</div>
        <span>dfsfa</span>
        {/* <TestComponent info={{ name: 'fdsafda', age: 111 }} /> */}
      </div>
    )
  }
}
export default connect((state) => state)(Cart)