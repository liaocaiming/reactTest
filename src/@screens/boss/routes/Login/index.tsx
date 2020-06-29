import * as React from "react";

import { connect } from "@shared/containers/appScreen";

import { Button} from 'antd';

// import './index.css';

interface Iprops {
  [random: string]: any;
}

interface Istate {
  [random: string]: any;
}

@connect()
export default class App extends React.PureComponent<Iprops, Istate> {
  constructor(props: Iprops) {
    super(props);
  }

  public handleSubmit = e => {
    e.preventDefault();
    window.console.log(this.props);
    this.props.form.validateFields((err, values) => {
      window.console.log(values);
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  public render() {
    return (
      <div style={{ width: 290, margin: "200px auto" }}>
        1111
        <Button>返回</Button>
      </div>
    );
  }
}
