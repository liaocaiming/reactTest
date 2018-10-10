import * as React from 'react';

import { Button } from 'antd';

export default class Hello extends React.PureComponent<any, any> {
  constructor(props:any) {
    super(props);
    console.log(props, 111999)
  }
  render () {
    return (
      <Button type={'primary'}>Hello Word</Button>
    )
  }
}