import React from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'
import { Menu } from 'antd';
const items = [
  {
    key: '/',
    label: '欢迎页',
    icon: <MailOutlined />
  },
  {
    key: 'sub2',
    label: '页面1',
    icon: <AppstoreOutlined />
  }
];

const PageMenu = () => {
  const route = useNavigate()

  const onClick = (e) => {
    route(e.key, {
      
    })
  };

  return (
    <Menu
      onClick={onClick}
      style={{
        width: 310,
      }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={items}
    />
  );
};
export default PageMenu;