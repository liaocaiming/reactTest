import * as React from "react";

import IProps from "@typings/react.d";

import { connect } from "@containers/app";

import { api } from "@src/hTrade/config";

import Select from "@components/Select";

@connect()
export default class App extends React.PureComponent<IProps> {
  render() {
    return (
      <div>
        <Select
          url={api.bots}
          actions={this.props.actions}
          searchKey="email"
          style={{ width: 200 }}
          fieldNames={{ value: "email", label: "name" }}
        />
      </div>
    );
  }
}
