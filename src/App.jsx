import React from 'react';
import { Layout } from 'antd';
import { Routes, Route } from 'react-router-dom'
import MyFirstGrid from './page/index'
import Home from './page/Home'
import Header from '@/components/Header/index'
import MenuComponent from '@/components/Menu/index'
import './App.css'

const App = () => {
  return (
    <Layout
      style={{
        height: '100%',
        marginBottom: '20px'
      }}
    >
      <Header />
      <div className='main'>
        <MenuComponent />
        <Routes>
          <Route path='/' index element={<Home />}/>
          <Route path='/page_1' index element={<Home />}/>
        </Routes>
      </div>
    </Layout>
  );
};
export default App;
