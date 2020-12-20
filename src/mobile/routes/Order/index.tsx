import React, { useState } from "react";

import MulSet from "./MulSet";

import OpenSet from "./OpenSet";

import StopLoss from "./StopLoss";

import StopProfit from "./StopProfit";

import Steps from "./Steps";

import "./index.less";

const components = [
  {
    step: 0,
    title: "杠杆倍数",
    component: (props: any) => <MulSet {...props} />,
  },
  {
    step: 1,
    title: "开单设置",
    component: (props: any) => <OpenSet {...props} />,
  },
];

export default () => {
  const [step, setStep] = useState(1);

  const onTabsChange = (value) => {
    setStep(value);
  };

  const renderSteps = () => {
    return (
      <div>
        <Steps current={step} onChange={onTabsChange} />
      </div>
    );
  };

  const onFinish = (params) => {
    console.log(params);
  };

  const item = components[step];

  return (
    <div className="mb-order">
      {renderSteps()}
      <div className="form-container">
        <div className="line" />
        {item.component({})}
      </div>
    </div>
  );
};
