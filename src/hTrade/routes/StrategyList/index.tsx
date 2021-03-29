import React from "react";
import { PageList } from "@components/index";
import linkPort from "@src/hTrade/config/api"; // 注意: 不是boss项目的请修改路径
import { connect } from "@containers/appScreen";
import IProps from "@typings/react.d";
import { Button, Modal } from "antd";
import StrategyItem from "./StrategyItem";
import { Link } from "@components/index";

interface IState {
  isShow?: boolean;
  [key: string]: any;
}

@connect()
export default class App extends React.PureComponent<IProps, IState> {
  private changeItem = {};

  private row = [
    {
      title: "策略名称",
      dataIndex: "strategyName",
    },

    {
      title: "状态",
      dataIndex: "statusName",
    },

    {
      title: "推送测试",
      dataIndex: "pushText",
    },
    {
      title: "止损数量",
      dataIndex: "stop_loss_num",
    },

    {
      title: "止盈数量",
      dataIndex: "stop_profit_num",
    },

    {
      title: "操作",
      dataIndex: "remark",
      render: (value: string, record: any) => {
        const { route } = this.props;
        return (
          <div>
            <Button type="link" className="margin_right_10">
              <Link
                to={{ pathname: `${route.path}/show` }}
                search={{ id: record.id }}
              >
                查看
              </Link>
            </Button>
            {/* <Button type='link' className='margin_right_10' onClick={this.editOnClick(record)}>编辑</Button> */}
            <Button
              type="link"
              className="margin_right_10"
              onClick={this.stopOrStart({ record, type: "1" })}
            >
              启动
            </Button>
            <Button
              type="link"
              className="margin_right_10"
              onClick={this.stopOrStart({ record, type: "2" })}
            >
              停止
            </Button>
          </div>
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

  private stopOrStart = (options: { record: any; type: "1" | "2" }) => {
    return () => {
      const { record, type } = options;
      const { actions } = this.props;
      const map = {
        1: {
          content: "确定启动该策略么?",
          url: "strategy/start",
        },
        2: {
          content: "确定停止该策略么?",
          url: "strategy/stop",
        },
      };

      Modal.confirm({
        title: "确认提示",
        content: map[type].content,
        onOk: () => {
          actions.get(map[type].url, record);
        },
      });
    };
  };

  private toggle = (key: "isShow", value = false) => {
    return () => {
      this.setState({
        [key]: value,
      });
    };
  };

  public render() {
    return (
      <div>
        <PageList
          {...this.props}
          url={linkPort.strategyList}
          tableComponentProps={{ columns: this.row }}
          showSearch={false}
        />
      </div>
    );
  }
}
