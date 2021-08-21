import React, { memo, useState, useCallback, useMemo } from 'react';

import Drawer from '@components/Drawer';

import Form from '@src/m-htrade/components/Form';

import { FormItemOptions } from '@src/m-htrade/components/Form/interface.d';

import './index.less';

import { constants } from '@utils/index';

interface OrderProps {
  visibility: boolean
  onClose?: () => void;
  detail: any;
}

export default memo((props: OrderProps) => {
  const { visibility, onClose, detail } = props;

  const { symbol, entry, dist_arr = [] } = detail;

  const onDrawerClose = useCallback(
    () => {
      onClose && onClose();
    },
    [visibility],
  )

  const formItems: FormItemOptions[] = useMemo(() => {
    const formRowData: FormItemOptions[] = []

    dist_arr.forEach((item, index) => {
      let isFirst = index === 0;

      formRowData.push({
        name: `entry_${index}`,
        label: isFirst ? '开单价格' : '',
        rules: [
          {
            required: true,
            message: '请输入开单价格'
          },
          {
            pattern: constants.pattern.number,
            message: '开单价格必须是数字'
          }
        ],
        eleAttr: {
          placeholder: '开单价格'
        }
      },
        {
          name: `amount_${index}`,
          label: isFirst ? '成交额($)' : '',
          rules: [
            {
              required: true,
              message: '请输入成交额'
            },
            {
              pattern: constants.pattern.number,
              message: '成交额必须是数字'
            }
          ],
          eleAttr: {
            placeholder: '成交额'
          }
        },

        {
          name: `proft_price_${index}`,
          label: isFirst ? '止盈价格' : '',
          initialValue: item,
          rules: [
            {
              pattern: constants.pattern.number,
              message: '止盈价格必须是数字'
            }
          ],
          eleAttr: {
            placeholder: '止盈价格'
          }
        })
    })

    formRowData.push({
      name: 'lost_price',
      rules: [
        {
          pattern: constants.pattern.number,
          message: '止损价格必须是数字'
        }
      ],
      eleAttr: {
        placeholder: '止损价格'
      }
    })


    return formRowData
  }, [detail])
  return (
    <Drawer visibility={visibility} onClose={onDrawerClose}>
      <div className='order'>
        <p className='order__symbol'>{symbol}</p>
        <p className="order__range"><span className="label">挂单区间：</span><span className='value'>{entry}</span></p>
        <div className="order_drawer_form">
          <Form
            formItems={formItems}
          />
        </div>
      </div>
    </Drawer>
  )
})