import React from "react";
import { PageList } from "@components/index";
import linkPort from "@src/hTrade/config/api"; // 注意: 不是boss项目的请修改路径
import { connect } from "@containers/appScreen";
import IProps from "@typings/react.d";
import DetaiModal from "./DetaiModal";
import { AppForm } from "@components/index";
import { AppFormItemOptions } from "@components/AppForm/interface.d";
import { constants, helpers, query } from "@utils/index";
import { Chart } from "@antv/g2";
import chartData from "./chartData";
import api from "@src/hTrade/config/api";
import './index.less';

interface IState {
  isShow: boolean;
  detail: any;
  profitList: any[];
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
      dataIndex: "symbol",
      title: "币种",
      isSearch: true,
    },
    {
      dataIndex: "mul",
      title: "倍数",
    },

    {
      dataIndex: "orderType",
      title: "订单类型",
      type: 'select',
      isSearch: true,
      list: [

        {
          value: 1,
          label: '合约'
        },
        {
          value: 2,
          label: ' 现货'
        }
      ]
    },

    {
      dataIndex: "strategyType",
      title: "策略类型",
      type: 'select',
      isSearch: true,
      list: [
        {
          value: 101,
          label: '101'
        }
      ]
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
            查看
          </a>
        );
      },
    },
  ];

  private searchParams = {};

  constructor(props: IProps) {
    super(props);
    this.state = {
      isShow: false,
      detail: {},
      profitList: [],
    };

    this.searchParams = query.getUrlQuery();
    console.log(this.searchParams, "this.searchParams");
  }

  componentDidMount() {
    this.getDetail();
    this.getProfitList();
  }

  private getDetail = () => {
    const { actions } = this.props;
    actions.get(api.userDetail, this.searchParams).then((res) => {
      if (res.code === 200 || res.code === 300) {
        this.setState({
          detail: res.data || {},
        });
      }
    });
  };

  private getProfitList = () => {
    const { actions } = this.props;
    actions.get(api.userProfitList, this.searchParams).then((res) => {
      if (res.code === 200 || res.code === 300) {
        this.renderProfitChart(res.data || []);
      }
    });
  };

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

  private renderBaseInfo = (detail: any) => {
    const editable = false;
    const rowData: AppFormItemOptions[] = [
      {
        label: "邮箱名称",
        name: "email",
        editable,
      },
      {
        label: "币安id",
        name: "biance_id",
        editable,
      },

      {
        label: "机器人开始时间",
        name: "startTime",
        editable,
      },
      {
        label: "机器人结束时间",
        name: "endTime",
        editable,
      },

      {
        label: "持有单数",
        name: "holder_num",
        editable,
      },

      {
        label: "是否体验用户",
        name: "is_experience_user",
        type: "select",
        list: constants.isOrNot,
        editable,
      },

      {
        label: "是否会员",
        name: "is_pay_member",
        editable,
      },
      {
        label: "盈利金额",
        name: "profit_money",
        editable,
      },
      {
        label: "盈利单数",
        name: "profit_num",
        editable,
      },
      {
        label: "亏损单数",
        name: "loss_num",
        editable,
      },
      {
        label: "初始资金",
        name: "original_money",
        editable,
      },
      {
        label: "每单的U数量",
        name: "every_money",
        editable,
      },

      {
        label: "备注",
        name: "remark",
        editable,
      },
    ];

    return (
      <AppForm
        formItems={rowData}
        submitButton={null}
        colSpan={3}
        updateStore={detail}
        initialValues={detail}
      />
    );
  };

  private renderProfitChart = (list: any[]) => {
    let data = list;
    if (data.length === 0) {
      data = chartData;
    }

    const chart = new Chart({
      container: "container",
      autoFit: true,
      height: 300,
    });

    chart.data(data);
    chart.scale({
      money: {
        nice: true,
      },
    });

    chart.tooltip({
      showCrosshairs: true,
      shared: true,
    });

    chart.axis("money", {
      label: {
        formatter: (val) => {
          return val + "USDT";
        },
      },
    });

    chart
      .line()
      .position("date*money")
      .color("#0fbf3c")
      .shape("smooth");

    chart.render();
  };

  private renderDetailModal = () => {
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
    const { detail } = this.state;
    return (
      <div className='robotFollow-detail'>
        <div className="margin_bottom_20 line">
          <h3>基本信息</h3>
          {this.renderBaseInfo(detail)}
        </div>

        <div className="margin_bottom_20 line">
          <h3>总收益曲线图</h3>
          <div id="container" />
        </div>

        <div>
          <h3>订单详情</h3>
          <PageList
            {...this.props}
            url={linkPort.strategyOrderList}
            tableComponentProps={{ columns: this.row }}
            groupSearchProps={{
              isShowResetBtn: true,
            }}
          />

          {this.renderDetailModal()}
        </div>
      </div>
    );
  }
}
