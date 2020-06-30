import * as React from "react";

import { Form, Input, Button, Checkbox, message } from "antd";

import User from '@utils/lib/User';

import "./index.css";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const obj = {
  username: 'woshinidaye',
  password: 'woshidajiba'
}

const Login = (props: any) => {
  const onFinish = (values) => {
    console.log(props, 'props')
    console.log(values, 'values')
    if (values.username !== obj.username || values.password !== obj.password) {
      message.error('请输入正确的密码或用户名')
      return;
    }
    User.saveUserInfo(values);
    const { history } = props;
    history.push('/boss/chart')
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const width = 300;

  return (
    <div className="boss-form">
      <div className='logo'><img src="http://5b0988e595225.cdn.sohucs.com/images/20170922/ca5207e68211450e863d2d859e480e91.gif" /></div>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input style={{ width }} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password style={{ width }} />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
