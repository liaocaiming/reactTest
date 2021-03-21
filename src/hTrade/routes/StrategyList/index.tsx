import React from 'react';
import { PageList } from '@components/index';
import linkPort from '@src/hTrade/config/api'; // 注意: 不是boss项目的请修改路径
import { connect } from '@containers/appScreen';
import IProps from '@typings/react.d';
import { Button, Modal } from 'antd';
import StrategyItem from './StrategyItem';
interface IState {
  isShow?: boolean;
  [key: string]: any
}

@connect()
export default class App extends React.PureComponent<IProps, IState> {
  private changeItem = {};

  private row = [
    {
      title: '策略名称',
      dataIndex: 'strategyName',
      isSearch: true,
    },
    {
      title: '策略类型',
      dataIndex: 'strategyTypeName',
      searchDataIndex: 'strategyType',
      type: 'select',
      isSearch: true,
    },
    {
      title: '交易量',
      dataIndex: 'tradingVolume',
    },

    {
      title: '涨幅',
      dataIndex: 'upRate',
    },

    {
      title: '时间周期',
      dataIndex: 'time',
    },

    {
      title: 'ema',
      dataIndex: 'ema',
    },


    {
      title: '备注',
      dataIndex: 'remark'
    },
    {
      title: '操作',
      dataIndex: 'remark',
      render: (value: string, record: any) => {
        return (
          <div>
            <Button type='link' className='margin_right_10'>查看</Button>
            <Button type='link' className='margin_right_10' onClick={this.editOnClick(record)}>编辑</Button>
            <Button type='link' className='margin_right_10' onClick={this.stopOrStart({ record, type: '1' })}>启动</Button>
            <Button type='link' className='margin_right_10' onClick={this.stopOrStart({ record, type: '2' })}>停止</Button>
          </div>
        )
      }
    }
  ];

  constructor(props: IProps) {
    super(props);
    this.state = {
      isShow: false
    }
  }

  private stopOrStart = (options: { record: any, type: '1' | '2' }) => {
    return () => {
      const { record, type } = options;
      const { actions } = this.props
      const map = {
        1: {
          content: '确定启动该策略么?',
          url: 'strategy/start',
        },
        2: {
          content: '确定停止该策略么?',
          url: 'strategy/stop',
        }
      }

      Modal.confirm({
        title: '确认提示',
        content: map[type].content,
        onOk: () => {
          actions.get(map[type].url, record)
        }
      })
    }
  }


  private editOnClick = (record: any) => {
    return () => {
      this.changeItem = record;
      this.toggle('isShow', true)();
    }
  }

  private toggle = (key: 'isShow', value = false) => {
    return () => {
      this.setState({
        [key]: value
      })
    }
  }

  private renderBtn = () => {
    return (
      <Button type='primary' className='margin_left_20' onClick={this.toggle('isShow', true)}>新增</Button>
    )
  }

  private renderModal = () => {
    const { actions } = this.props;
    const { isShow } = this.state;

    return <StrategyItem detail={this.changeItem} actions={actions} visible={isShow} onCancel={this.toggle('isShow', false)} />
  }


  public render() {
    return (
      <div>
        <PageList
          {...this.props}
          url={linkPort.role}
          tableComponentProps={{ columns: this.row }}
          groupAfterDom={this.renderBtn()}
          groupSearchProps={{
            isShowResetBtn: true,
            rowData: this.row as any
          }}
        />
        {this.renderModal()}
      </div>
    );
  }
}