import React, { memo, useCallback } from 'react';
import './Popup.less';
import { AppForm } from '@src/m-htrade/components/index';

import { FormItemOptions } from '@src/m-htrade/components/Form/interface.d';

import { Checkbox } from 'antd-mobile';

interface Props {
  onClose?: () => void;
  isShow: boolean;
}

export default memo((props: Props) => {
  const { onClose, isShow } = props;

  const onSubmit = (values: any) => {
    console.log(values, 'values');
  }

  const onClickClose = useCallback(
    () => {
      onClose && onClose()
    },
    [isShow],
  )
  const formItems: FormItemOptions[] = [
    {
      name: 'textid',
      label: '交易哈希（Hash）',
      rules: [
        {
          required: true,
          message: '请输入交易哈希（Hash）'
        }
      ],
      eleAttr: {
        placeholder: '请输入交易哈希（Hash）',
        children: <a className='paste'>粘贴</a>
      }
    },

    {
      name: 'agree',
      rules: [
        {
          required: true,
          message: '请先查看协议'
        }
      ],
      render: (options) => {
        const { form } = options
        const { setFieldsValue } = form;
        return (
          <div className='agree-container'>
            <Checkbox
              onChange={(e) => {
                if (setFieldsValue) {
                  setFieldsValue({
                    agree: e.target.checked
                  })
                }
              }}
            ></Checkbox>
            <span className='agree'>我已阅读且同意</span>
            <a>《智能信号服务协议》</a>
          </div>
        )
      }
    }
  ]


  return (
    <section className={`pay-popup ${isShow ? '' : 'none'}`}>
      <h3 className='title'><span>套餐选择</span> <i className='close' onClick={onClickClose}></i></h3>
      <div className="pay-content">
        <h4 className='pay-num'><span className='num'>2000</span><span>USDT / 年</span></h4>

        <div className="address">
          <div className="left">
            <div className='trx'><span>TRX地址:</span><a className='copy'>复制</a></div>
            <span className='address-str'>dhajkhdskahdksasalhsksdhajdhaskhddadhahsdahka</span>
          </div>

          <div className='right'>
            <img src="" />
          </div>
        </div>

      </div>

      <div>
        <AppForm
          formItems={formItems}
          submitOptions={{
            text: '我已付款，确定提交'
          }}
          onFinish={onSubmit}
        />
      </div>
    </section>
  )
})

