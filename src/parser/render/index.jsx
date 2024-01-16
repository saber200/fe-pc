import React, { useState, useEffect } from 'react'
import _ from "lodash";
import axios from 'axios';
import RGL, { WidthProvider, Responsive } from "react-grid-layout";
import { Button, Drawer } from 'antd';
import DropConponents from '@components/drop/index';
import ConfigItem from '@/config/index';
import initConfig from '@/utils/commonConfig';

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import './style.css'

const { DropButton } = DropConponents;
// const ReactGridLayout = WidthProvider(RGL);
// const ResponsiveReactGridLayout = WidthProvider(Responsive);
const ResponsiveGridLayout = WidthProvider(Responsive);

const MyFirstGrid = (props) => {
  const [mockJson, setMockJson] = useState({});
  const [state, setState] = useState({
    list: [],
    open: false,
    openInx: null,
    childItem: {}
  });

  // 拖动添加item
  const setDrop = (layout, layoutItem, e) => {
    // 初始化断点属性
    setState({
      ...state,
      list: state.list.concat({
        ...layoutItem,
        i: '',
        h: 1,
        w: 3,
        minW: 2
      })
    });
  }

  // item move
  const onDragStop = (layout, oldItem, newItem) => {
    if(oldItem.x === newItem.x && oldItem.y === newItem.y){
      const inx = Number(newItem.i.replace(/_/g, ""));
      onOpen(inx);
      return false;
    }

    setState({
      ...state,
      list: layout.map(item => ({...item, i: ''}))
    })
  }

  // 打开配置弹窗
  const onOpen = inx => {
    setState({
      ...state,
      open: !state.open,
      childItem: state.list[inx]
    })
  }

  // 获取json
  const initConfig = async () => {
    const result = await axios('mock.json');
    setMockJson(result.data);
  }

  // 修改大小
  const onResizeStop = (layout, old, next, placeholder, e, el) => {
    setState({
      ...state,
      list: layout.map(item => ({...item, i: ''}))
    })
  }

  useEffect(() => {
    initConfig();
  }, [])

  const createElement = (item, inx) => {
    return (
      <div
      key={`${item.i}_${inx}`}
      className='list-item'
      data-grid={item}
      >
        <Button
        style={{
          width: '100%',
          height: `100%`,
        }}
        >{item.i}</Button>
      </div>
    )
  }

  return (
    <div className='create-continer'>
      <div className='left'>
        {
          mockJson?.data?.map(item => {
            return <DropButton text={item.toolbox.showName} />
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
      <Drawer width={800} title="配置组件" placement="right" onClose={() => setState({ ...state, open: false })} open={state.open}>
        <ConfigItem childItem={state.childItem} json={mockJson} />
      </Drawer>
    </div>
  );
}

export default MyFirstGrid
