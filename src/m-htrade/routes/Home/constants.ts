
export const marginType = {
  ISOLATED: '逐仓',
  CROSSED: '全仓'
}

export const tabs = [
  {
    name: '1',
    label: '全部推送',
    query: {
      setType: null,
    }
  },
  {
    name: '2',
    label: '现货信号',
    query: {
      setType: 1,
    }
  },
  {
    name: '3',
    label: '合约信号',
    query: {
      setType: 2,
    }
  },
  {
    name: '4',
    label: '我的关注',
    query: {
      setType: null,
      isSub: 1
    }
  }
]
