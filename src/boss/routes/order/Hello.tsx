import * as React from 'react';

import { Button } from 'antd';

interface Iprops {

}

interface Istate {
  isShowModal: boolean;
  list: any[];
}


export default class Hello extends React.PureComponent<Iprops, Istate> {
  constructor(props: any) {
    super(props);
    console.log(props, 111999)
    this.state = {
      isShowModal: false,
      list: [
        {
          name: 'liaocaimnig',
          age: '18'
        },
        {
          name: 'liaocaimnig',
          age: '18'
        }
      ]
    }
  }

  public onBtn = () => {
    this.state.list.splice(0, 1);
    // this.setState({
    //   isShowModal: !this.state.isShowModal
    // })
    console.log(this.state.list, 'this.state.list')
    return
  }

  render() {
    const { list } = this.state;
    window.console.log(list);
    return (
      <div>
        <Button type={'primary'} onClick={this.onBtn}>Hello Word</Button>

        {
          list && list.map((item: any, index:number) => {
            return <span key={index}>{item.name}11</span>
          })
        }
      </div>
    )
  }
}