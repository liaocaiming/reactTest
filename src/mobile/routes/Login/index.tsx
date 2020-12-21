import React, { useEffect, useState, useReducer } from "react";
import IProps from "@typings/react.d";
import { Toast } from 'antd-mobile';
import { Input } from '@src/mobile/components/index';
import logo from './images/login-logo.png';
import nextBtn from './images/next-btn.png';
import { Toggle } from '@components/index';
import './index.less';
import reducer, { init, initValue } from './reducer';
import { fetch, filterObjAttr, validator } from '@utils/index';
import api from '@src/mobile/config/api';
import rules from './rules';
import { User } from '@utils/index'
import { pageUrlsMap } from "@src/mobile/config/routes";
export default (props: IProps) => {
  const [type, setType] = useState('register');
  const [state, dispatch] = useReducer(reducer, initValue, init);

  const goNext = () => {
    const { history } = props;
    let values: any = { ...state }
    let ruleArr = [...rules];
    if (type === 'login') {
      values = filterObjAttr(state, ['binance_user_id'])
      ruleArr = ruleArr.filter((item) => item.name !== 'binance_user_id')
    }

    console.log(ruleArr, 'ruleArr')
    console.log(values, 'ruleArr')
    validator(values, ruleArr).then(err => {
      if (err && err.message) {
        Toast.fail(err.message);
        return;
      }

      fetch.post(api[type], values).then((res) => {
        if (type === 'login') {
          User.saveUserInfo(res.data)
        }
        history.push(pageUrlsMap.pay);
      }).catch((error) => {
        console.log(error, '4444')
        if (error.message) {
          Toast.fail(error.message);
        }
      })
    })

  };

  const changeType = (type: 'register' | 'login') => {
    return () => {
      setType(type);
      dispatch({
        type: 'init'
      })
    }
  }

  const inputOnChange = (type: 'binance_user_id' | 'username' | 'password') => {
    return (e) => {
      dispatch({
        payload: {
          [type]: e && e.target && e.target.value
        }
      })
    }
  }

  useEffect(() => {
    document.title = '登录'
  }, [])

  return (
    <div className='mb-login'>
      <div className='header'>
        <p className='logo-container'><img className='logo' src={logo} alt="" /></p>
        <p className='link-text'>使用以下链接注册可享受币安返佣</p>
        <p className='receive-text'>最高返佣40%</p>
      </div>

      <div className='tab-container'>
        <span className={`${type === 'register' ? '' : 'disabled'}`} onClick={changeType('register')}>注册</span>
        <i className='vertical-line' />
        <span className={`${type === 'login' ? '' : 'disabled'}`} onClick={changeType('login')}>登入</span>
      </div>

      <div className='form-container'>
        <Toggle isShow={type === 'register'}>
          <Input label='uid' containerClassName='margin_bottom_10' value={state.binance_user_id} onChange={inputOnChange('binance_user_id')}></Input>
        </Toggle>
        <Input label='账户名' containerClassName='margin_bottom_10' value={state.username} onChange={inputOnChange('username')}></Input>
        <Input label='密码' type='password' value={state.password} onChange={inputOnChange('password')} ></Input>

        <div className='next-btn-container' onClick={goNext}><img className='next-btn' src={nextBtn} /></div>
      </div>
    </div>
  );
}

