import React from "react";
import { PageList } from "@components/index";
import linkPort from "@src/boss/config/api"; // 注意: 不是boss项目的请修改路径
import { connect } from "@containers/appScreen";
import IProps from "@typings/react.d";
import { constants } from "@utils/index";

import "./index.less";

const width = 80;

const list = constants.intervals.map((item) => {
  return {
    value: item,
    label: item,
  };
});

const render = (value: string) => {
  return <div className="item" style={{ background: value }} />;
};
@connect()
export default class App extends React.PureComponent<IProps> {
  private row: any = [
    {
      title: "币种",
      dataIndex: "symbol",
      align: "center",
      width,
    },
    {
      title: "当前价格",
      dataIndex: "price",
      align: "center",
      width,
    },
    {
      title: "趋势",
      dataIndex: "qushi",
      children: [
        {
          title: "1m",
          dataIndex: "1m_trend",
          width,
          render,
        },
        {
          title: "3m",
          dataIndex: "3m_trend",
          width,
          render,
        },
        {
          title: "3m",
          dataIndex: "3m_trend",
          width,
          render,
        },
        // {
        //   title: "5m",
        //   dataIndex: "5m_trend",
        //   width,
        //   render,
        // },
        {
          title: "15m",
          dataIndex: "15m_trend",
          width,
          render,
        },
        {
          title: "30m",
          dataIndex: "30m_trend",
          width,
          render,
        },
        {
          title: "1h",
          dataIndex: "1h_trend",
          width,
          render,
        },
        {
          title: "4h",
          dataIndex: "4h_trend",
          width,
          render,
        },
        {
          title: "12h",
          dataIndex: "12h_trend",
          width,
          render,
        },
        {
          title: "1d",
          dataIndex: "1d_trend",
          width,
          render,
        },
        {
          title: "1w",
          dataIndex: "1w_trend",
          width,
          render,
        },
      ],
    },
    {
      title: "乖离",
      dataIndex: "guaili",
      children: [
        {
          title: "cs",
          dataIndex: "cs",
          width,
        },
        {
          title: "sm",
          dataIndex: "sm",
          width,
        },
        {
          title: "ml",
          dataIndex: "ml",
          width,
        },
      ],
    },
  ];

  private searchRow: any[] = [
    {
      title: "周期",
      dataIndex: "period",
      type: "select",
      list,
    },
    {
      title: "校验类型",
      dataIndex: "s_type",
      type: "select",
      // 现货:1,合约:3
      list: [
        {
          value: "1",
          label: "现货",
        },
        {
          value: "3",
          label: "合约",
        },
      ],
    },
    {
      title: "币种",
      dataIndex: "symbol",
      type: "select",
      // 现货:1,合约:3
      eleAttr: {
        mode: "tags",
      },
    },
  ];
  public render() {
    return (
      <div className="iconSelectList">
        <PageList
          {...this.props}
          method="post"
          initOption={{
            isFirst: false,
          }}
          url={linkPort.excel_data}
          tableComponentProps={{
            columns: this.row,
            isChangePageRequest: false,
            pagination: false,
          }}
          groupSearchProps={{
            isShowResetBtn: true,
            rowData: this.searchRow,
          }}
        />
      </div>
    );
  }
}
