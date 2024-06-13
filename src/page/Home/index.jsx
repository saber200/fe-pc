/*
 * @Author: v_qubo02 v_qubo02@baidu.com
 * @Date: 2024-05-15 14:33:11
 * @LastEditors: v_qubo02 v_qubo02@baidu.com
 * @LastEditTime: 2024-05-22 16:58:02
 * @FilePath: /fe-pc/src/page/Home/index.jsx
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
import _ from "lodash";
import { WidthProvider, Responsive } from "react-grid-layout";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from 'antd';
import {
  SelectCop,
  ButtonCop,
  TableCop,
  PaginationCop
} from '@/components/CopList.js';
import './style.css'

const ResponsiveGridLayout = WidthProvider(Responsive);

const Home = () => {
  const [list, setList] = useState([]); // layouts
  const gridData = useSelector(state => state.gridData); // 当前拖动组件属性

  // 添加组件
  const onAddDrop = (layout, inx) => {
    const { i, w, h, type } = gridData;
    const newLayout = {
      ...layout,
      i: `${i}_${inx}`,
      w,
      h,
      type
    };

    const newList = [...list];
    newList.push(newLayout);

    setList(newList);
  }

  // 选择组件
  const selectedComponent = (type, el) => {
    switch(type){
      case 'select':
        return <SelectCop style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} />
      case 'button':
        return <ButtonCop style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} />
      case 'table':
        return <TableCop style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} />
      case 'pagination':
        return <PaginationCop style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} />
      default:
        return <Button style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{el.i}</Button>
    }
  }

  // 创建组件
  const createElement = (el, inx) => {
    return (
      <div key={el.i} className='list-item' data-grid={el}>
        {selectedComponent(el.type, el)}
        <span className='list-item-close' data-type='remove' onClick={(e) => onRemovelayout(e, inx)}>x</span>
      </div>
    )
  }

  // 修改layout
  const onChangeLayout = layout => {
    const newList = list.map((item, inx) => {
      const { x, y, w, h } = layout[inx];
      return {
        ...item,
        x,
        y,
        w,
        h
      }
    })

    setList(newList)
  }

  // 删除layout
  const onRemovelayout = (e, i) => {
    const newList = [...list];
    newList.splice(i, 1);

    setList(newList);
  }

  // 外部移入元素时调用
  const onDrop = layout => onAddDrop(layout[layout.length - 1], layout.length - 1);

  // 移动完成
  const onDragStop = layout => onChangeLayout(layout);

  // 改变尺寸
  const onResizeStop = layout => onChangeLayout(layout);

  // 外部拖入及移动时
  const onDropDragOver = e => ({ ...gridData });

  return (
    <div className="home">
      <ResponsiveGridLayout
        layout={list}
        rowHeight={30}
        isDroppable
        cols={{ lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 }} // 不同屏幕列数
        compactType={null}
        preventCollision
        className="grid_layout"
        onDrop={onDrop}
        onDragStop={onDragStop}
        onDropDragOver={onDropDragOver}
        onResizeStop={onResizeStop}
      >
        {_.map(list, (el, inx) => createElement(el, inx))}
      </ResponsiveGridLayout>
    </div>
  )
}

export default Home