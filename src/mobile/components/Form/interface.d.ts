import { IRule } from '@utils/lib/validator'

export enum FormType {
  input = 'input',
  select = 'select'
}


interface IList {
  value: string | number;
  label: string;
}

type Type = keyof typeof FormType;

export type Store = {
  [key: string]: any;
}

interface FormItemOptions {
  name: string;
  label?: string;
  type?: Type;
  data?: IList[]; // 下来框数据
  rules?: IRule[];
  isShow?: ((data: Store) => boolean) | boolean;
  eleAttr?: Store;
}


export interface FormOptions {
  formItems: FormItemOptions[];
  onFinish?: (data: Store) => void;
  onError?: (rule: IRule) => void;
  onValuesChange?: (data: Store, formItem: FormItemOptions) => void;
  initialValues?: Store;
  submitOptions?: {
    containerClassName?: string;
    text?: string;
    btnAttr?: JSX.Element;
  }
}