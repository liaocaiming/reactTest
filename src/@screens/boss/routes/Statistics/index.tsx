import * as React from "react";

import { connect } from "@shared/containers/appScreen";

import dateFormat from "@utils/lib/dateFormat";

import { Select } from 'antd';

import { api }  from '@src/config/boss'

interface IProps {

}

interface IState {

}

@connect()
export default class App extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
     
    };
  }
  public componentDidMount() {
    
  }


  public render() {
 

    return (
      <div>
       
      </div>
    );
  }
}
