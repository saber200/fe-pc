import React, { useState, useEffect } from 'react'
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";
import { Button, Drawer } from 'antd';
import DropConponents from '../../components/drop/index';
import ConfigItem from '../../config/index';
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import './style.css'

const { DropButton } = DropConponents;
const ReactGridLayout = WidthProvider(RGL);

const MyFirstGrid = (props) => {
  const [state, setState] = useState({
    list: [],
    open: false,
    openInx: null,
    childItem: {}
  });

  const onDrop = (layout, layoutItem, _event) => {
    const text = _event.dataTransfer.getData('text');

    setState({
      ...state,
      list: [...state.list, {...layoutItem, x: 10, y: 28, i: '', minW: 12, w: 12 }]
    })
  };

  const onClick = (inx) => {
    // 打开配置弹窗
    setState({
      ...state,
      open: true,
      childItem: state.list[inx]
    })
  }

  return (
    <div className='create-continer'>
      <div className='left'>
        <DropButton text='按钮' />
        <DropButton text='文本' />
        <DropButton text='下拉框' />
        <DropButton text='输入框' />
      </div>
      <div className='center'>
        <ReactGridLayout
          className="layout"
          layout={state.layout}
          rowHeight={30}
          width={1200}
          onDrop={onDrop}
          isDroppable={true}
          cols={8}
          verticalCompact={false}
          preventCollision={true}
        >
          {state.list.map((item, inx) => {
            return (
              <div key={item.i + inx} className='list-item'>
                <Button onClick={() => onClick(inx)}>{item.i}</Button>
              </div>
            )
          })}
        </ReactGridLayout>
      </div>
      <Drawer title="配置组件" placement="right" onClose={() => setState({ ...state, open: false })} open={state.open}>
        <ConfigItem childItem={state.childItem} />
      </Drawer>
    </div>
  );
}

export default MyFirstGrid