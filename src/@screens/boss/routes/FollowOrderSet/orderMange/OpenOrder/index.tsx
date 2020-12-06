import React from "react";

import { AppForm } from "@components/index";

import { AppFormItemOptions } from "@components/AppForm/interface";

import { connect } from "@containers/appScreen";

import { api } from "@src/config/boss";

import { openOrderType } from "./constants";

import { Button } from "antd";

const width = 200;

interface IState {
  symbolList: any[];
  batchArr: number[]; // 批次开单
  EMAArr: number[]; // 均线开单, ema和ma;
  type: "batch" | "EMA" | "MA";
}

const defaultEMAArr = [100, 120, 144, 169, 200];
const defaultBatchArr = [1, 2, 3];

@connect()
export default class App extends React.PureComponent<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      symbolList: [],
      batchArr: defaultBatchArr,
      EMAArr: defaultEMAArr,
      type: "batch",
    };
  }

  public componentDidMount() {
    this.getData();
  }

  public getFormData = (arr: number[]): AppFormItemOptions[] => {
    const { type } = this.state;
    const list: AppFormItemOptions[] = arr.map(
      (item: number, index: number) => {
        let label = `${type}_${item}`;
        if (type === 'batch') {
          label = `第${index + 1}批`
        }

        return {
          name: `${type}_${item}`,
          label,
          eleAttr: {
            placeholder: '请输入',
            style: {
              width: 150,
            },
          },
          afterDOM: <span className='margin_left_10'>usdt</span>
        };
      }
    );
    return list;
  };


  public renderForm = () => {
    const { batchArr, EMAArr, type } = this.state;

    let data: AppFormItemOptions[] = []

    if (type === 'batch') {
      data = this.getFormData(batchArr)
    } else {
      data = this.getFormData(EMAArr);
    }

    const formData: AppFormItemOptions[] = [
      {
        name: "orderType",
        label: "开单方式",
        type: "select",
        list: openOrderType,
        initialValue: "batch",
        eleAttr: {
          onChange: (e: any) => {
            this.setState({
              type: e,
            });
          },
          style: {
            width,
          },
        },
      },
    ];

    return (
      <AppForm
        formItems={[...formData, ...data ]}
        labelCol={{ span: 3 }}
        submitButton={{
          text: "确定",
          type: "primary",
          style: { marginRight: 20 },
        }}
        onFinish={this.onFinish}
      ></AppForm>
    );
  };

  public getData = () => {
    const { actions } = this.props;
    actions.get(api.realtime, {}, { showLoading: false }).then((res: any) => {
      if (res) {
        this.setState({
          symbolList: res,
        });
      }
    });
  };

  public onFinish = (params: any) => {
    console.log(params);
  };

  public render() {
    return (
      <div style={{ width: 800 }}>
        <h4>开单</h4>
        {this.renderForm()}
      </div>
    );
  }
}
