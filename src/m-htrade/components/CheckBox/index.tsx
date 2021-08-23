import React, { memo, useState } from "react";

import { Toggle } from "@components/index";

import { Checkbox } from 'antd-mobile';


import "./index.less";

interface IList {
  value: string | number;
  label: string;
}

const { CheckboxItem } = Checkbox;

interface IProps {
  label?: string | JSX.Element;
  containerClassName?: string;
  data?: IList[];
  value?: string[] | number[];
  onChange?: (values: string[] | number[]) => void;
}

export default (props: IProps) => {
  const { label, containerClassName, data = [], onChange } = props;
  const [values, setValues] = useState<any[]>([])

  const onCheckBoxChange = (item: any) => {
    return () => {
      let arr = [...values];

      if (arr.includes(item.value)) {
        arr.splice(arr.indexOf(item.value), 1);
      } else {
        arr.push(item.value);
      }
      setValues(arr);
      onChange && onChange(arr);
    }
  }

  return (
    <div className={`mb-checkbox ${containerClassName || ""}`}>
      <Toggle isShow={!!label}>
        <div className="label">{label}</div>
      </Toggle>
      <div>
        {
          data.map((item) => {
            return (
              <CheckboxItem key={item.value} onChange={onCheckBoxChange(item)}>
                {item.label}
              </CheckboxItem>
            )
          })
        }
      </div>
    </div>
  );
};
