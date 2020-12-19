import React from "react";

import MulSet from "./MulSet";

import OpenSet from "./OpenSet";

import StopLoss from "./StopLoss";

import StopProfit from "./StopProfit";

import Steps from "./Steps";

import { Select } from "@src/mobile/components/index";

import "./index.less";

const colors = [
  {
    value: "1",
    label: "全仓",
  },
  {
    value: "2",
    label: "半仓",
  },
];

export default () => {
  const renderSteps = () => {
    return (
      <div>
        <Steps current={1} />
      </div>
    );
  };

  return (
    <div className="mb-order">
      {renderSteps()}
      <div className="form-container">
        <Select data={colors} value={2} label="开仓模式"></Select>
      </div>
    </div>
  );
};
