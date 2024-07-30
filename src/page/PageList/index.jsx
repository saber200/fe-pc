/*
 * @Author: v_qubo02 v_qubo02@baidu.com
 * @Date: 2024-07-02 16:00:35
 * @LastEditors: v_qubo02 v_qubo02@baidu.com
 * @LastEditTime: 2024-07-07 19:37:28
 * @FilePath: /fe-pc/src/page/PageList/index.jsx
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
import _ from "lodash";
import { Table, Button, Modal, Form, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import './style.scss'

const PageList = () => {
  const pageConfig = useSelector(state => state);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const setIndex = (data) => {
    dispatch({
      type: 'setIndex',
      page_id: data.page_id
    })
  }

  const onSetBuildPageId = (data) => {
    setOpen(true);
    dispatch({
      type: 'setBuildPageId',
      buildPageId: data.page_id
    })
  }
  
  const columns = [
    {
      title: '页面名称',
      dataIndex: 'page_name',
      key: 'page_name',
    },
    {
      title: '页面id',
      dataIndex: 'page_id',
      key: 'page_id',
    },
    {
      title: '页面层级',
      dataIndex: 'page_level',
      key: 'page_level',
    },
    {
      title: '操作',
      dataIndex: 'page_setting',
      key: 'page_setting',
      render: (text, data) => {
        return (
          <div>
            <a style={{ marginRight: '10px' }} onClick={() => onSetBuildPageId(data)}>编辑</a>
            { !data.index ?  <a onClick={() => setIndex(data)}>设为主页</a> : null }
          </div>
        )
      },
    },
  ];

  const createPage = () => {
    dispatch({
      type: 'createPage',
    })
  }

  return (
    <div className="page_list">
      <div style={{ marginBottom: '20px' }}>
        <Button type="primary" onClick={createPage}>新建页面</Button>
      </div>
      <Table
      dataSource={pageConfig.pages}
      columns={columns}
      pagination={false}
      />
      <Modal
      open={open}
      onCancel={() => setOpen(false)}
      >
        <h2>页面编辑</h2>
        <Form>
        {Object.keys(pageConfig.pages[0]).map(key => {
          const value = pageConfig.pages[0][key];
          return (
            <Form.Item>
              <span>{key}</span>
              <Input defaultValue={value} />
            </Form.Item>
          )
        })}
        </Form>
      </Modal>
    </div>
  )
}

export default PageList