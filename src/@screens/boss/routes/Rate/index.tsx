import * as React from "react";

import { connect } from "@shared/containers/appScreen";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
  LabelList
} from "recharts";

interface IProps {
  [random: string]: any;
}

interface IList {
  date_time: number;
  close?: number;
  rate?: number;
}

interface IState {
  rateData: IList[];
}

@connect()
export default class App extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      rateData: [],
    };
  }

  public componentDidMount() {
    this.getData();
    setTimeout(() => {
      this.getData();
    }, 10000);
  }

  public getData = () => {
    const { actions } = this.props;
    actions.get(`/api/realtime`).then((res: any) => {
      this.setState({
        rateData: res || [],
      });
    });
  };

  public renderBarChart = (
    data: any[],
    YDataKey: "rate" | "lastFundingRate" = "lastFundingRate"
  ) => {
    if (!Array.isArray(data)) {
      return <span>没有数据</span>;
    }

    const res = data.map((item: any) => {
      return {
        ...item,
        lastFundingRate: item.lastFundingRate * 100,
      };
    });

 
    return (
      <BarChart
        width={2800}
        height={600}
        data={res}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
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

  public render() {
    const { rateData = [] } = this.state;
    return (
      <div
        style={{
          width: "100%",
          overflowX: "auto",
          position: "relative",
        }}
      >
        <div style={{ padding: "200px 50px 50px 50px", overflow: "auto" }}>
          <div style={{ marginBottom: 20 }}>币安汇率</div>
          {this.renderBarChart(rateData, "lastFundingRate")}
        </div>
      </div>
    );
  }
}
