import React, { useState, memo } from "react";
import IProps from "@typings/react.d";
import { Input } from "@src/mobile/components/index";
import { request } from "@utils/index";
import { Toast } from "antd-mobile";

import "./index.less";

const APP = (props: IProps) => {
  const [api, setApi] = useState("");
  const [secret, setSecret] = useState("");

  const goNext = () => {
    if (!api) {
      Toast.fail("请输入API密钥");
      return;
    }

    if (!secret) {
      Toast.fail("请输入密钥");
      return;
    }

    request.post("/saveApi", { api, secret }).then((res) => {
      // 要改
      if (res) {
        const { history } = props;
        history.push("/mobile/pay");
      }
    });
  };

  const apiOnchange = (e) => {
    setApi(e.target.value);
  };

  const secretOnchange = (e) => {
    setSecret(e.target.value);
  };

  return (
    <div className="bind-account">
      <div className="skip-btn-container">
        <span className="skip-btn">跳过</span>
      </div>

      <div className="form-container">
        <div className="tips-container">
          <div className="line" />
          <div className="tips">
            <span></span>
            <span>API绑定后不可以修改，请谨慎填写</span>
          </div>
        </div>

        <div className="form">
          <Input
            label="API密钥"
            containerClassName="margin_bttom_10"
            value={api}
            onChange={apiOnchange}
          ></Input>
          <Input label="密钥" value={secret} onChange={secretOnchange}></Input>
        </div>
        <div className="submit-btn" onClick={goNext}>
          下一步
        </div>
      </div>
    </div>
  );
};

export default memo(APP, (prevProps: IProps, nextProps: IProps) => {
  return prevProps !== nextProps;
});
