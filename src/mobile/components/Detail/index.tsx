import React from "react";

import { IProps, IRow } from "./interface.d";

import { Toggle } from "@components/index";

import { helpers } from '@utils/index'

import "./index.less";

export default (props: IProps) => {
  const { detail, rowData, col = 1 } = props;

  const renderContent = (rows: IRow[]) => {
    return (
      <div className="mb-content">
        {rows.map((item) => {
          let { name, label, children = [], type, data = [], afterDOM } = item;
          if (typeof label === 'function') {
            label = label(detail);
          }
          let value = detail[name];

          if (type === 'select') {
            value = (data.find((item) => String(item.value) === String(value)) || {}).label
          }

          if (typeof afterDOM === 'function') {
            afterDOM = afterDOM(detail)
          }

          if (item.render && typeof item.render === "function") {
            value = item.render(detail, item.name);
          }

          return (
            <div className={`detail-item  detail-item-${name}`} key={name}>
              <div className='detail-item-content'>
                <Toggle isShow={!!label}>
                  <span className={`detail-item-label detail-item-label-${name}`}>
                    {label}
                  </span>
                </Toggle>
                <span className={`detail-item-name detail-item-name-${name}`}>
                  <span>{value}</span>
                  <span className='detail-item-afterDom'>{afterDOM}</span>
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

  const rows = helpers.dyadicArray(rowData, col);

  return (
    <div className='mb-detail'>
      {
        rows.map((rowArr: IRow[], index: number) => {
          return <div key={String(index)} className={`row-item row-item-${index}`}>{renderContent(rowArr)}</div>
        })
      }
    </div>
  )
};
