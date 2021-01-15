import React from "react";
import linkPort from "@src/boss/config/api"; // 注意: 不是boss项目的请修改路径
import { connect } from "@containers/appScreen";
import IProps from "@typings/react.d";
import { constants, socket } from "@utils/index";
import { GroupSearch, TableComponent } from "@components/index";

import "./index.less";

const width = 80;

const list = constants.intervals.map((item) => {
  return {
    value: item,
    label: item,
  };
});

const render = (value: string) => {
  const isWhite = value === "#ffffff" ? "1px solid #ccc" : `1px solid ${value}`;
  return (
    <div className="item" style={{ background: value, border: isWhite }} />
  );
};

interface IState {
  list: any[];
}

@connect()
export default class App extends React.PureComponent<IProps, IState> {
  private wss: WebSocket;

  private symbolMap = {}; // 记录每一个币在数组中的index, websocket的时候好处理

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

  constructor(props: IProps) {
    super(props);
    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    this.socketStart();
  }

  componentWillUnmount() {
    this.wss.close();
  }

  private socketStart = () => {
    this.wss = socket({
      url: "ws://47.74.250.66/cable",
      channel: "TrendDataChannel",
      message: (data: any) => {
        const list = this.state.list.slice();
        const { message = {} } = data || {};
        const { symbol } = message;
        const index = this.symbolMap[symbol];

        if (list.length > 0 && symbol && index !== undefined && list[index]) {
          list[index] = message;
          this.setState({
            list,
          });
        }
      },
    });
  };

  private handleSearch = (params: any) => {
    this.getListData(params);
  };

  private getListData = (params: any) => {
    const { actions } = this.props;
    actions.post(linkPort.excel_data, params).then((res) => {
      const { data = [] } = res || {};
      if (data.length > 0) {
        const symbols: any[] = [];
        data.forEach((item, index: number) => {
          const { symbol } = item;
          this.symbolMap[symbol] = index;
          symbols.push(symbol);
        });

        const obj = {
          channel: "TrendDataChannel",
          ...params,
          symbol: symbols,
        };

        const query = {
          command: "subscribe",
          identifier: JSON.stringify(obj),
        };

        const msg = JSON.stringify(query);

        this.wss.send(msg);

        this.setState({
          list: data,
        });
      }
    });
  };

  renderGroupSearch = () => {
    return (
      <div>
        <GroupSearch
          isShowResetBtn
          handleSearch={this.handleSearch}
          rowData={this.searchRow}
        />
      </div>
    );
  };

  renderTable = () => {
    const { list } = this.state;
    return (
      <div>
        <TableComponent
          columns={this.row}
          pagination={false}
          dataSource={list}
        />
      </div>
    );
  };

  public render() {
    return (
      <div className="iconSelectList">
        {this.renderGroupSearch()}
        {this.renderTable()}
      </div>
    );
  }
}
