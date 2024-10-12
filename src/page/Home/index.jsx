import _ from "lodash";
import { WidthProvider, Responsive } from "react-grid-layout";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from 'antd';
import ConfigForm from '@/components/ConfigForm'
import ComponentList from '@/components/Menu/ComponentList/index'
import {
  SelectCop,
  ButtonCop,
  TableCop,
  PaginationCop
} from '@/components/CopList.js';
import copConfigs from '@/utils/copConfigs'
import './style.css'

const ResponsiveGridLayout = WidthProvider(Responsive);

const Home = props => {
  const layouts = useSelector(state => state.layouts); // list
  const gridData = useSelector(state => state.gridData); // 当前拖动组件属性
  const dispatch = useDispatch();

  // 添加组件
  const onAddDrop = (layout, inx) => {
    const { i, w, h, type } = gridData;
    const newLayout = {
      ...copConfigs[type],
      id: `${i}_${inx}`,
      layout: {
        ...layout,
        i: `${i}_${inx}`,
        w,
        h,
        inx,
        type
      }
    };

    const newList = [...layouts];
    newList.push(newLayout);

    dispatch({
      type: 'changeLayouts',
      layouts: newList
    })

    dispatch({
      type: 'changeConfig',
      editOptionName: newLayout.id,
      config: newLayout
    })
  }

  // 渲染组件
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

  // 编辑组件
  const EleClick = el => {
    console.log(layouts, el)
    const editLayout = layouts.filter(item => item.id === el.i)[0]

    dispatch({
      type: 'changeConfig',
      editOptionName: editLayout.id,
      config: editLayout
    })
  }

  // 在画布创建组件
  const createElement = (el, inx) => {
    const { layout } = el;
    return (
      <div key={layout.i} className='list-item' data-grid={layout} onClick={() => EleClick(layout)}>
        {selectedComponent(layout.type, layout)}
        <span className='list-item-close' data-type='remove' onClick={(e) => onRemovelayout(e, inx)}>x</span>
      </div>
    )
  }

  // 修改layout
  const onChangeLayout = layout => {
    const newList = layouts.map((item, inx) => {
      const { x, y, w, h } = layout[inx];
      return {
        ...item,
        layout: {
          ...item.layout,
          x,
          y,
          w,
          h
        }
      }
    })

    dispatch({
      type: 'changeLayouts',
      layouts: newList
    })
  }

  // 删除layout
  const onRemovelayout = (e, i) => {
    const newList = [...layouts];
    newList.splice(i, 1);

    dispatch({
      type: 'changeLayouts',
      layouts: newList
    })

    dispatch({
      type: 'changeConfig',
      config: {},
      editOptionName: '',
    })
  }

  // 外部移入元素时调用
  const onDrop = layout => onAddDrop(layout[layout.length - 1], layout.length - 1);

  // 移动完成
  const onDragStop = layout => onChangeLayout(layout);

  // 改变尺寸
  const onResizeStop = layout => onChangeLayout(layout);

  // 外部拖入及移动时
  const onDropDragOver = e => ({ ...gridData });

  useEffect(() => {
    
  }, [])

  return (
    <div className="continer">
      <div className="components">
        <ComponentList />
      </div>
      <div className="home">
        <ResponsiveGridLayout
          layout={layouts}
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
          {_.map(layouts, (el, inx) => createElement(el, inx))}
        </ResponsiveGridLayout>
      </div>
      <ConfigForm />
    </div>
  )
}

export default Home