import React from "react";
import { request } from "@utils/index";
import "./index.less";

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
    return (
      <div className="record-item">
        <div className="first-line row buy">
          <div className="left">
            <span className="icon">BTC/USDT</span>
          </div>

          <div className="right">
            <span className="time">2021-12-12 12:00:30</span>
          </div>
        </div>

        <div className="second-line row">
          <div className="col">
            <div className="title">全仓</div>
            <div className="value">20px</div>
          </div>

          <div className="col">
            <div className="title">价格</div>
            <div className="value">209</div>
          </div>

          <div className="col">
            <div className="title">数量</div>
            <div className="value">200u</div>
          </div>

          <div className="col">
            <div className="title">已实现盈利</div>
            <div className="value profit">299</div>
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
