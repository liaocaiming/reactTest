export  function formatDetail  (detail: any)  {
  const { dist_profit_rate, dist, entry: entry_price, dist_time = '' } = detail;
  const dist_profit_rate_arr =
    (dist_profit_rate && dist_profit_rate.split(",")) || [];
  const dist_arr = (dist && dist.split(",")) || [];
  const entry = entry_price && entry_price.replace(",", "~");
  const dist_time_arr = dist_time.split(',') || [];
  const profit_arr =
    Array.isArray(dist_arr) &&
    dist_arr.map((value: string, index: any) => {
      return `${value} (${dist_profit_rate_arr[index]})`;
    });

  return { ...detail, entry, profit_arr, dist_time_arr, dist_profit_rate_arr, dist_arr };
};

export const orderStatus = [
  {
    value: '1',
    label: '未止盈',
  },
  {
    value: '2',
    label: '已止盈',
  },
  {
    value: '3',
    label: '已止损'
  },
  {
    value: '4',
    label: '已超时'
  },
  {
    value: '7',
    label: '已止盈'
  },
]

export function getLabel (list: any[], value: string | number) {
  if (!Array.isArray(list)) {
    return ''
  }
  return (list.find((item) => item.value == value) || {}).label || '未止盈'
}

export function formatStatus (status: number): "cur" | 'success' |'failed' {
  const map = {
    1: 'cur',
    2: 'success',
    3: 'failed',
    4: 'failed',
    7: 'success'
  }
  return map[status] || 'cur'
}