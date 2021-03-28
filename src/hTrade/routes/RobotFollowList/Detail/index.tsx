import { Card } from 'antd';

import React from 'react';

import { AppForm } from '@components/index';

import { AppFormItemOptions } from '@components/AppForm/interface';

import * as styles from '../../../index.css'

export default class App extends React.PureComponent {

  public onFinish = (params: any) => {
    console.log(params);
  }

  private renderBaseInfo = () => {
    const formItems: AppFormItemOptions[] = [
      {
        name: 'userName',
        label: '用户名称',
        type: 'plainText'
      }
    ]

    return <AppForm formItems={formItems} submitButton={null} />
  }

  private renderTitle = (title: string) => {
    return <h3>{title}</h3>
  }

  private renderContainer = (options: { title: string; children: React.ReactNode }) => {
    const { title, children } = options;
    return (
      <div className={styles.margin_bottom_20}>
        <Card title={this.renderTitle(title)}>
          {children}
        </Card>
      </div>

    )
  }

  render() {
    return (
      <div className='margin_bottom_20'>
        {this.renderContainer({
          title: '基本信息',
          children: this.renderBaseInfo()
        })}

        {this.renderContainer({
          title: '收益统计',
          children: this.renderBaseInfo()
        })}

      </div>
    )
  }
}