import React from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
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
        height: '100%'
      }}
    >
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          color: '#fff'
        }}
      >
        headers
      </Header>
      <Content
        style={{
          padding: '0 48px',
          height: '100%'
        }}
      >
        <Layout
          style={{
            // padding: '24px 0',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            height: '100%'
          }}
        >
          <Content
            style={{
              padding: '0 24px',
              minHeight: 280,
            }}
          >
            <MyFirstGrid />
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
};
export default App;