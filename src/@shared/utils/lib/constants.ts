 export const intervals = [
  '1m',
  '5m',
  '15m',
  '30m',
  '1h',
  '2h',
  '4h',
  '6h',
  '1d',
  '1w',
]


export const pattern = {
  number: /\d+\.?\d+/,
   // 0 和 正整数
   positiveNumber: /^[+]{0,1}(\d+)$/,
   //  正整数
   positiveNum: /^[1-9]\d*$/,
 
   // 正数
   positiveNumFloat: /^(0|[1-9][0-9]*)(\.\d+)?$/,
   // 只允许数字和字母
   alphabetOrNumber: /^[A-Za-z0-9]+$/,
   // 除特殊字符外的其他数据都允许使用
   characterOrNumber: /^[A-Za-z0-9\u4e00-\u9fa5]+$/,
 
   // 中文和数字
   chineseOrNumber: /^[0-9\u4e00-\u9fa5]+$/,
 
   // 统一社会信用代码
   creditCode: /^[A-Za-z0-9]{18}$/,
 
   // 两位小数
   twoDecimalsNumber: /^([1-9]\d*(\.\d{1,2})?|0\.[1-9][0-9]?|0\.[0-9][1-9])$/,
 
   fourDecimalsNumber: /^([1-9]\d*(\.\d{1,4})?|0\.[1-9][0-9]{0,3}|0\.\d{1,3}[1-9])$/,
   //0.00
   twoDecimalsNumberOther: /^(([1-9]{1}\d*)|([0]{1}))(\.(\d){1,2})?$/,
} 


export const isOrNot = [
  {
    value: '1',
    label: '是',
  },
  {
    value: '2',
    label: '否',
  }
]