const payType = [
  {
    value: '1',
    label: '年付费'
  }
]

const orderStatus = [
  {
    value: '1',
    label: '新信号'
  },
  {
    value: '2',
    label: '止盈信号'
  },
  {
    value: '3',
    label: '止损信号'
  },
  {
    value: '4',
    label: '超时信号'
  },
]







const userType = [
  {
    value: '1',
    label: '新用户'
  },
  {
    value: '2',
    label: '体验用户'
  },
  {
    value: '3',
    label: '体验过期用户'
  },
  {
    value: '4',
    label: 'VIP用户'
  },
  {
    value: '5',
    label: 'VIP过期用户'
  },

]


export const transferStatus = [
  {
    value: 0,
    label: '已发送确认Email'
  },
  {
    value: 1,
    label: '已被用户取消'
  },
  {
    value: 2,
    label: '等待确认'
  },
  {
    value: 3,
    label: '被拒绝'
  },
  {
    value: 4,
    label: '处理中'
  },

  {
    value: 5,
    label: '交易失败'
  },
  {
    value: 6,
    label: '完成'
  },
]




export {
  payType,
  orderStatus,
  userType,
}