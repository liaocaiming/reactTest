import * as React from 'react';

import { Link } from 'react-router-dom';

const routes = [
  {
    title: '汇率统计柱形图',
    href: '/rate',
  },
  {
    title: '汇率--价格对比图',
    href: '/chart',
  }
]

interface IRoute {
  title: string;
  href: string;
}

export default class App extends React.PureComponent {
  public render() {
    return (
      <div>
        {
          routes.map((item: IRoute) => {
          return <span style={{ marginRight: 50}}><Link to={{ pathname: item.href }} >{item.title}</Link></span> 
          })
        }
      </div>
    )
  }
}

