import React, { useEffect, useState, useReducer } from "react";
import IProps from "@typings/react.d";
import "./index.less";
import reducer, { init, initValue } from "./reducer";
// import api from "@src/h-mobile/config/api";
// import { User } from "@utils/index";
import md5 from "md5";

import { query } from "@utils/index";

import register from './images/icon-register.png';

import iconDown from './images/icon-register.png';

import iconWechat from './images/icon-wechat.png';

import iconLogo from './images/icon-logo.png';

import Input from './Input';

const obj: any = {
  autocomplete: "new-password",
};

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
          <img src={iconLogo} className="img" />
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
              <span>3</span>
            </div>

            <div className="step-num-line" />
          </div>

          <div className="step-detail">
            <div className="step-detail-item step-detail-first">
              <img src={register} className="img" />
              <p className="text">注册账号</p>
            </div>

            <div className="step-detail-item step-detail-second">
              <img src={iconDown} className="img" />
              <p className="text">下载APP</p>
            </div>

            <div className="step-detail-item step-detail-third">
              <img src={iconWechat} className="img" />
              <p className="text">加客服微信</p>
              <p className="text"> 免费试用</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderForm = () => {
    return (
      <div className="form">
        <Input placeholder='邮箱' containerClassName='input-container'>
          <span className='tip'>邮箱格式不对</span>
        </Input>

        <Input placeholder='邮箱' containerClassName='input-container'>
          <span className='tip'>邮箱格式不对</span>
        </Input>

        <Input placeholder='邮箱' containerClassName='input-container'>
          <span className='tip'>邮箱格式不对</span>
        </Input>

        <Input placeholder='邮箱' containerClassName='input-container'>
          <span className='tip'>邮箱格式不对</span>
        </Input>

        <Input placeholder='邮箱' containerClassName='input-container'>
          <span className='tip'>邮箱格式不对</span>
        </Input>

        <div className='checkbox-container'>
          <input type='checkbox' id="see-checkbox" checked />
          <label htmlFor="see-checkbox">
            <span className='see-tip'>我已阅读并同意</span>
            <span className='see-text'>《用户协议》</span>
          </label>

        </div>
      </div>
    )
  }

  return (
    <div id="home">
      {renderTitle()}
      {renderForm()}
    </div>
  )
};
