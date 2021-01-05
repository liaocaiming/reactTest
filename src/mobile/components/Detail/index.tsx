import React from "react";

import { IProps, IRow } from "./interface.d";

import { Toggle } from "@components/index";

import "./interface.less";

export default (props: IProps) => {
  const { detail, rowData } = props;

  const renderContent = (rows: IRow[]) => {
    return (
      <div className="mb-detail">
        {rows.map((item) => {
          const { name, label, children = [] } = item;
          if (item.render && typeof item.render === "function") {
            return item.render(detail, item.name);
          }

          return (
            <div className={`detail-item  detail-item-${name}`}>
              <div>
                <span className={`detail-item-label detail-item-label-${name}`}>
                  {label}
                </span>
                <span className={`detail-item-name detail-item-name-${name}`}>
                  {detail[name]}
                </span>
              </div>

              <Toggle isShow={Array.isArray(children) && children.length > 0}>
                <div className="detail-item-children">
                  {renderContent(children)}
                </div>
              </Toggle>
            </div>
          );
        })}
      </div>
    );
  };

  return <div>{renderContent(rowData)}</div>;
};
