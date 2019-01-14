import * as React from "react";

import { connect } from "@shared/containers/appScreen";

interface Iprops {
  [random: string]: any;
}

interface Istate {
  [random: string]: any;
}

import { Form, Icon, Input, Button, Checkbox } from "antd";

const FormItem = Form.Item;

@connect()
@(Form.create() as any)
export default class App extends React.PureComponent<Iprops, Istate> {
  constructor(props: Iprops) {
    super(props);
  }

  public handleSubmit = e => {
    e.preventDefault();
    window.console.log(this.props);
    this.props.form.validateFields((err, values) => {
      window.console.log(values);
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  public render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{ width: 290, margin: "200px auto" }}>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator("userName", {
              rules: [
                { required: true, message: "Please input your username!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Username"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Please input your Password!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Password"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("remember", {
              valuePropName: "checked",
              initialValue: true
            })(<Checkbox>Remember me</Checkbox>)}
            <a className="login-form-forgot" href="">
              Forgot password
            </a>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              onClick={this.handleSubmit}
            >
              Log in
            </Button>
            Or <a href="">register now!</a>
          </FormItem>
        </Form>
      </div>
    );
  }
}
