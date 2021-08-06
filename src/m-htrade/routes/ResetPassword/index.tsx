import React, { useEffect, useCallback, useState } from "react";
import IProps from "@typings/react.d";
import { Toast } from "antd-mobile";
import "./index.less";
import { fetch } from "@utils/index";
import api from "@src/m-htrade/config/api";
import md5 from "md5";
import { pageUrlsMap } from "@src/m-htrade/config/routes";
import { FormItemOptions } from "@src/m-htrade/components/Form/interface";
import { AppForm, EmailCode } from "@src/m-htrade/components";
import Pick from 'loadsh/Pick';

import { constants } from '@utils/index'
import omit from "lodash/omit";

const obj: any = {
  autocomplete: "off",
}


let form: any = {};

type Step = '1' | '2';

export default (props: IProps) => {
  const [step, setStep] = useState<Step>('1');

  const getCode = () => {
    const email = form?.getFieldValue('email');
    if (!email) {
      Toast.fail('请先输入邮箱');
      return
    }
    if (!constants.pattern.email.test(email)) {
      Toast.fail('请输入正确的邮箱')
      return;
    }
    fetch
      .post(
        api.getCode,
        { email, c_type: 1 },
        { showLoading: false },
      )
      .then(res => {
        Toast.success(res.message || '已发送验证码至邮箱');
      });
  };

  const repsdOnBlur = useCallback((e: any) => {
    const psw = form.getFieldValue('password');
    if (psw !== e.target.value) {
      Toast.fail('两次密码输入不一致！');
    }
  }, [form])

  const formData: FormItemOptions[] = [
    {
      label: "邮箱",
      name: "email",
      isShow: step === '1',
      rules: [
        {
          required: true,
          message: "请输入邮箱",
        },
        {
          pattern: constants.pattern.email,
          message: '请输入正确的邮箱'
        }
      ],
      eleAttr: {
        placeholder: '请输入邮箱',
        ...obj
      }
    },

    {
      label: "验证码",
      name: "code",
      type: "input",
      isShow: step === '1',
      rules: [
        {
          required: true,
          message: "请输入验证码",
        },
      ],
      eleAttr: {
        type: "number",
        placeholder: '请输入验证码',
        children: (
          <div className="code">
            <EmailCode
              onSuccess={getCode}
              validator={() => {
                const email = form?.getFieldValue('email')
                console.log(email, 'email');

                if (!email) {
                  Toast.fail('请先输入邮箱');
                  return false;
                }

                if (!constants.pattern.email.test(email)) {
                  Toast.fail('邮箱格式不正确');
                  return false;
                }
                return true;
              }}
            />
          </div>
        ),
        ...obj
      },
    },

    {
      label: "密码",
      name: "password",
      type: "input",
      isShow: step === '2',
      rules: [
        {
          required: true,
          message: "请输入密码",
        },
      ],
      eleAttr: {
        type: 'password',
        placeholder: '请输入验证码',
        ...obj
      },
    },

    {
      label: "密码确认",
      name: "repwd",
      type: "input",
      isShow: step === '2',
      rules: [
        {
          required: true,
          message: "请输入密码确认",
        },
      ],
      eleAttr: {
        type: 'password',
        onBlur: repsdOnBlur,
        placeholder: '请输入再次输入密码',
        ...obj
      },
    },
  ];


  const onReSet = useCallback((values: any) => {
    if (values.password !== values.repwd && step === '1') {
      Toast.fail('两次密码输入不一致！');
      return
    }

    if (step === '1') {
      const params = Pick(values, ['email', 'check_token']);
      fetch.post(api.check_code, { ...params }).then((res) => {
        setStep('2');
      })
    }

    const params = omit(values, ['rpwd']);
    fetch.post(api.reset_password, { ...params, password: md5(values.password) }).then((res) => {
      Toast.success(res.message || '修改成功', 1, () => {
        props.history.push(pageUrlsMap.login);
      })
    })
  }, [form])

  useEffect(() => {
    document.title = "登录";
  }, []);

  return (
    <div className="mb-resetPassword">
      <div className="form-container">
        <AppForm
          formItems={formData}
          getRef={(forms) => {
            form = forms;
          }}
          onFinish={onReSet}
          submitOptions={{
            text: step === '1' ? '下一步' : '提交',
          }}
        />
      </div>
    </div>
  );
};
