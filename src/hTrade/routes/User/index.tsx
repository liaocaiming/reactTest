import React from 'react';
import { PageList } from '@components/index';
import linkPort from '@src/hTrade/config/api'; // 注意: 不是boss项目的请修改路径
import { connect } from '@containers/appScreen';
import IProps from '@typings/react.d';
import { Button } from 'antd';
import UserModal from './UserModal';
import { constants } from '@utils/index'

interface IState {
  isShow?: boolean;
  [key: string]: any
}

type OperateType = 'edit' | 'add';

@connect()
export default class App extends React.PureComponent<IProps, IState> {
  private changeItem = {};

  private operateType: OperateType = 'add';

  private row: any = [
    {
      title: '邮箱名称',
      dataIndex: 'email',
      isSearch: true,
    },
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
      title: '注册时间',
      dataIndex: 'addTime',
      isSearch: true,
      type: 'rangePicker',
    },
    {
      title: '邀请人',
      dataIndex: 'invitees',
      isSearch: true,
    },
    {
      title: '是否付费会员',
      dataIndex: 'is_pay_member',
      type: 'selectt',
      list: constants.isOrNot,
      isSearch: true,
    },

    {
      title: '是否体验过的用户',
      dataIndex: 'is_experience_user',
      isSearch: true,
      type: 'select',
      list: constants.isOrNot
    },

    {
      title: '到期时间',
      dataIndex: 'due_day',
      isSearch: true,
      type: 'rangePicker',
    },

    {
      title: '付费类型',
      dataIndex: 'pay_type',
      isSearch: true,
      type: 'rangePicker',
    },

    {
      title: '是否自动机器人',
      dataIndex: 'is_open_robot',
      isSearch: true,
      type: 'select',
      list: constants.isOrNot
    },



    {
      title: '备注',
      dataIndex: 'remark'
    },
    {
      title: '操作',
      dataIndex: 'remark',
      render: (val: string, item: any) => {
        return (
          <div>
            {/* <Button type='link' className='margin_right_10'>查看</Button> */}
            <Button type='link' onClick={this.toggle({ key: 'isShow', value: true, item, operateType: 'edit' })}>编辑</Button>
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
  private renderBtn = () => {
    return (
      <Button type='primary' className='margin_left_20' onClick={this.toggle({ key: 'isShow', value: true, operateType: 'add' })}>新增</Button>
    )
  }

  private renderModal = () => {
    const { actions } = this.props;
    const { isShow } = this.state;

    return <UserModal
      actions={actions}
      visible={isShow}
      onCancel={this.toggle({ key: 'isShow', value: false })}
      operateType={this.operateType}
      detail={this.changeItem}
      onSuccess={() => {
        const { actions } = this.props;
        actions.changeScreenQuery({
          pageNo: 1
        })
        actions.getScreenData();
      }}
    />

  }

  private toggle = (options: { key: 'isShow', value, item?: any, operateType?: OperateType }) => {
    return () => {
      const { key, value, item, operateType } = options;
      if (item) {
        this.changeItem = item
      }

      if (operateType) {
        this.operateType = operateType;
      }
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
          url={linkPort.userList}
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