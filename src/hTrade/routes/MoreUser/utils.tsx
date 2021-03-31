import { AppFormItemOptions } from '@components/AppForm/interface';

import { constants } from '@utils/index';

interface IOptions {
  width?: number;
  disabled?: boolean;
}

export const getFormItems = (options?: IOptions) => {
  const { width = 300 } = options || {};
  const formData: AppFormItemOptions[] = [
    {
      name: 'userName',
      label: '用户名称',
      rules: [
        {
          required: true,
          message: '请输入',
          whitespace: true
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
      name: 'company',
      label: '所属公司',
      eleAttr: {
        placeholder: '请输入',
        style: {
          width
        }
      }
    },


    {
      name: 'biance_user_id',
      label: '币安UID',
      eleAttr: {
        placeholder: '请输入',
        style: {
          width
        }
      }
    },

    {
      name: 'API',
      label: 'API Key',
      rules: [
        {
          required: true,
          message: '请输入',
          whitespace: true
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
      name: 'Secret',
      label: 'Secret Key',
      rules: [
        {
          required: true,
          message: '请输入',
          whitespace: true
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
      name: 'limitMoney',
      label: '每单金额',
      rules: [
        {
          required: true,
          message: '请输入',
          whitespace: true
        },
        {
          pattern: constants.pattern.positiveNum,
          message: '请输入正整数',
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
      label: '备注',
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