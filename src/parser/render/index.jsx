import React, { useState, useEffect } from 'react'
import _ from "lodash";
import axios from 'axios';
import { WidthProvider, Responsive } from "react-grid-layout";
import { Button, Drawer } from 'antd';
import DropConponents from '@components/drop/index';
import ConfigItem from '@/config/index';

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import './style.css'

const { DropButton } = DropConponents;
const ResponsiveGridLayout = WidthProvider(Responsive);

const MyFirstGrid = (props) => {
  const [mockJson, setMockJson] = useState({});
  const [dropItems, setDropItems] = useState([]);
  const [state, setState] = useState({
    list: [],
    open: false,
    openInx: null,
    childItem: {}
  });

  // 添加断点
  const setDrop = (layout, layoutItem, e) => {
    const compId = e.dataTransfer.getData("compId")
    const newLayoutItem = {
      ...layoutItem,
      i: compId,
      h: 1,
      w: 3,
      minW: 2
    }
    
    // 初始化断点属性
    setState({
      ...state,
      list: state.list.concat(newLayoutItem)
    });

    onSetDropItems(newLayoutItem);
  }

  const onSetDropItems = (newLayoutItem) => {
    let newDropItems = [...dropItems];
    newDropItems = newDropItems.map(item => {
      if(item.instanceId === newLayoutItem.i){
        item.render.layout = newLayoutItem;
      }

      return item;
    })

    setDropItems(newDropItems);
  }

  // 移动断点
  const onDragStop = (layout, oldItem, newItem) => {
    const id = newItem.i.replace(/_\d+$/, "");
    if(oldItem.x === newItem.x && oldItem.y === newItem.y){
      const id = newItem.i.replace(/_\d+$/, "");
      onOpen(id);
      return false;
    }

    const newItems = layout.map(item => ({...item, i: id}));

    setState({
      ...state,
      list: newItems
    })

    onSetDropItems(newItems);
  }

  // 修改断点大小
  const onResizeStop = (layout, newItem) => {
    const id = newItem.i.replace(/_\d+$/, "");

    const newItems = layout.map(item => ({...item, i: id}));
    setState({
      ...state,
      list: newItems
    })

    onSetDropItems(newItems);
  }

  // 打开配置弹窗
  const onOpen = id => {
    setState({
      ...state,
      open: !state.open,
      childItem: mockJson.data.filter(item => item.instanceId === id)
    })
  }

  // 获取json
  const initConfig = async () => {
    const result = await axios('mock.json');
    setMockJson(result.data);
    setDropItems(result.data.data);
  }

  // 渲染断点
  const createElement = (item, inx) => {
    return (
      <div
      key={`${item.i}_${inx}`}
      className='list-item'
      data-grid={item}
      >
        <div className='list-item-close' onClick={() => { console.log(123) }}>x</div>
      </div>
    )
  }

  useEffect(() => {
    initConfig();
  }, [])

  useEffect(() => {
    let newDropItems = [...dropItems];
    state.list.map(item => {
      newDropItems = newDropItems.filter(dropItem => item.i !== dropItem.instanceId);
    })

    setDropItems(newDropItems);
  }, [state.list])

  return (
    <div className='create-continer'>
      <div className='left'>
        {
          dropItems?.map((item, inx) => {
            return <DropButton compId={item.instanceId} key={`dropbtn_${inx}`} text={item.toolbox.showName} />
          })
        }
      </div>
      <div className='center'>
        <ResponsiveGridLayout
          className="layout"
          layout={state.list}
          rowHeight={30}
          onDrop={setDrop}
          onDragStop={onDragStop}
          onResizeStop={onResizeStop}
          isDroppable
          cols={{ lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 }} // 不同屏幕列数
          compactType={null}
          preventCollision
        >
          {_.map(state.list, (item, inx) => createElement(item, inx))}
        </ResponsiveGridLayout>
      </div>
      <Drawer
      destroyOnClose
      width={800}
      title="配置组件"
      placement="right"
      onClose={() => 
        setState({ ...state, open: false })
      }
      open={state.open}
      >
        <ConfigItem childItem={state.childItem} json={mockJson} />
      </Drawer>
    </div>
  );
}

export default MyFirstGrid
