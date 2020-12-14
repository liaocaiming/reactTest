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
    <div>
      <div>
        <img src="" alt="usdt收款码" />
      </div>
      <div>
        <input type="text" style={{ display: "none" }} id="input" />
        <span>
          收款地址: <span id="account">4343434</span>
        </span>
        <Button onClick={copyFn}>复制</Button>
      </div>

      <div>
        <Button>下一步</Button>{" "}
        <Button onClick={goTo("/mobile/home")}>跳过</Button>
      </div>
    </div>
  );
};
