import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { Routes, Route } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
// import MenuComponent from '@/components/Menu/index'
import Home from './page/Home'
import Header from '@/components/Header/index'
import ConfigForm from '@/components/ConfigForm'
import Menus from '@/components/Menus';
import PageList from '@/page/PageList';
import './App.scss'

const { Content, Sider } = Layout;

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
      console.log(2)
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
      <Layout>
        <Sider>
          <Menus />
        </Sider>
        <Content>
          <Routes>
            <Route path='/' index element={<Home />}/>
            <Route path='/pages' element={<PageList />}/>
            {/* <Route path='/config' element={<ConfigForm />}/> */}
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;
