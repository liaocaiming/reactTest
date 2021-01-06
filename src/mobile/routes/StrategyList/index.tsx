import React from "react";

import "./index.less";

import IProps from "@typings/react.d";
import { Icon } from "antd-mobile";
import { pageUrlsMap } from "@src/mobile/config/routes";

interface IList {
  title: string;
  key: string;
}

const list: IList[] = [
  {
    title: "现执行策略",
    key: "1",
  },
  {
    title: "官方推荐策略",
    key: "2",
  },
  {
    title: "自定义策略",
    key: "3",
  },
];
export default (props: IProps) => {
  const { history } = props;
  const goTo = (url: string) => {
    return () => {
      history.push(url);
    };
  };

  const goDetail = (key: string) => {
    return () => {
      history.push({
        pathname: pageUrlsMap.strategyItem,
        key,
      });
    };
  };

  return (
    <div className="strategy-list">
      <div>
        {list.map((item) => {
          return (
            <div
              className="list-item"
              key={item.key}
              onClick={goDetail(item.key)}
            >
              <span className="item-label">{item.title}</span>{" "}
              <Icon type="right" />
            </div>
          );
        })}
      </div>
      <div className="goback" onClick={goTo(pageUrlsMap.home)}>
        返回
      </div>
    </div>
  );
};
