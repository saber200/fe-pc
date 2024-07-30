/*
 * @Author: v_qubo02 v_qubo02@baidu.com
 * @Date: 2024-07-02 11:13:20
 * @LastEditors: v_qubo02 v_qubo02@baidu.com
 * @LastEditTime: 2024-07-09 15:06:13
 * @FilePath: /fe-pc/src/App.jsx
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { Routes, Route } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
// import MenuComponent from '@/components/Menu/index'
import Home from './page/Home'
import Header from '@/components/Header/index'
// import Menus from '@/components/Menus';
// import PageList from '@/page/PageList';
import './App.scss'

// const { Content, Sider } = Layout;

const App = () => {
  const dispatch = useDispatch();
  const pageConfig = useSelector(state => state);
  const [pageInitType, setPageInitType] = useState(true);

  useEffect(() => {
    const pageConfigChach = JSON.parse(window.localStorage.getItem('pageConfig'));
    if(pageConfigChach){
      dispatch({
        type: 'initPageConfig',
        state: pageConfigChach
      })
    }

    setPageInitType(false);
  }, [])

  useEffect(() => {
    if(!pageInitType){
      window.localStorage.setItem('pageConfig', JSON.stringify(pageConfig));
    }
  }, [pageConfig]);

  return (
    <Layout
    style={{
      height: '100%',
      marginBottom: '20px'
    }}
    >
      <Header />
      <Home />
      {/* <Layout>
        <Sider>
          <Menus />
        </Sider>
        <Content>
          <Routes>
            <Route path='/' index element={<Home />}/>
            <Route path='/pages' element={<PageList />}/>
          </Routes>
        </Content>
      </Layout> */}
    </Layout>
  );
};
export default App;
