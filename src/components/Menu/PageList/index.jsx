/*
 * @Author: v_qubo02 v_qubo02@baidu.com
 * @Date: 2024-05-15 16:41:03
 * @LastEditors: v_qubo02 v_qubo02@baidu.com
 * @LastEditTime: 2024-05-17 16:17:05
 * @FilePath: /fe-pc/src/components/Menu/PageList/index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
    key: '/page_1',
    label: '页面1',
    icon: <AppstoreOutlined />
  }
];

const PageMenu = () => {
  const route = useNavigate()

  const onClick = (e) => {
    route(e.key);
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