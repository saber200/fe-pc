import React from 'react';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom'

const menusStyle = {
  width: '200px',
  height: '100%',
  overflowY: 'auto'
}

const items = [
  {
    key: '/pages',
    label: '页面',
    icon: <BarsOutlined />
  },
  {
    key: '/',
    label: '组件',
    icon: <AppstoreOutlined />
  }
];

const Menus = () => {
  const route = useNavigate();

  const onClick = (e) => {
    route(e.key);
  };

  return (
    <Menu
    style={menusStyle}
    mode="inline"
    items={items}
    onClick={onClick}
    />
  )
}

export default Menus;