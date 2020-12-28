import React, { useState, useEffect } from "react";
import IProps from "@typings/react.d";
import { Tabs, HoldList, TrustList, RecordList } from "./components/index";
import "./index.less";
import logoIcon from "./images/home-logo-icon.png";
import UIcon from "./images/home-u-icon.png";
import SetICon from "./images/home-set-icon.png";
import { pageUrlsMap } from "@src/mobile/config/routes";
import { api } from "@src/mobile/config/index";
import { fetch } from "@utils/index";
import { User } from "@utils/index";
import { Toast } from "antd-mobile";
interface IComponent {
  data: any[];
  unbindRobot?: (params: any) => () => void;
}

interface IData {
  name: number;
  type?: string;
  label: string;
  component: (props: IComponent) => JSX.Element;
}

// 持有:1,委托:2,历史:3
const data: IData[] = [
  {
    name: 1,
    label: "持有仓位",
    component: (props: IComponent) => <HoldList {...props} />,
  },

  {
    name: 2,
    label: "当前委托",
    component: (props: IComponent) => <TrustList {...props} />,
  },
  {
    name: 3,
    label: "历史数据",
    component: (props: IComponent) => <RecordList {...props} />,
  },
];

export default (props: IProps) => {
  const [type, setType] = useState(1);
  const [list, setList] = useState([]);
  const userInfo = User.getUserInfo();

  const getList = (params: any) => {
    fetch.get(api.followRecords, params).then((res) => {
      if (res.data) {
        setList(res.data || []);
      }
    });
  };

  // 解绑机器人
  const unbindRobot = (id: string) => {
    return () => {
      fetch.post(api.cancelFollowRecords, { id }).then((res) => {
        Toast.success(res && res.message || '成功')
        getList({
          user_id: userInfo.id,
          status: type,
          order_type: 3,
        });
      });
    };
  };

  const onTabChange = (item) => {
    setType(item.name);
    setList([]);
  };

  const goTo = (url: string) => {
    return () => {
      const { history } = props;
      history.push(url);
    };
  };

  useEffect(() => {
    getList({
      user_id: userInfo.id,
      status: type,
      order_type: 3,
    });
  }, [userInfo.id, type]);

  const renderListContent = () => {
    const item = data.find((it) => it.name === type) as IData;
    const { component } = item;
    return (
      <div className="margin_15 padding_15">
        {component({
          data: list,
          unbindRobot,
        })}
      </div>
    );
  };

  return (
    <div className="mb-home">
      <div className="header">
        <div className="clearfix icon-container">
          <img className="fl logo-icon" src={logoIcon} />
          <img
            className="fr set-icon"
            src={SetICon}
            onClick={goTo(pageUrlsMap.order)}
          />
          <img className="fr u-icon" src={UIcon} onClick={goTo(pageUrlsMap.pay)} />
        </div>
        <Tabs list={data} activeKey={type} onChange={onTabChange} />
      </div>
      {renderListContent()}
    </div>
  );
};
