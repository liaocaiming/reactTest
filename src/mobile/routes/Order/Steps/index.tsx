import React from "react";

import { Steps } from "antd-mobile";

const { Step } = Steps;

import "./index.less";

interface IProps {
  current: number;
}

const data = [
  {
    key: "mul",
    title: "杠杆倍数",
  },
  {
    key: "openSet",
    title: "开单设置",
  },
  {
    key: "profitOrLost",
    title: "止盈止损",
  },
];

export default (props: IProps) => {
  const { current } = props;
  return (
    <div className="mb-steps">
      <Steps direction="horizontal" size="small" current={current}>
        {data.map((item) => {
          return <Step description={item.title} key={item.key} />;
        })}
      </Steps>
    </div>
  );
};
