import * as React from 'react';

export default class Hello extends React.PureComponent<any, any> {
  constructor(props:any) {
    super(props);
    console.log(props)
  }
  render () {
    return <span>hello word</span>
  }
}