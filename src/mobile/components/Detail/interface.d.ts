
type IShowFn = (detail: object) => boolean | boolean

export interface IRow {
  name: string;
  label: string;
  isShow: IShowFn;
  render: (detail: object, name: string) => JSX.Element | string;
  children: IRow[]
}


export interface IProps {
  detail: object;
  rowData: IRow[];
}
