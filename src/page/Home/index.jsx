/*
 * @Author: v_qubo02 v_qubo02@baidu.com
 * @Date: 2024-05-15 14:33:11
 * @LastEditors: v_qubo02 v_qubo02@baidu.com
 * @LastEditTime: 2024-05-22 15:50:50
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
  const [list, setList] = useState([]);
  const gridData = useSelector(state => state.gridData);

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

  const createElement = (el, inx) => {
    return (
      <div key={el.i} className='list-item' data-grid={el}>
        {selectedComponent(el.type, el)}
        <span className='list-item-close' data-type='remove' onClick={(e) => onRemovelayout(e, inx)}>x</span>
      </div>
    )
  }

  const onRemovelayout = (e, i) => {
    const newList = [...list];
    newList.splice(i, 1);

    setList(newList);
  }

  const onDrop = layout => {
    const inx = layout.length - 1;
    const newLayout = layout[inx];
    onAddDrop(newLayout, inx);
  }

  const onDrag = (layout, oldItem, newItem, placeholder, e, element) => {
  }

  const onDragStart = (layout, oldItem, newItem, placeholder, e, element) => {
  }

  const onDragStop = layout => {
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
  };

  const onResizeStop = layout => {
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
  };

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
        onDrag={onDrag}
        onDragStart={onDragStart}
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