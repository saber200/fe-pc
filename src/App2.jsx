import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Layout } from 'antd';
import Home from './page/Home'
import Header from '@/components/Header/index'

import { useCurrentUser, useCurrentApp, useUserPermission, getQuery } from "./utils/lowCodeHooks";

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import './App.scss'

const App = () => {
  const currentUser = useCurrentUser();
  const currentApp = useCurrentApp(currentUser);
  const permission = useUserPermission(currentUser);
  //当前编辑的应用的信息
  const currentEditApp = useSelector((state) => state.editApp);

  const [pageData, setPageData] = useState(null);
  
  const savePageData = () => {
    window.MochaSDK.pageService.updateData(
      {
        id: pageData.id,

        config: JSON.stringify(pageData.config),
      },
      pageData.guid,
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
      setPageData(rootConfig);
    } catch (error) {
      debugger;
      return [];
    }
  };

  // useEffect(() => {
  //   if (!currentEditApp) {
  //     initPageData();
  //   }
  // }, [currentEditApp]);

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

// import React from "react";
// import ReactDOM from "react-dom";
// import { Provider } from "react-redux";
// import { useDispatch, useSelector } from "react-redux";

// import { useCurrentUser, useCurrentApp, useUserPermission } from "./utils/lowCodeHooks";
// import { useState } from "react";
// import { useEffect } from "react";

// function Main() {
//   const currentUser = useCurrentUser();
//   const currentApp = useCurrentApp(currentUser);
//   const permission = useUserPermission(currentUser);
//   //当前编辑的应用的信息
//   const currentEditApp = useSelector((state) => state.editApp);

//   const [pageData, setPageData] = useState(null);

//   /***
//    * 保存页面配置文件
//    */
//   const savePageData = () => {
//     pageService.updateData(
//       {
//         id: pageData.id,

//         config: JSON.stringify(pageData.config),
//       },
//       pageData.guid,
//       1
//     );
//   };
//   const initPageData = async () => {
//     try {
//       let query = getQuery();

//       let id = query.id;

//       let data = await pageService.getDataByGuid(id);

//       let rootConfig = data;
//       if (rootConfig.config) {
//         rootConfig.config = JSON.parse(rootConfig.config);
//       }
//       setPageData(rootConfig);
//     } catch (error) {
//       debugger;
//       return [];
//     }
//   };
//   useEffect(() => {
//     if (!currentEditApp) {
//       initPageData();
//     }
//   }, [currentEditApp]);

//   if (!currentApp) {
//     return <div></div>;
//   }

//   if (!currentUser.globalState) {
//     return <div></div>;
//   }
//   if (currentUser.globalState?.realm == "null") {
//     return <div></div>;
//   }

//   if (permission.init == false) {
//     return <div></div>;
//   }

//   if (pageData == null) {
//     return null;
//   }

//   return null;
// }
