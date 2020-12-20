import React, { useState } from "react";

import MulSet from "./MulSet";

import OpenSet from "./OpenSet";

import StopProfitOrLoss from "./StopProfitOrLoss";

import Steps from "./Steps";

import "./index.less";

interface IComponent {
  detail: any;
  onFinish: (value: any) => void;
}

const components = [
  {
    step: 0,
    title: "杠杆倍数",
    component: (props: IComponent) => <MulSet {...props} />,
  },
  {
    step: 1,
    title: "开单设置",
    component: (props: IComponent) => <OpenSet {...props} />,
  },
  {
    step: 2,
    title: "止盈止损",
    component: (props: IComponent) => <StopProfitOrLoss {...props} />,
  },
];

export default () => {
  const [step, setStep] = useState(0);
  const [detail, setDetail] = useState({});

  const onTabsChange = (value) => {
    setStep(value);
  };

  const onSave = (values) => {
    setDetail({ ...detail, ...values });
    if (step >= components.length - 1) {
      return;
    }
    setStep(step + 1);
  };

  const renderSteps = () => {
    return (
      <div>
        <Steps current={step} onChange={onTabsChange} />
      </div>
    );
  };

  const item = components[step];

  return (
    <div className="mb-order">
      {renderSteps()}
      <div className="form-container">
        <div className="line" />
        {item.component({
          detail,
          onFinish: onSave,
        })}
      </div>
    </div>
  );
};
