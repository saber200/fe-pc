import React, { useState, useEffect } from 'react'
import _ from "lodash";
import { WidthProvider, Responsive } from "react-grid-layout";
import { Drawer, Button } from 'antd';
import ConfigForm from '@/page/Form';
import Toolbox from '@components/Toolbox';
import PageConfig from '@components/PageConfig';
import mapConfig from '@/config/mapConfig';
import { getJson } from '@/utils/apis/saveJson';
import saveJson from '@/utils/apis/saveJson';

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import './style.css'

const ResponsiveGridLayout = WidthProvider(Responsive);

const MyFirstGrid = (props) => {
  const [oldXY, setOldXY] = useState({ x: 0, y: 0 });
  const [startMove, setStartMove] = useState(false);
  const [isRemove, setIsRemove] = useState(true);
  const [mockJson, setMockJson] = useState({});
  const [state, setState] = useState({
    list: [],
    open: false,
    openInx: null,
    childItem: {}
  });

  // 添加断点
  const setDrop = (layout, layoutItem, e) => {
    const newMockJson = { ...mockJson };
    const text = e.dataTransfer.getData("innertext");
    const compId = e.dataTransfer.getData("compId");

    const newLayoutItem = {
      ...layoutItem,
      i: compId,
      h: 1,
      w: 3,
      minW: 2,
      text,
      isWeapp: true
    }

    newMockJson.data.map(item => {
      if (item.instanceId === compId) {
        item.layout = newLayoutItem;
      }
    })

    setMockJson(newMockJson);
  }

  // 打开配置弹窗
  const onOpen = (id, e) => {
    const customData = e.target.getAttribute('data-type');
    if (!customData || customData !== 'remove') {
      let childItem = mockJson.data.filter(item => item.render.layout.i === id)[0];

      setState({
        ...state,
        open: true,
        childItem
      })
    }
  }

  const onDragStart = (layout, oldItem, newItem) => {
    setOldXY({ x: oldItem.x, y: oldItem.y })
    setStartMove(true)
  }

  // 移动断点
  const onDragStop = (layout, oldItem, newItem, nothe, e) => {
    setStartMove(false)
    const newMockJson = { ...mockJson };

    const newX = newItem.x, newY = newItem.y;
    const oldX = oldXY.x, oldY = oldXY.y;

    if (oldX === newX && oldY === newY) {
      onOpen(newItem.i.replace(/_\d+$/, ""), e);
      return false;
    } else {
      const newItems = layout.map((item, inx) => {
        return ({ ...item, i: item.i.replace(/_\d+$/, ""), text: newMockJson.data[inx].name, isWeapp: true });
      });

      newMockJson.data = newMockJson.data.map(item => {
        newItems.map(layouts => {
          if (layouts.i === item.instanceId) {
            item.layout = layouts;
          }
        })

        return item;
      })

      setMockJson(newMockJson)
    }
  }

  // 修改断点大小
  const onResizeStop = (layout) => {
    const newMockJson = { ...mockJson };

    const newItems = layout.map((item, inx) => ({ ...item, i: item.i.replace(/_\d+$/, ""), text: newMockJson.data[inx].name, isWeapp: true }));
    newMockJson.data.map(item => {
      newItems.map(layouts => {
        if (layouts.i === item.instanceId) {
          item.layout = layouts;
        }
      })

      return item;
    })

    setMockJson(newMockJson);
  }

  // 删除断点
  const onRemovelayout = (e, id) => {
    e.stopPropagation();
    const customData = e.target.getAttribute('data-type');

    if (customData === 'remove') {
      let newMockJson = { ...mockJson };
      newMockJson.data.map((item, inx) => {
        if (item.instanceId === id) {
          newMockJson.data[inx].layout = undefined;
        }

        return item;
      })

      setMockJson(newMockJson);
    }
  }

  // 获取json
  const initConfig = async () => {
    const result = await getJson();
    setMockJson(result.data.json);
  }

  // 渲染断点
  const createElement = (item, inx) => {
    return !item ? null : (
      <div key={`${item.i}_${inx}`} className='list-item' data-grid={item}>
        <Button style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{item.text}</Button>
        <span className='list-item-close' data-type='remove' onClick={(e) => onRemovelayout(e, item.i)}>x</span>
      </div>
    )
  }

  useEffect(() => {
    initConfig();
  }, [])

  const submit = () => {
    saveJson(mockJson);
  }

  return (
    <div className='create-continer'>
      <PageConfig setMockJson={setMockJson} mockJson={mockJson} />
      <Toolbox dropItems={mockJson.data} />
      <div className='center'>
        <ResponsiveGridLayout
          className="layout"
          layout={mockJson.data}
          rowHeight={30}
          onDragStart={onDragStart}
          onDrop={setDrop}
          onDragStop={onDragStop}
          onResizeStop={onResizeStop}
          isDroppable
          cols={{ lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 }} // 不同屏幕列数
          compactType={null}
          preventCollision
        >
          {_.map(mockJson.data, (item, inx) => createElement(item.layout, inx))}
        </ResponsiveGridLayout>
        <div className='buttom-menus'>

        </div>
      </div>
      <Button onClick={submit}>提交</Button>
      <Drawer
        destroyOnClose
        width={800}
        title="配置组件"
        placement="right"
        onClose={() => setState({ ...state, open: false })}
        open={state.open}
      >
        {state.open ? <ConfigForm closeOpen={() => setState({ ...state, open: false })} childItem={state.childItem} layouts={mockJson.data} json={mockJson} setJson={setMockJson} /> : null}
      </Drawer>
    </div>
  );
}

export default MyFirstGrid
