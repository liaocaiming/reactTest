import React from "react";
import { PageList, Toggle } from "@components/index";
import linkPort from "@src/hTrade/config/api"; // 注意: 不是boss项目的请修改路径
import { connect } from "@containers/appScreen";
import IProps from "@typings/react.d";
import { Button, message, Modal } from "antd";
import UserModal from "./UserModal";
import "./index.less";
import { Link } from "@components/index";
import { userType } from '@src/hTrade/constants';
import { AppForm } from '@components/index';

interface IState {
  isShow?: boolean;
  isShowMoneyRecordModal?: boolean;
  isEdit?: boolean;
  [key: string]: any;
}

type OperateType = "edit" | "add";

@connect()
export default class App extends React.PureComponent<IProps, IState> {
  private changeItem = {};

  private operateType: OperateType = "add";

  private row: any = [
    {
      title: "邮箱名称",
      dataIndex: "email",
      isSearch: true,
    },
    {
      title: "币安uid",
      dataIndex: "binance_user_id",
      isSearch: true,
    },

    {
      title: "机器人创建时间",
      dataIndex: "created_at",
    },
    {
      title: "机器人结束时间",
      dataIndex: "expire_time",
    },

    {
      title: "机器人到期时间",
      dataIndex: "expire_time",
      isSearch: true,
    },

    {
      title: <span className="tips">.异常</span>,
      dataIndex: "error",
      type: "select",
      list: [
        {
          value: "1",
          label: "资金转出",
        },
        {
          value: "2",
          label: "私自开单",
        },
      ],
      isSearch: true,
    },

    {
      title: "用户类型",
      dataIndex: "user_type",
      showList: true,
      isSearch: true,
      type: 'select',
      list: userType
    },

    {
      title: "盈利金额",
      dataIndex: "profit_loss",
    },
    {
      title: "盈利单数",
      dataIndex: "success_sum",
    },
    {
      title: "亏损单数",
      dataIndex: "loss_sum",
    },


    {
      title: "初始资金",
      dataIndex: "original_money",
    },


    {
      title: "每单的U数量",
      dataIndex: "every_money",
    },

    {
      title: '机器人状态',
      dataIndex: 'status'
    },

    {
      title: "备注",
      dataIndex: "remark",
    },
    {
      title: "操作",
      dataIndex: "remark",
      render: (val: string, item: any) => {
        const { route } = this.props;
        return (
          <div>
            <Button type="link" className="margin_right_10">
              <Link
                to={{ pathname: `${route.path}/show` }}
                search={{ id: item.id }}
              >
                查看
              </Link>
            </Button>
            <Button
              type="link"
              onClick={this.toggle({
                key: "isShow",
                value: true,
                item,
                operateType: "edit",
              })}
            >
              编辑
            </Button>
            <Button
              type="link"
              className="margin_right_10"
              onClick={this.stopOrStart({ record: item, type: "1" })}
            >
              启动
            </Button>
            <Button
              type="link"
              className="margin_right_10"
              onClick={this.stopOrStart({ record: item, type: "2" })}
            >
              停止
            </Button>

            <Button
              type="link"
              className="margin_right_10"
            >
              资金记录
            </Button>


          </div>
        );
      },
    },
  ];

  constructor(props: IProps) {
    super(props);
    this.state = {
      isShow: false,
      isEdit: false,
      isShowMoneyRecordModal: false
    };
  }
  private renderBtn = () => {
    return (
      <Button
        type="primary"
        className="margin_left_20"
        onClick={this.toggle({
          key: "isShow",
          value: true,
          operateType: "add",
        })}
      >
        新增
      </Button>
    );
  };

  private stopOrStart = (options: {
    record?: any;
    type: "1" | "2" | "3" | "4";
  }) => {
    return () => {
      const { record = {}, type } = options;
      const { actions } = this.props;
      const map = {
        1: {
          content: "确定启动该用户么?",
          url: linkPort.bots_start_bot,
        },
        2: {
          content: "确定停止该用户么?",
          url: linkPort.bots_stop_bot,
        },
        3: {
          content: "确定启动所有用户么?",
          url: linkPort.bots_start_all_bot,
        },
        4: {
          content: "确定停止所有用户么?",
          url: linkPort.bots_stop_all_bot,
        },
      };

      Modal.confirm({
        title: "确认提示",
        content: map[type].content,
        onOk: () => {
          actions.post(map[type].url, record).then((res) => {
            message.success(res.message || '成功');
            actions.changeScreenQuery({
              pageNo: 1,
            });
            actions.getScreenData();
          });
        },
      });
    };
  };

  private renderModal = () => {
    const { actions } = this.props;
    const { isShow } = this.state;

    return (
      <UserModal
        actions={actions}
        visible={isShow}
        onCancel={this.toggle({ key: "isShow", value: false })}
        operateType={this.operateType}
        detail={this.changeItem}
        onSuccess={() => {
          const { actions } = this.props;
          actions.changeScreenQuery({
            pageNo: 1,
          });
          actions.getScreenData();
        }}
      />
    );
  };

  private toggle = (options: {
    key: "isShow" | 'isEdit';
    value;
    item?: any;
    operateType?: OperateType;
  }) => {
    return () => {
      const { key, value, item, operateType } = options;
      if (item) {
        this.changeItem = item;
      }

      if (operateType) {
        this.operateType = operateType;
      }
      this.setState({
        [key]: value,
      });
    };
  };

  private renderAllBtnContent = () => {
    return (
      <div className="margin_bottom_20">
        <Button
          className="margin_right_20"
          type="primary"
          onClick={this.stopOrStart({ type: "3" })}
        >
          启用所有用户
        </Button>

        <Button type="ghost" danger onClick={this.stopOrStart({ type: "4" })}>
          停用所有用户
        </Button>
      </div>
    );
  };

  private renderEveryAmount = (amount: number) => {
    const { isEdit } = this.state;
    let btnMap: any = {
      text: '保存',
      type: 'text',
      style: {
        color: 'blue',
        marginLeft: 5
      }
    }

    if (!isEdit) {
      btnMap = null
    }
    return (
      <div>
        <AppForm
          layout='horizontal'
          formItems={[
            {
              name: 'amount',
              label: '每单金额',
              editable: isEdit,
              afterDOM: <span className='margin_left_5'>USDT</span>,
              initialValue: amount,
              rules: [
                {
                  required: true,
                  message: '请输入'
                }
              ],
              eleAttr: {
                placeholder: '请输入',
                style: {
                  width: 120
                }
              }
            }
          ]}
          submitButton={btnMap}
          onFinish={this.onFinish}
        >
          <Toggle isShow={!isEdit}>
            <Button type='text' style={{ marginLeft: 5, color: 'blue', }} onClick={this.toggle({ key: 'isEdit', value: true })}>编辑</Button>
          </Toggle>

          <Toggle isShow={isEdit}>
            <Button type='text' style={{ marginLeft: 5, color: 'blue', }} onClick={this.toggle({ key: 'isEdit', value: false })}>取消</Button>
          </Toggle>

        </AppForm>
      </div>
    )
  }

  private onFinish = (params: any) => {
    const { actions } = this.props;

    actions.post(linkPort.bots_update, params).then(() => {
      message.success('修改成功')
      this.setState({
        isEdit: false
      })
    })
  }

  render() {
    return (
      <div className="robotFollowList">
        {this.renderAllBtnContent()}
        {this.renderEveryAmount(1)}

        <PageList
          {...this.props}
          url={linkPort.bots}
          tableComponentProps={{ columns: this.row }}
          groupAfterDom={this.renderBtn()}
          groupSearchProps={{
            isShowResetBtn: true,
            rowData: this.row as any,
          }}
        />
        {this.renderModal()}
      </div>
    );
  }
}
