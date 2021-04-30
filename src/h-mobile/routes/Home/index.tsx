import React, { useEffect, useState, useReducer } from "react";
import IProps from "@typings/react.d";
import { Toast } from "antd-mobile";
import { Toggle } from "@components/index";
import "./index.less";
import reducer, { init, initValue } from "./reducer";
import { fetch, filterObjAttr, validator } from "@utils/index";
import api from "@src/h-mobile/config/api";
import { User } from "@utils/index";
import md5 from "md5";
const obj: any = {
  autocomplete: "new-password",
};
import { query } from "@utils/index";

export default (props: IProps) => {
  const params = query.getUrlQuery();
  console.log(params);

  useEffect(() => {
    document.title = "首页";
  }, []);

  const renderTitle = () => {
    return (
      <div className="header">
        <div className="logo">
          <img src="" className="img" />
        </div>

        <div className="title">
          <div className="line" />
          <div className="text">
            <p>Hunter trades </p>
            <p>智能交易策略系统 </p>
            <div className="tip">无需盯盘，高准确率，让盈利更简单 </div>
          </div>
        </div>

        <div className="step">
          <h6 className="step-title">三步领好礼</h6>

          <div className="step-num">
            <div className="step-num-item">
              <span>1</span>
              <span>2</span>
              <span>2</span>
            </div>

            <div className="step-num-line" />
          </div>

          <div className="step-detail">
            <div className="step-detail-item step-detail-first">
              <img src="" className="img" />
              <p className="text">注册账号</p>
            </div>

            <div className="step-detail-item step-detail-second">
              <img src="" className="img" />
              <p className="text">下载APP</p>
            </div>

            <div className="step-detail-item step-detail-third">
              <img src="" className="img" />
              <p className="text">加客服微信</p>
              <p className="text"> 免费试用</p>
              <p className="text">（ID：blockchain2046)</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return <div id="home">{renderTitle()}</div>;
};
