import React from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, theme } from 'antd';
import { Routes, Route } from 'react-router-dom'
import MyFirstGrid from './page/index'
import './App.css'

const { Header, Content, Footer, Sider } = Layout;
const App = () => {
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
