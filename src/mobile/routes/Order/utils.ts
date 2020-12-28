export function validatorParams(values: any) {
  let res = {};
  if (!values) {
    return res;
  }

  Object.keys(values).forEach((key: string) => {
    if (key.indexOf('@') >= 0) {
      const [k, id] = key.split('@');
      if (res[k]) {
        res[k].push({
          value: values[key],
          id
        })
      } else {
        res[k] = [
          {
            value: values[key],
            id
          }
        ]
      }
    } else {
      Object.assign(res, { [key]: values[key] })
    }
  })

  Object.keys(res).forEach((key: string) => {
    if (Array.isArray(res[key])) {
      res[key] = res[key].sort((a: any, b: any) => a.id - b.id).map((item) => item.value)
    }
  })

  return res
}