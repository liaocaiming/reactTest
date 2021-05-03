import React, { useState, memo } from 'react';

import './index.less';

interface EmailCodeProps {
  onSuccess: () => void;
  countNum?: number;
}

let timer;

export default memo((props: EmailCodeProps) => {
  const { onSuccess, countNum = 30 } = props;
  let [count, setCount] = useState(countNum);
  const [start, setstart] = useState(false);

  const onClick = () => {
    if (start || timer) {
      return
    }
    onSuccess();
    setstart(true)

    timer = setInterval(() => {
      count--;
      if (count <= 0) {
        clearInterval(timer)
        setstart(false)
        setCount(countNum)
      }
      setCount(count)

    }, 1000)
  }

  return <div className={`email-code ${start ? 'start' : ''}`} onClick={onClick}>{start ? `${count} s` : '验证码'}</div>
})