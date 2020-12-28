import React from "react";
import { helpers, request } from "@utils/index";
import "./index.less";
import { marginType } from "../../constants";

interface IProps {
  data: object[];
  unbind?: (detail: any) => void;
}

export default (props: IProps) => {
  const { unbind, data } = props;

  const unbindRobot = () => {
    request.post("/unbind", data).then((res) => {
      unbind && unbind(data);
    });
  };

  const renderItem = (detail: any) => {
    const {
      symbol,
      side,
      leverage,
      avg_price,
      quantity,
      profit_loss,
      created_at,
      margin_type
    } = detail;

    return (
      <div className="record-item">
        <div className="first-line row">
          <div className="left">
            <span className="icon">{symbol}</span>
          </div>

          <div className="right">
            <span className="time">{created_at}</span>
          </div>
        </div>

        <div className="second-line row">
          <div className="col">
            <div className="title">{marginType[margin_type] || '全仓'}</div>
            <div className="value">{leverage}x</div>
          </div>

          <div className="col">
            <div className="title">价格</div>
            <div className="value">{avg_price}u</div>
          </div>

          <div className="col">
            <div className="title">数量</div>
            <div className="value">{quantity}</div>
          </div>

          <div className="col">
            <div className="title">已实现盈利</div>
            <div className={helpers.reactClassNameJoin(["value", profit_loss > 0 ? 'profit' : 'loss'])}>{profit_loss}</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="record-list">
      {Array.isArray(data) &&
        data.map((item) => {
          return renderItem(item);
        })}
    </div>
  );
};
