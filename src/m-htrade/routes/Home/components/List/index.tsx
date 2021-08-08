import React, { memo } from 'react';

import ListItem from './listItem';

import './index.less';

interface Props {
  list: any[];
}

export default memo((props: Props) => {
  const { list } = props;
  return (
    <section className="home-list">
      {
        list.map((item, index) => {
          return (
            <div className='item' key={item.id || index}>
              <ListItem item={item}/>
            </div>
          )
        })
      }
    </section>
  )
})