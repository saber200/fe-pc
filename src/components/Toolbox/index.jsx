import React, { useEffect, useState } from 'react'
import _ from "lodash";
import { Tabs, Button } from 'antd';
import DropButton from '@components/Drop';
import './style.scss'

const Toolbox = props => {
  const { dropItems, submit } = props;

  const items = [
    {
      key: 'form',
      label: '表单组件',
      children: <div className='continer'>
        {dropItems?.map((item, inx) => {
          return item.layout ? null : <DropButton compId={item.instanceId} key={`dropbtn_${inx}`} text={item.name} />
        })}
      </div>
    },
    {
      key: 'other',
      label: '自定义组件',
      children: 'Content of Tab Pane 3',
    }
  ];

  return (
    <div className='continer' style={{ height: '100%', justifyContent: 'space-between' }}>
      <Tabs
      defaultActiveKey="layout"
      type="card"
      items={items}
      style={{ width: '100%' }}
      />
      <Button onClick={submit}>提交</Button>
    </div>
  );
}

export default Toolbox
