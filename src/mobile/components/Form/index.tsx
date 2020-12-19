import React, { useEffect, useReducer, memo, useMemo } from 'react';

import { FormOptions, FormItemOptions, FormType } from './interface.d';

import { Input, Select } from '@src/mobile/components/index';

import reducer, { init, initValue } from './reducer';

import { filterFormItems } from './utils';

import { filterObjAttr, validator } from '@utils/index'

import { Toggle } from '@components/index';

const ItemComponents = {
  [FormType.input]: Input,
  [FormType.select]: Select
}

const Form = (props: FormOptions) => {
  const [state, dispath] = useReducer(reducer, initValue, init);
  const { formItems, initialValues, onError, onFinish, onValuesChange, submitOptions = { text: '确定' } } = props;
  const formRowData = useMemo(() => filterFormItems(formItems, state), [formItems, state]);
  const { btnAttr = {} } = submitOptions;

  useEffect(() => {
    dispath({
      type: 'all',
      payload: initialValues
    })
  }, [initialValues])

  const onItemChange = (item: FormItemOptions) => {
    return (value) => {
      const values = { [item.name]: value }
      dispath({
        payload: values
      })
      onValuesChange && onValuesChange({ ...state, ...values }, item)
    }
  }

  const onSubmit = () => {
    validator(state, formRowData).then((rule) => {
      if (rule) {
        onError && onError(rule);
        return
      }
      onFinish && onFinish(state);
    })
  }

  return (
    <div>
      <div>
        {
          formRowData.map((formItem) => {
            const { type = 'input', eleAttr = {}, name = '' } = formItem;
            const ItemElement = ItemComponents[type];
            const options: any = filterObjAttr(formItem, ['type', 'isShow', 'eleAttr', 'rules'])
            return <ItemElement value={state[name]} onChange={onItemChange(formItem)} {...options} {...eleAttr} />
          })
        }
      </div>
      <Toggle isShow={!!submitOptions}>
        <div className={`${submitOptions.containerClassName}`}><button onClick={onSubmit} {...btnAttr}>{submitOptions.text}</button></div>
      </Toggle>
    </div>
  )
}

export default memo(Form)