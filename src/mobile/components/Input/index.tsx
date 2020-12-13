import React from 'react';

import { filterObjAttr } from '@utils/index';

import './index.less';

interface IProps extends React.InputHTMLAttributes<any> {
  label?: string | JSX.Element;
  containerClassName?: string;
}



export default (props: IProps) => {
  const { label, containerClassName } = props;

  return (
    <div className={`mb-input ${containerClassName || ''}`}>
      <div className="label">{label}</div>
      <input className='input' type="text" placeholder='请输入' {...filterObjAttr(props, ['containerClassName', 'label'])} />
    </div>
  )
}