import React, { useState } from 'react'
import _ from "lodash";
import { Tabs } from 'antd';
import DropButton from '@components/Drop';
import './style.scss'

const Toolbox = props => {
  const { dropItems } = props;

  // console.log(dropItems)

  const onChange = (key) => {
    console.log(key);
  };

  const items = [
    {
      key: 'form',
      label: '表单组件',
      children: <div className='continer'>
        {dropItems?.map((item, inx) => {
          return <DropButton compId={item.instanceId} key={`dropbtn_${inx}`} text={item.toolbox.showName} />
        })}
      </div>
    },
    {
      key: 'data',
      label: '数据源组件',
      children: 'Content of Tab Pane 3',
    },
    {
      key: 'other',
      label: '自定义组件',
      children: 'Content of Tab Pane 3',
    }
  ];

  return (
    <div className='continer'>
      <Tabs
      defaultActiveKey="layout"
      type="card"
      items={items}
      onChange={onChange}
      style={{ width: '100%' }}
      />
    </div>
  );
}

export default Toolbox
