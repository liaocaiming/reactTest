import React, { useState } from "react";
import IProps from "@typings/react.d";
import { Tabs } from './components/index';
import { tabList } from './constants';
import './index.less';
import logoIcon from './images/home-logo-icon.png'
import UIcon from './images/home-u-icon.png';
import SetICon from './images/home-set-icon.png';

export default (props: IProps) => {
  const [type, setType] = useState('hold');
  const onTabChange = (item) => {
    setType(item.name)
  }

  return (
    <div className='mb-home'>
      <div className="header">
        <div className='clearfix icon-container'>
          <img className='fl logo-icon' src={logoIcon} />
          <img className='fr set-icon' src={SetICon} />
          <img className='fr u-icon' src={UIcon} />
        </div>
        <Tabs list={tabList} activeKey={type} onChange={onTabChange} />
      </div>
    </div>
  );
}
