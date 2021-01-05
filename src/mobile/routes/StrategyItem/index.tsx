import React from "react";

import "./index.less";

import IProps from "@typings/react.d";

import { Icon } from "antd-mobile";

import { pageUrlsMap } from "@src/mobile/config/routes";

import { Detail } from '@src/mobile/components/index';

import { IRow } from '@src/mobile/components/Detail/interface';

import { marginType, openType } from "@src/mobile/utils/constants";




const detail = {
  margin_type: 'CROSSED',
  leverage: '10倍'
}

export default (props: IProps) => {
  const { history } = props;
  const goTo = (url: string) => {
    return () => {
      history.push(url);
    };
  };

  const getRowData = () => {
    const rowData: IRow[] = [
      {
        name: 'margin_type',
        label: '开仓模式',
        type: "select",
        data: marginType,
      },
      {
        label: "开仓倍数",
        name: "leverage",
      },

      {
        label: "每单保证金",
        name: "open_margin",
      },
      {
        label: "是否限制开单数量",
        name: "is_limit_num",
      },
      {
        label: "开单方式",
        name: "entry_type",
        type: "select",
        data: openType,
        children: []
      },
      {
        label: "止盈方式",
        name: "entry_type",
        type: "select",
        data: openType,
        children: []
      },
      {
        label: "止损方式",
        name: "lost_type",
      },
    ];

    return rowData
  }
  const goDetail = (key: string) => {
    return () => {
      history.push({
        pathname: pageUrlsMap.order,
        key,
      });
    };
  };

  return (
    <div className="strategy-item">
      <Detail detail={detail} rowData={getRowData()} />
      <div className="goback" onClick={goTo(pageUrlsMap.home)}>
        返回
      </div>
    </div>
  );
};
