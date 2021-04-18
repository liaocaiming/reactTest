

import moment from "moment";


export const getRangeTime = (): any[] => {
  const curDay = moment().get("date");
  if (curDay <= 15) {
    return [moment().date(1), moment()];
  }
  return [moment().date(15), moment()];
};
