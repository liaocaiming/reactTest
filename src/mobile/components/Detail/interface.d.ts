
type IShowFn = (detail: object) => boolean | boolean

type IDOMFn = ((detail: object) => JSX.Element | string) | JSX.Element | string


export enum ItemType {
  select = 'select',
  input = 'input'
}


export interface IList {
  value: string;
  label: string;
}

type Type = keyof typeof ItemType;

export interface IRow {
  name: string;
  label?: IDOMFn;
  afterDOM?: IDOMFn;
  type?: Type;
  data?: IList[]
  isShow?: IShowFn;
  render?: (detail: object, name: string) => JSX.Element | string;
  children?: IRow[]
}


export interface IProps {
  detail: object;
  rowData: IRow[];
}
