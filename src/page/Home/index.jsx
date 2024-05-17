import _ from "lodash";
import { WidthProvider, Responsive } from "react-grid-layout";
import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import './style.css'

const ResponsiveGridLayout = WidthProvider(Responsive);

const Home = () => {
  const layoutRef = useRef(null);
  const [list, setList] = useState([]);
  const gridData = useSelector(state => state.gridData);

  const onAddDrop = () => {
    console.log(123);
  }

  const createElement = (item, inx) => {
    return <div key={`${inx}_${item.i}`}>{item.i}</div>
  }

  const onDrop = (layout, layoutItem, e) => {
  }

  const onDrag = (layout, oldItem, newItem, placeholder, e, element) => {
  }

  const onDragStart = (layout, oldItem, newItem, placeholder, e, element) => {
  }

  const onDragStop = (layout, oldItem, newItem, placeholder, e, element) => {
  }

  const onDropDragOver = (e) => {
    return {
      w: gridData.w,
      h: gridData.h,
      i: gridData.i
    }
  }

  return (
    <div className="home">
      <ResponsiveGridLayout
        ref={layoutRef}
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
      >
        {_.map(list, (item, inx) => createElement(item, inx))}
      </ResponsiveGridLayout>
    </div>
  )
}

export default Home