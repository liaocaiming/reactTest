import React from "react";
import { PageList } from "@components/index";
import linkPort from "@src/hTrade/config/api"; // 注意: 不是boss项目的请修改路径
import { connect } from "@containers/appScreen";
import IProps from "@typings/react.d";
import { Button } from "antd";
import { Link } from "@components/index";
import AddModal from "./AddModal";
import EditModal from "./EditModal";

import { s_type, period_type, set_type } from "@src/hTrade/constants";
import { isOrNot } from "@utils/lib/constants";

interface IState {
  isShow?: boolean;
  isShowAddModal?: boolean;
  isShowEditModal?: boolean;
  [key: string]: any;
}

@connect()
export default class App extends React.PureComponent<IProps, IState> {
  private changeItem: any = {};

  private row: any = [
    {
      title: "策略名称",
      dataIndex: "name",
    },

    {
      title: "交易类型",
      dataIndex: "set_type",
      showList: true,
      type: "select",
      list: set_type,
    },

    {
      title: "推送类型",
      dataIndex: "s_type",
      showList: true,
      type: "select",
      list: s_type,
    },

    {
      title: "周期",
      dataIndex: "period_type",
      showList: true,
      type: "select",
      list: period_type,
    },

    {
      title: "止损数量",
      dataIndex: "loss_sum",
    },

    {
      title: "止盈数量",
      dataIndex: "success_sum",
    },

    {
      title: "是否推送",
      dataIndex: "start",
      showList: true,
      type: "select",
      list: isOrNot,
    },
    {
      title: "是否推送至机器人",
      dataIndex: "push_bot",
      showList: true,
      type: "select",
      list: isOrNot,
    },

    {
      title: "是否推送至soso",
      dataIndex: "push_soso",
      showList: true,
      type: "select",
      list: isOrNot,
    },

    {
      title: "是否推送到app",
      dataIndex: "push_app",
      showList: true,
      type: "select",
      list: isOrNot,
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
            <Button
              type="link"
              className="margin_right_10"
              onClick={this.toggle("isShowEditModal", true, record)}
            >
              编辑
            </Button>

            <Button
              type="link"
              className="margin_right_10"
              onClick={this.toggle("isShowAddModal", true, record)}
            >
              新增手动推单
            </Button>

            {/* <Button
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
            </Button> */}
          </div>
        );
      },
    },
  ];

  constructor(props: IProps) {
    super(props);
    this.state = {
      isShow: false,
      isShowAddModal: false,
      isShowEditModal: false,
    };
  }

  // private stopOrStart = (options: { record: any; type: "1" | "2" }) => {
  //   return () => {
  //     const { record, type } = options;
  //     const { actions } = this.props;
  //     const map = {
  //       1: {
  //         content: "确定启动该策略么?",
  //         url: "strategy/start",
  //       },
  //       2: {
  //         content: "确定停止该策略么?",
  //         url: "strategy/stop",
  //       },
  //     };

  //     Modal.confirm({
  //       title: "确认提示",
  //       content: map[type].content,
  //       onOk: () => {
  //         actions.get(map[type].url, record);
  //       },
  //     });
  //   };
  // };

  private toggle = (
    key: "isShow" | "isShowAddModal" | "isShowEditModal",
    value = false,
    item: any = {}
  ) => {
    return () => {
      this.changeItem = item;
      this.setState({
        [key]: value,
      });
    };
  };

  private renderAddModal = () => {
    const { isShowAddModal } = this.state;
    if (!isShowAddModal) {
      return null;
    }
    return (
      <AddModal
        onCancel={this.toggle("isShowAddModal", false)}
        actions={this.props.actions}
        detail={this.changeItem}
      />
    );
  };

  private renderEditModal = () => {
    const { isShowEditModal } = this.state;
    const { actions } = this.props;
    if (!isShowEditModal) {
      return null;
    }
    return (
      <EditModal
        onCancel={this.toggle("isShowEditModal", false)}
        actions={actions}
        detail={this.changeItem}
        onSuccess={() => {
          actions.changeScreenQuery({
            page: 1,
          });
          actions.getScreenData();
          this.toggle("isShowEditModal", false)();
        }}
      />
    );
  };

  public render() {
    return (
      <div>
        <PageList
          {...this.props}
          url={linkPort.trade_signals}
          tableComponentProps={{ columns: this.row }}
          showSearch={false}
        />

        {this.renderAddModal()}
        {this.renderEditModal()}
      </div>
    );
  }
}
