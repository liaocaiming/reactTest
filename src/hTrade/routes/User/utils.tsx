import { AppFormItemOptions } from '@components/AppForm/interface';

import { constants } from '@utils/index';

interface IOptions {
  width?: number;
  disabled?: boolean;
  operateType?: 'edit' | 'add'
}

export const getFormItems = (options?: IOptions) => {
  const { width = 300, operateType = 'add' } = options || {};
  const disabled = operateType === 'edit';

  const formData: AppFormItemOptions[] = [
    {
      name: 'email',
      label: '邮箱',
      rules: [
        {
          required: true,
          message: '请输入',
          whitespace: true
        }
      ],
      eleAttr: {
        disabled,
        placeholder: '请输入',
        style: {
          width
        }
      }
    },



    {
      name: 'biance_id',
      label: '币安id',
      rules: [
        {
          required: true,
          message: '请输入',
          whitespace: true
        }
      ],
      eleAttr: {
        disabled,
        placeholder: '请输入',
        style: {
          width
        }
      }
    },


    {
      name: 'addTime',
      label: '注册时间',
      type: 'datePicker',
      rules: [
        {
          required: true,
          message: '请选择',
        }
      ],
      eleAttr: {
        disabled,
        placeholder: '请选择',
        style: {
          width
        }
      }
    },

    {
      name: 'invitees',
      label: ' 邀请人',
      eleAttr: {
        placeholder: '请输入',
        style: {
          width
        }
      }
    },


    {
      name: 'member_type',
      label: ' 会员类型',
      type: 'select',
      list: [
        {
          value: '1',
          label: '体验用户'
        },
        {
          value: '2',
          label: '付费会员'
        }
      ],

      rules: [
        {
          required: true,
          message: '请输入',
        }
      ],
      eleAttr: {
        placeholder: '请输入',
        style: {
          width
        }
      }
    },


    {
      name: 'due_day',
      label: '到期时间',
      type: 'datePicker',
      rules: [
        {
          required: true,
          message: '请选择',
        }
      ],
      eleAttr: {
        placeholder: '请选择',
        style: {
          width
        }
      }
    },


    {
      name: 'pay_type',
      label: ' 付费类型',
      type: 'select',
      initialValue: '1',
      isShow: (data) => {
        return data.member_type == 2
      },
      list: [
        {
          value: '1',
          label: '年付费,'
        }
      ],

      rules: [
        {
          required: true,
          message: '请输入',
        }
      ],
      eleAttr: {
        placeholder: '请输入',
        style: {
          width
        }
      }
    },

    {
      name: 'robot_limit',
      label: ' 机器人权限',
      type: 'select',
      isShow: (data) => {
        return data.member_type == 2
      },
      list: [
        {
          value: '1',
          label: '机器人体验权限'
        },
        {
          value: '2',
          label: '自动机器人权限'
        }
      ],

      rules: [
        {
          required: true,
          message: '请输入',
        }
      ],
      eleAttr: {
        placeholder: '请输入',
        style: {
          width
        }
      }
    },


    {
      name: 'is_robot',
      label: ' 是否自动机器人',
      type: 'select',
      list: constants.isOrNot,
      rules: [
        {
          required: true,
          message: '请选择',
        }
      ],
      eleAttr: {
        placeholder: '请选择',
        style: {
          width
        }
      }
    },


    {
      name: 'api',
      label: 'API Key',
      rules: [
        (form) => {
          const robot_limit = form.getFieldValue('robot_limit');
          console.log(robot_limit, 'robot_limit');


          return {
            required: robot_limit == 2,
            message: '请输入'
          }
        }
      ],
      eleAttr: {
        placeholder: '请输入API Key',
        style: {
          width
        }
      }
    },
    {
      name: 'secret',
      label: 'Secret Key',
      rules: [
        (form) => {
          const robot_limit = form.getFieldValue('robot_limit');

          return {
            required: robot_limit == 2,
            message: '请输入'
          }
        }
      ],
      eleAttr: {
        placeholder: '请输入API Key',
        style: {
          width
        }
      }
    },

    {
      name: 'remart',
      label: '备注用户名',
      type: 'textArea',
      eleAttr: {
        placeholder: '请输入',
        style: {
          width
        }
      }
    }
  ]


  return formData
}