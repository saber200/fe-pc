import React from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, theme } from 'antd';
import { Routes, Route } from 'react-router-dom'
import MyFirstGrid from './page/index'
import './App.css'

const { Header, Content, Footer, Sider } = Layout;
// const items1 = ['1', '2', '3'].map((key) => ({
//   key,
//   label: `nav ${key}`,
// }));
const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
  const key = String(index + 1);
  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,
    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});
const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout
      style={{
        height: '100%',
        marginBottom: '20px'
      }}
    >
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          color: '#fff'
        }}
      >
        页面名
      </Header>
      <Routes>
        <Route path='/:id' index element={<MyFirstGrid />}/>
      </Routes>
    </Layout>
  );
};
export default App;