import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import Home from './page/Home'
import Header from '@/components/Header/index'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import './App.scss'

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
    </Layout>
  );
};
export default App;
