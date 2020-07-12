import * as React from "react";

import { connect } from "@shared/containers/appScreen";

import { Card, message } from "antd";

import "./index.less";

import { GroupSearch, TableComponent, Toggle } from "@components/index";

import {
  intervals,
  types,
  indicators,
  defaultTableRows,
  searchRows,
  filterTypes,
  coinTypes
} from "./constants";

import { add, sub } from "@utils/lib/calculate";

import { reactClassNameJoin } from '@utils/lib/helpers'

import IProps from "@typings/react.d";

import { api } from "@src/config/boss/";

interface IRow {
  title: string;
  dataIndex: string;
}

interface IState {
  rows: IRow[];
  list: any[];
}

@connect()
export default class App extends React.PureComponent<IProps, IState> {
  private indicators = [];

  constructor(props: IProps) {
    super(props);
    this.state = {
      rows: defaultTableRows,
      list: [],
    };
  }

  public componentDidMount() {
    // this.getList();
  }

  private getList(params: any) {
    const { actions } = this.props;
    actions.get(`${api.get_indicators}`, params).then((data: any[]) => {
      const { indicators, filterType } = params;
      const arr = indicators.toString().match(/(\d+)/g);
      const max = Math.max.apply(null, arr);
      // const min = Math.min.apply(null, arr);
      const maxKey = indicators.find((key: string) => key.indexOf(max) >= 0);
      // const minKey = indicators.find((key: string) => key.indexOf(min) >= 0);

      let res: any[] = [];

      data.forEach((item: any) => {
        const { price = [] } = item || {};
        const [first = {}] = price || [];
        const { close } = first;
        const maxValue = item[maxKey];
        let obj = {};
        let is = true;
        indicators.forEach((key: string) => {
          if (item[key] === null || item[key] === undefined) {
            is = false;
          }
          if (maxKey !== key) {
            if (String(filterType) === "1") {
              // 上穿
              if (sub(item[key], maxValue) < 0) {
                is = false;
              }
              // 1: "上穿",  2: "下穿",
            } else if (String(filterType) === "2") {
              if (sub(item[key], maxValue) > 0) {
                is = false;
              }
            } else {
            }
          }
          Object.assign(obj, {
            [`${key}_price`]: sub(close, item[key]),
            close
          });
        });

        if (is) {
          res.push({ ...item, ...obj });
        }
      });

      this.setState({
        list: res,
      });
    });
  }

  private handleSearch = (options: any) => {
    let rows = defaultTableRows.slice();
    if (!options.interval) {
      message.warn("请选择周期");
      return;
    }

    if (!options.indicators) {
      message.warn("请选择指标");
      return;
    }
    if (
      JSON.stringify(options.indicators) !== JSON.stringify(this.indicators)
    ) {
      this.indicators = options.indicators;
      const indicators = this.indicators.map((it: string) => {
        return {
          title: it,
          dataIndex: it,
          render: (value: number, item: any) => {
            const diff = item[`${it}_price`];
            return (
              <div>
                <span>{value}</span>
                <Toggle isShow={diff}>
                  <span className={reactClassNameJoin([diff > 0 ? 'green' : 'red', 'diff']) }>({diff > 0 ? `+${diff}` : diff })</span>
                </Toggle>
              </div>
            );
          },
        };
      });
      rows = rows.concat(indicators);

      this.setState(
        () => {
          return { rows };
        },
        () => {
          this.getList(options);
        }
      );
    }

    this.getList(options);
  };

  private renderSearch() {
    return (
      <GroupSearch
        rowData={searchRows}
        handleSearch={this.handleSearch}
        selectKeys={["indicators"]}
        defaultValues={{
          coinType: 'usdt'
        }}
        selectMap={{
          filterType: filterTypes,
          interval: intervals,
          type: types,
          indicators,
          coinType: coinTypes
        }}
      />
    );
  }

  private renderTable() {
    const { rows, list } = this.state;
    return <TableComponent dataSource={list} columns={rows} />;
  }

  public render() {
    return (
      <Card className="bestCoinList">
        {this.renderSearch()}
        {this.renderTable()}
      </Card>
    );
  }
}
