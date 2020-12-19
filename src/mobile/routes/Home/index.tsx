import React, { useState } from "react";
import IProps from "@typings/react.d";
import { Tabs, HoldList, TrustList, RecordList } from "./components/index";
import { tabList } from "./constants";
import "./index.less";
import logoIcon from "./images/home-logo-icon.png";
import UIcon from "./images/home-u-icon.png";
import SetICon from "./images/home-set-icon.png";
import { Toggle } from "@shared/components";

interface IComponent {
  data: any[];
  unbind?: (params: any) => void;
}

interface IData {
  name: string;
  label: string;
  component: (props: IComponent) => JSX.Element;
}

const data: IData[] = [
  {
    name: "hold",
    label: "持有仓位",
    component: (props: IComponent) => <HoldList {...props} />,
  },

  {
    name: "trust",
    label: "当前委托",
    component: (props: IComponent) => <TrustList {...props} />,
  },
  {
    name: "record",
    label: "历史数据",
    component: (props: IComponent) => <RecordList {...props} />,
  },
];

export default (props: IProps) => {
  const [type, setType] = useState("record");
  const [list, setList] = useState([{ id: 1 }, { id: 2 }]);

  const onTabChange = (item) => {
    setType(item.name);
  };

  const unbind = (params: any) => {};

  const renderListContent = () => {
    const item = data.find((it) => it.name === type) as IData;
    const { component } = item;
    return (
      <div className="margin_15 padding_15">
        {component({
          data: list,
          unbind,
        })}
      </div>
    );
  };

  return (
    <div className="mb-home">
      <div className="header">
        <div className="clearfix icon-container">
          <img className="fl logo-icon" src={logoIcon} />
          <img className="fr set-icon" src={SetICon} />
          <img className="fr u-icon" src={UIcon} />
        </div>
        <Tabs list={data} activeKey={type} onChange={onTabChange} />
      </div>
      {renderListContent()}
    </div>
  );
};
