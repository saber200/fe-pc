// import { useCurrentUser, useCurrentApp, useUserPermission } from "./utils/lowCodeHooks";
import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { useDispatch } from "react-redux";
import { initialState } from '@/utils/reducers/index';
import Home from './page/Home'
import Header from '@/components/Header/index'
import { appState, getQuery } from "./state";
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import './App.scss'

export default function App() {
  const currentUser = appState.currentValue.currentUser;
  const currentApp = appState.currentValue.currentApp;
  const [loadPageConfig, setLoadPageConfig] = useState();
  const dispatch = useDispatch();

  /***
   * 保存页面配置文件
   */
  const savePageData = pageConfig => {
    window.MochaSDK.pageService.updateData(
      {
        id: loadPageConfig.id,
        config: JSON.stringify(pageConfig),
      },
      loadPageConfig.guid,
      1
    );
  };
  
  const initPageData = async () => {
    try {
      let query = getQuery();
      let id = query.id;
      let data = await window.MochaSDK.pageService.getDataByGuid(id);

      let rootConfig = data;
      if (rootConfig.config) {
        rootConfig.config = JSON.parse(rootConfig.config);
      }

      setLoadPageConfig(rootConfig);

      dispatch({
        type: 'saveConfig',
        state: {
          ...initialState,
          ...rootConfig,
          layouts: rootConfig.config.config || []
        }
      })
    } catch (error) {
      return [];
    }
  };

  useEffect(() => {
    initPageData();
  }, [])

  if (!currentApp) {
    return <div></div>;
  }

  return (
    <Layout
      style={{
        height: '100%',
        marginBottom: '20px'
      }}
    >
      <Header savePageData={savePageData} />
      <Home />
    </Layout>
  );
}
