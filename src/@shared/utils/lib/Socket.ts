import queryToParamsStr from './queryToParamsStr'

const emptyFn = function () {

}

interface IProps {
  url: string;
  channel: string;
  message: (data: any) => void;
  close?: (e: CloseEvent) => void;
  error?: (e: Event) => void;
  open?: (e: Event) => void;
}

let wss: WebSocket;

export default (props: IProps): WebSocket => {
  const { url, message, close = emptyFn, error = emptyFn, open = emptyFn, channel } = props;
  if (wss) {
    wss.close();
  }
  wss = new WebSocket(url);
  // let send = wss.send;
  wss.addEventListener('close', (e) => {
    console.log('close');

    close(e)
  })
  wss.addEventListener('error', (e) => {
    console.log('error');
    error(e)
  })

  wss.addEventListener('open', (e) => {
    console.log('open');
    open(e)
  })

  wss.addEventListener('message', (e) => {
    let data = e.data
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch {
        data = e.data;
      }
    }

    if (data.type != 'ping') {
      message(data)
    }

  })

  wss.addEventListener(channel, (e) => {
    console.log(e, 'channel');

  })

  // wss.send = (data: Object) => {
  //   // let msg = queryToParamsStr(data);
  //   send('fff');
  // }

  return wss;
}