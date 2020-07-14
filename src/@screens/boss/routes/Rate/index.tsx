import * as React from "react";

import { connect } from "@shared/containers/appScreen";

import dateFormat from "@utils/lib/dateFormat";

import './index.less';

import { api } from '@src/config/boss';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
  LabelList,
  LineChart,
  Line
} from "recharts";

interface IProps {
  [random: string]: any;
}

interface IList {
  time?: number;
  markPrice?: number;
  lastFundingRate?: number;
  symbol?: string;
}

interface IState {
  rateData: IList[];
  selectedData: IList[];
  selectedUsdt: string;
  selectedMap: { [k: string]: IList[] }
}

const map = {}; // 记录页面打开后的数据
@connect()
export default class App extends React.PureComponent<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {
      rateData: [],
      selectedData: [],
      selectedUsdt: '',
      selectedMap: {}
    };
  }

  public componentDidMount() {
    this.getData();
    setInterval(() => {
      this.getData();
    }, 60 * 1000);
  }

  public getData = () => {
    const { actions } = this.props;
    actions.get(api.realtime, {}, { showLoading: false }).then((res: any) => {
      Array.isArray(res) && res.forEach((item:any) => {
        const { symbol } = item;
        if (map[symbol]) {
          if (map[symbol].length > 500) {
            map[symbol].shift();
          }
          map[symbol].push(item)
        } else {
          map[symbol] = [item]
        }
      })

      const { selectedUsdt } = this.state;

      this.setState({
        rateData: res || [],
        selectedData: map[selectedUsdt] || []
      });
    });
  };

  public BarChartOnClick = (e: any) => {
    const { activePayload  = []} = e;
    const { selectedMap } = this.state;
    const [{ payload }] = activePayload;
    const { symbol = "KNCUSDT" }  = payload;

    this.setState({
      selectedData: map[symbol],
      selectedUsdt: symbol,
      selectedMap: {
        ...selectedMap,
        [symbol]: map[symbol]
      }
    })
  }

  public renderBarChart = (
    data: any[],
    YDataKey: "rate" | "lastFundingRate" = "lastFundingRate"
  ) => {
    if (!Array.isArray(data)) {
      return <span>没有数据</span>;
    }

    const res = data.filter((item: any) => Math.abs(item.lastFundingRate) > 0.0001).map((item: any) => {
      return {
        ...item,
        lastFundingRate: item.lastFundingRate * 100,
      };
    }).sort((a, b) => a.lastFundingRate - b.lastFundingRate);

 
    return (
      <BarChart
        width={80 * res.length}
        height={200}
        data={res}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        onClick={this.BarChartOnClick}
      >
        <CartesianGrid strokeDasharray="3 3" />
        {/* <XAxis dataKey="symbol" /> */}
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={YDataKey} fill="#8884d8" ><LabelList dataKey="symbol" position="top" /></Bar>
      </BarChart>
    );
  };


  public renderLineChart = (
    data: any[],
  ) => {
    if (!Array.isArray(data) || data.length == 0) {
      return null;
    }
    const res = data.map((item: any) => {
      return {
        ...item,
        time: dateFormat("YY-MM-DD hh:mm:ss", item.time),
        lastFundingRate: item.lastFundingRate * 100,
      };
    });


    return (
      <LineChart width={500} height={200} data={res}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis  dataKey="time" interval="preserveStart" />
        <YAxis yAxisId="left"  dataKey='lastFundingRate' />
        <YAxis  yAxisId="right"  dataKey='markPrice' orientation="right"  />

        <Tooltip />
        <Legend />
        <Line yAxisId="left" type="monotone" dataKey='lastFundingRate' stroke="orange"  dot=''/>
        <Line yAxisId="right" type="monotone" dataKey='markPrice' stroke="#82ca9d" dot='' />
      </LineChart>
    );
  };


  
  public render() {
    const { rateData = [], selectedData, selectedUsdt } = this.state;
    return (
      <div
        style={{
          width: "100%",
          overflowX: "auto",
          position: "relative",
        }}
      >
        <div style={{ padding: "0 50px 50px 50px", overflow: "auto" }}>
          <h3 style={{ marginBottom: 20 }}>币安汇率</h3>
          {this.renderBarChart(rateData, "lastFundingRate")}
        </div>
        <div style={{ padding: "0 50px 50px 50px", overflow: "auto" }}>
           <h3 style={{ marginTop: 50 }}>选中汇率--价格变化图 <h2 >{selectedUsdt}</h2></h3>
          {this.renderLineChart(selectedData)}
        </div>
      </div>
    );
  }
}
