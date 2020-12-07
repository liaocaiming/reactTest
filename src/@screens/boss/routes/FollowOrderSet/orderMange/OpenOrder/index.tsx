import React from "react";

import { AppForm } from "@components/index";

import { AppFormItemOptions } from "@components/AppForm/interface";

import { connect } from "@containers/appScreen";

import { api } from "@src/config/boss";

import { openOrderType } from "./constants";

import { PlusOutlined } from '@ant-design/icons';

import creatArrayByLen from "@utils/lib/creatArrayByLen";
import { Button, Modal } from "antd";

const width = 200;

const multiple = (num) => {
  return creatArrayByLen(num).map((item) =>{
    return  { value: item, label: `${item} 倍` }
  })
}

interface IState {
  symbolList: any[];
  batchArr: number[]; // 批次开单
  EMAArr: number[]; // 均线开单, ema和ma;
  type: "batch" | "EMA" | "MA";
  [key: string]: any;
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
        name: "multiple",
        label: '开单倍数',
        type: "select",
        list: multiple(50),
        initialValue: 10,
        eleAttr: {
          style: {
            width,
          },
        },
      },

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

      ...data,

      {
        name: 'add',
        render: () => {
          return <Button style={{ marginLeft: 50 }} ><PlusOutlined /></Button>
        }
      }
    ];

    return (
      <AppForm
        formItems={formData}
        labelCol={{ span: 3 }}
        submitButton={{
          text: "确定",
          type: "primary",
          style: { marginLeft: 50 },
        }}
        onFinish={this.onFinish}
      ></AppForm>
    );
  };

  private toggleModal = (key: string, value: boolean) => {
    return () => {
      this.setState({
        [key]: value
      })
    }
  }

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
