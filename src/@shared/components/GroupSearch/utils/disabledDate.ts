import moment from "dayjs";

export default (currentDate: any) => {
  return moment(currentDate) >= moment();
};
