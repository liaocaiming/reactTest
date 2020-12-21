import request, { IResponse, Irequest } from './request';

interface IOptions {
  showLoading?: boolean;
}
export function get(url: string, data?: any, options?: IOptions): Promise<IResponse> {
  return new Promise((resolve, reject) => {
    request.get(url, data, options).then(res => {
      if (res.code == 200) {
        resolve(res)
        return
      }
      reject(res)
    }).catch((err) => {
      reject(err)
    })
  })
}

export function post(url: string, data?: any, options?: IOptions): Promise<IResponse> {
  return new Promise((resolve, reject) => {
    request.post(url, data, options).then(res => {
      if (res.code == 200) {
        resolve(res)
        return
      }
      reject(res)
    }).catch((err) => {
      reject(err)
    })
  })
}