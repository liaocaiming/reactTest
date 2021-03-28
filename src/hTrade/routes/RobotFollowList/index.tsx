import React from 'react';
import { PageList } from '@components/index';
import linkPort from '@src/hTrade/config/api'; // 注意: 不是boss项目的请修改路径
import { connect } from '@containers/appScreen';
import IProps from '@typings/react.d';
import { Button, Modal } from 'antd';
import UserModal from './UserModal';
import { Link } from 'react-router-dom';
interface IState {
  isShow?: boolean;
  [key: string]: any
}

@connect()
export default class App extends React.PureComponent<IProps, IState> {
  private changeItem = {};

  private row = [
    {
      title: '用户名称',
      dataIndex: 'userName',
      isSearch: true,
    },
    {
      title: '币安id',
      dataIndex: 'biance_id',
      isSearch: true,
    },

    {
      title: '用户状态',
      dataIndex: 'status',
      type: 'select',
      isSearch: true,
    },

    {
      title: '总收益',
      dataIndex: 'money',
    },

    {
      title: '是否开启自动交易',
      dataIndex: 'openAutoTade',
    },

    {
      dataIndex: 'limitMoney',
      title: '每单金额',
    },

    {
      title: '备注',
      dataIndex: 'remark'
    },

    {
      title: '用户状态',
      dataIndex: 'status',
      type: 'select',
      isSearch: true,
    },

    {
      title: '操作',
      dataIndex: 'remark',
      render: (value: string, record: any) => {

        const { route } = this.props;
        return (
          <div>
            <Button type='link' className='margin_right_10'><Link to={{ pathname: `${route.path}/show` }}>查看</Link></Button>
            <Button type='link' onClick={this.editOnClick(record)}>编辑</Button>
            <Button type='link' className='margin_right_10' onClick={this.stopOrStart({ record, type: '1' })}>启动</Button>
            <Button type='link' className='margin_right_10' onClick={this.stopOrStart({ record, type: '2' })}>停止</Button>
          </div>
        )
      }
    }
  ];

  constructor(props: IProps) {
    super(props);
    console.log(props, 'props');

    this.state = {
      isShow: false
    }
  }


  private editOnClick = (record: any) => {
    return () => {
      this.changeItem = record;
      this.toggle('isShow', true)();
    }
  }


  private stopOrStart = (options: { record: any, type: '1' | '2' }) => {
    return () => {
      const { record, type } = options;
      const { actions } = this.props
      const map = {
        1: {
          content: '确定启动该用户么?',
          url: 'strategy/start',
        },
        2: {
          content: '确定停止该用户么?',
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

  private renderBtn = () => {
    return (
      <Button type='primary' className='margin_left_20' onClick={this.toggle('isShow', true)}>新增</Button>
    )
  }

  private renderModal = () => {
    const { actions } = this.props;
    const { isShow } = this.state;

    return <UserModal detail={this.changeItem} actions={actions} visible={isShow} onCancel={this.toggle('isShow', false)} />
  }

  private toggle = (key: 'isShow', value = false) => {
    return () => {
      this.setState({
        [key]: value
      })
    }
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