import { Button } from "antd";
import React from "react";
import { copy } from "@utils/index";
import IProps from "@typings/react.d";
import "./index.less";

export default (props: IProps) => {
  const copyFn = () => {
    copy("account");
  };

  const goTo = (url: string) => {
    const { history } = props;
    return () => {
      history.push(url);
    };
  };

  return (
    <div className='mb-pay'>

      <div className='skip-btn-container'><span className='skip-btn' onClick={goTo("/mobile/home")}>跳过</span></div>

      <div className='receive-code'>
        <img className='qrcode' src="" alt="usdt收款码" />
      </div>

      <div>
        <input type="text" style={{ display: "none" }} id="input" />
        <div className='address' id="account">4343434</div>
        <div className='copy-btn-container'> <span className='copy-btn' onClick={copyFn}>复制</span></div>
      </div>

      <div className='submit-btn' onClick={goTo("/mobile/home")}>下一步</div>
    </div>
  );
};
