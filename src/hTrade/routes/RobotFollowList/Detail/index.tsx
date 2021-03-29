import React from "react";
import { PageList } from "@components/index";
import linkPort from "@src/hTrade/config/api"; // 注意: 不是boss项目的请修改路径
import { connect } from "@containers/appScreen";
import IProps from "@typings/react.d";
import { Card } from "antd";
import DetaiModal from "./DetaiModal";

interface IState {
  isShow: boolean;
}

@connect()
export default class App extends React.PureComponent<IProps, IState> {
  private changeItem = {};

  private row: any[] = [
    {
      dataIndex: "addTime",
      title: "开单时间",
      isSearch: true,
      type: "rangePicker",
    },
    {
      dataIndex: "coin",
      title: "币种",
    },
    {
      dataIndex: "mul",
      title: "倍数",
    },
    {
      dataIndex: "strategyType",
      title: "策略类型",
    },

    {
      dataIndex: "is_stop_profit",
      title: "是否止盈",
    },
    {
      dataIndex: "is_stop_loss",
      title: "是否止损",
    },
    {
      dataIndex: "stop_profit_target",
      title: "止盈目标",
    },
    {
      dataIndex: "operate",
      title: "操作",
      render: (val: string, item: any) => {
        return (
          <a onClick={this.toggle({ key: "isShow", value: true, item })}>
            {" "}
            查看{" "}
          </a>
        );
      },
    },
  ];

  constructor(props: IProps) {
    super(props);
    this.state = {
      isShow: false,
    };
  }

  private toggle = (options: { key: "isShow"; value; item?: any }) => {
    return () => {
      const { key, value, item } = options;
      if (item) {
        this.changeItem = item;
      }

      this.setState({
        [key]: value,
      });
    };
  };

  private renderBaseInfo = () => {};

  private renderDetaiModal = () => {
    const { actions } = this.props;
    const { isShow } = this.state;

    return (
      <DetaiModal
        actions={actions}
        query={this.changeItem}
        isShow={isShow}
        title="订单详情"
        onCancel={this.toggle({ key: "isShow", value: false })}
      />
    );
  };

  render() {
    return (
      <Card title="策略详情">
        <PageList
          {...this.props}
          url={linkPort.strategyOrderList}
          tableComponentProps={{ columns: this.row }}
          groupSearchProps={{
            isShowResetBtn: true,
          }}
        />

        {this.renderDetaiModal()}
      </Card>
    );
  }
}
