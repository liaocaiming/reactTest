import React from 'react';

import { reactClassNameJoin } from '@utils/lib/helpers';

import './index.less';

interface IItem {
  name: string;
  label: string;
}

interface IProps {
  activeKey?: string;
  list: IItem[];
  onChange?: (item: IItem) => void;
}

export default (props: IProps) => {
  const { list, activeKey, onChange } = props;
  if (!Array.isArray(list) || list.length === 0) {
    return null;
  }
  const onTabChange = (item: IItem) => {
    return () => {
      onChange && onChange(item);
    }
  }
  return (
    <div className='mb-tab'>
      {
        list.map((item) => {
          return <div onClick={onTabChange(item)} className={reactClassNameJoin(['tab-item', activeKey === item.name ? 'tab-item-active' : ''])} key={item.name}>{item.label}</div>
        })
      }
    </div>
  )
}