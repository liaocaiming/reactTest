import React from 'react';
import { PageList } from '@components/index';
import linkPort from '@src/hTrade/config/api'; // 注意: 不是boss项目的请修改路径
import { connect } from '@containers/appScreen';
import IProps from '@typings/react.d';
import { Button } from 'antd';
import UserModal from './UserModal';
interface IState {
  isShow?: boolean;
  [key: string]: any
}

@connect()
export default class App extends React.PureComponent<IProps, IState> {
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
      title: '备注',
      dataIndex: 'remark'
    },
    // {
    //   title: '操作',
    //   dataIndex: 'remark',
    //   render: () => {
    //     return (
    //       <div>
    //         <Button type='link' className='margin_right_10'>查看</Button>
    //         <Button type='link'>编辑</Button>
    //       </div>
    //     )
    //   }
    // }
  ];

  constructor(props: IProps) {
    super(props);
    this.state = {
      isShow: false
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

    return <UserModal actions={actions} visible={isShow} onCancel={this.toggle('isShow', false)} />
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