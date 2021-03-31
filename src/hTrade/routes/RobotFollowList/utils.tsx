import { AppFormItemOptions } from "@components/AppForm/interface";

import { constants } from "@utils/index";

interface IOptions {
  width?: number;
  disabled?: boolean;
  operateType?: "edit" | "add";
}

export const getFormItems = (options?: IOptions) => {
  const { width = 300, operateType } = options || {};
  const disabled = operateType === "edit";

  const formData: AppFormItemOptions[] = [
    {
      name: "email",
      label: "邮箱",
      rules: [
        {
          required: true,
          message: "请输入",
          whitespace: true,
        },
      ],
      eleAttr: {
        placeholder: "请输入",
        disabled,
        style: {
          width,
        },
      },
    },

    {
      name: "biance_user_id",
      label: "币安UID",
      eleAttr: {
        disabled,
        placeholder: "请输入",
        style: {
          width,
        },
      },
    },

    {
      name: "API",
      label: "API Key",
      isShow: !disabled,
      rules: [
        {
          required: true,
          message: "请输入",
          whitespace: true,
        },
      ],
      eleAttr: {
        placeholder: "请输入API Key",
        style: {
          width,
        },
      },
    },
    {
      name: "Secret",
      label: "Secret Key",
      isShow: !disabled,
      rules: [
        {
          required: true,
          message: "请输入",
          whitespace: true,
        },
      ],
      eleAttr: {
        placeholder: "请输入API Key",
        style: {
          width,
        },
      },
    },

    {
      name: "evert_money",
      label: "每单金额",
      rules: [
        {
          required: true,
          message: "请输入",
          whitespace: true,
        },
        {
          pattern: constants.pattern.positiveNum,
          message: "请输入正整数",
        },
      ],
      eleAttr: {
        placeholder: "请输入API Key",
        style: {
          width,
        },
      },
    },

    {
      name: "remart",
      label: "备注",
      type: "textArea",
      eleAttr: {
        placeholder: "请输入",
        style: {
          width,
        },
      },
    },
  ];

  return formData;
};
