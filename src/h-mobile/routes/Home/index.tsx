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

import qrcode from './images/qrcode.png'

import bar from './images/bar.png'

import rate from './images/rate.png'

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
          <label className="see-checkbox">
            <input type='checkbox' className='checkbox' />
            <div className="show-box" />
            <span className='see-tip'>我已阅读并同意</span>
          </label>
          <span className='see-text'>《用户协议》</span>

        </div>

        <div className="btn">注册</div>

        <div className="qrcode">
          <p className='tip-text'>识别二维码，下载APP文件</p>
          <img src={qrcode} className='img' />
        </div>
      </div>
    )
  }

  const renderDetailContent = () => {
    return (
      <div className="detail-content">
        <div className="h-24">
          <div className='img-container'>
            <img src={bar} className='h-24-img' />
          </div>
          <div className='detail-show-container'><span className='btn'><span className='weight'>24小时</span><span>连续推送</span></span></div>
          <p>依靠专业、完善的交易策略,</p>
          <p>
            <span>Hunter trades 交易系统能够</span>
            <span className='white'>24小时</span>
            <span>不间断地跟踪现货、合约、杠杆代币的市场走势,帮助用户发现足够多的潜在交易机会。</span>
          </p>
        </div>

        <div className="h-24">
          <div className='img-container'>
            <img src={bar} className='h-24-img' />
          </div>
          <div className='detail-show-container'><span className='btn'><span className='weight'>长中短线</span><span>信号全面覆盖</span></span></div>
          <p>

            <span>Hunter trades提供了</span>
            <span className='white'>短线（3天内）、中线（15天内）、长线（30天）</span>
            <span>等不同周期的信号提醒，让用户都找到适合自己的交易机会。</span>
          </p>
        </div>

        <div className="h-24">
          <div className='img-container'>
            <img src={rate} className='h-24-img' />
          </div>
          <div className='detail-show-container'><span className='btn'><span className='weight'>高准确率</span></span></div>
          <p>依靠专业、完善的交易策略,</p>
          <p>
            <span>经过上万次的策略信号推送，Hunter trades 整体策略准确率维持在</span>
            <span className='white'>80%以上</span>
            <span>，远超行业水平，让跟单操作稳定盈利。</span>
          </p>
        </div>

      </div>
    )
  }

  return (
    <div id="home">
      {renderTitle()}
      {renderForm()}
      {renderDetailContent()}
      <div className='footer'>© 2020 Hunter trades App. All Rights Reserved.</div>
    </div>
  )
};
