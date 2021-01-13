const emptyFn = function () {

}

interface IProps {
  url: string;
  message: (data: any) => WebSocket;
  close?: (e: CloseEvent) => void;
  error?: (e: Event) => void;
  open?: (e: Event) => void;
}

let wss: WebSocket;

export default (props: IProps): WebSocket => {
  const { url, message, close = emptyFn, error = emptyFn, open = emptyFn } = props;
  if (wss) {
    wss.close();
  }
  wss = new WebSocket(url);
  let send = wss.send;
  wss.addEventListener('close', (e) => {
    close(e)
  })
  wss.addEventListener('error', (e) => {
    error(e)
  })

  wss.addEventListener('open', (e) => {
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
    message(e.data)
  })

  wss.send = (data: Object) => {
    send(JSON.stringify(data));
  }


  return wss;
}