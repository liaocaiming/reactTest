import React from 'react';
import { PageList } from '@components/index';
import linkPort from '@src/hTrade/config/api'; // 注意: 不是boss项目的请修改路径
import { connect } from '@containers/appScreen';
import IProps from '@typings/react.d';
import { Button, Modal } from 'antd';
import UserModal from './UserModal';
import { constants } from '@utils/index'
import './index.less';
import { Link } from '@components/index';

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
      title: '币安id',
      dataIndex: 'biance_id',
      isSearch: true,
    },

    {
      title: '机器人开始时间',
      dataIndex: 'startTime',
      isSearch: true,
    },
    {
      title: '机器人结束时间',
      dataIndex: 'endTime',
      isSearch: true,
    },

    {
      title: <span className='tips'>.异常</span>,
      dataIndex: 'endTime',
      type: 'select',
      list: [
        {
          value: '1',
          label: '资金转出'
        },
        {
          value: '2',
          label: '私自开单'
        }
      ],
      isSearch: true,
    },

    {
      title: '持有单数',
      dataIndex: 'holder_num',
    },

    {
      title: '是否体验用户',
      dataIndex: 'is_experience_user',
      isSearch: true,
      type: 'select',
      list: constants.isOrNot
    },

    {
      title: '是否会员',
      dataIndex: 'is_pay_member',
    },
    {
      title: '盈利金额',
      dataIndex: 'profit_money',
    },
    {
      title: '盈利单数',
      dataIndex: 'profit_num',
    },
    {
      title: '亏损单数',
      dataIndex: 'loss_num',
    },
    {
      title: '初始资金',
      dataIndex: 'original_money',
    },
    {
      title: '每单的U数量',
      dataIndex: 'every_money',
    },


    {
      title: '备注',
      dataIndex: 'remark'
    },
    {
      title: '操作',
      dataIndex: 'remark',
      render: (val: string, item: any) => {
        const { route } = this.props;
        return (
          <div>
            <Button type='link' className='margin_right_10'><Link to={{ pathname: `${route.path}/show` }} search={{ id: item.id }} >查看</Link></Button>
            <Button type='link' onClick={this.toggle({ key: 'isShow', value: true, item, operateType: 'edit' })}>编辑</Button>
            <Button type='link' className='margin_right_10' onClick={this.stopOrStart({ record: item, type: '1' })}>启动</Button>
            <Button type='link' className='margin_right_10' onClick={this.stopOrStart({ record: item, type: '2' })}>停止</Button>
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

  private stopOrStart = (options: { record?: any, type: '1' | '2' | '3' | '4' }) => {
    return () => {
      const { record = {}, type } = options;
      const { actions } = this.props
      const map = {
        1: {
          content: '确定启动该用户么?',
          url: 'strategy/start',
        },
        2: {
          content: '确定停止该用户么?',
          url: 'strategy/stop',
        },
        3: {
          content: '确定启动所有用户么?',
          url: 'strategy/start',
        },
        4: {
          content: '确定停止所有用户么?',
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


  private renderAllBtnContent = () => {
    return <div className='margin_bottom_20'>
      <Button className='margin_right_20' type='primary' onClick={this.stopOrStart({ type: '3' })}>启用所有用户</Button>

      <Button type='ghost' danger onClick={this.stopOrStart({ type: '4' })}>停用所有用户</Button>
    </div>
  }

  render() {
    return (
      <div className='robotFollowList'>
        {this.renderAllBtnContent()}
        <PageList
          {...this.props}
          url={linkPort.robotFollowList}
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