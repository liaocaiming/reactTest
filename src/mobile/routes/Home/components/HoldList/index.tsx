import React from "react";
import { helpers } from "@utils/index";
import { mul } from "@utils/lib/calculate";
import "./index.less";
import { marginType } from "../../constants";

interface IProps {
  data: object[];
  unbindRobot?: (id: string) => () => void;
}

export default (props: IProps) => {
  const { data, unbindRobot } = props;

  const renderItem = (detail: any) => {
    const {
      side,
      symbol,
      margin_type,
      leverage,
      goal_times,
      avg_price,
      quantity,
      liquidation_price,
      profit_loss,
      residue_entry_amount,
      id,
    } = detail;
    return (
      <div className="hold-item" key={detail.id}>
        <div className="first-line row buy">
          <div className="left">
            <span
              className={helpers.reactClassNameJoin([
                "margin_right_5 direction",
                "direction",
                side ? "buy" : "sale",
              ])}
            >
              {side ? '买' : '卖'}
            </span>
            <span className="icon">{symbol}</span>
          </div>

          <div className="right">
            <span className="margin_right_5">{marginType[margin_type]}</span>
            <span>{leverage}X</span>
          </div>
        </div>

        <div className="second-line row">
          <div className="col">
            <div className="title">止盈目标</div>
            <div className="value">{goal_times}</div>
          </div>

          <div className="col">
            <div className="title">买入仓位</div>
            <div className="value">{mul(avg_price || 0, quantity || 0)}u</div>
          </div>

          <div className="col">
            <div className="title">剩余仓位</div>
            <div className="value">{residue_entry_amount}u</div>
          </div>

          <div className="col">
            <div className="title">止盈/止损</div>
            <div className="value">{profit_loss}</div>
          </div>
        </div>

        <div className="third-line row">
          <div className="col">
            <div className="title">买入价钱</div>
            <div className="value">{avg_price}u</div>
          </div>

          <div className="col">
            <div className="title">强平价钱</div>
            <div className="value">{liquidation_price}u</div>
          </div>

          <div className="unbind-btn">
            <span className="btn" onClick={unbindRobot && unbindRobot(id)}>
              解绑机器人
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="hold-list">
      {Array.isArray(data) &&
        data.map((item) => {
          return renderItem(item);
        })}
    </div>
  );
};
