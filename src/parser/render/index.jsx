import React from 'react'
import _ from "lodash";
import RGL, { Responsive, WidthProvider } from "react-grid-layout";
import { Button } from 'antd';
import DropConponents from '../../components/drop/index';
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import './style.css'

const { DropButton, DropText } = DropConponents;

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const ReactGridLayout = WidthProvider(RGL);

class MyFirstGrid extends React.PureComponent {
  constructor(props) {
    super(props);

    const layout = this.generateLayout();

    this.state = {
      list: [],
      layout
    };
  }

  onDrop = (layout, layoutItem, _event) => {
    const text = _event.dataTransfer.getData('text');
    this.setState({
      ...this.state,
      list: [...this.state.list, {...layoutItem, i: `${text}`, minW: '4'}]
    })
  };

  onClick = e => {
    // 打开配置弹窗
    console.log(e)
  }

  generateDOM() {
    return _.map(_.range(1), function(i) {
      return (
        <div key={i}>
          <span className="text">{i}</span>
        </div>
      );
    });
  }

  generateLayout() {
    const p = this.props;
    const availableHandles = ["s", "w", "e", "n", "sw", "nw", "se", "ne"];

    return _.map(new Array(1), function(item, i) {
      const y = _.result(p, "y") || Math.ceil(Math.random() * 4) + 1;
      return {
        x: (i * 2) % 12,
        y: Math.floor(i / 6) * y,
        w: 2,
        h: y,
        i: i.toString(),
        resizeHandles: availableHandles
      };
    });
  }

  render(){
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
            layout={this.state.layout}
            rowHeight={30}
            width={1200}
            onDrop={this.onDrop}
            isDroppable={true}
            cols={5}
            verticalCompact={false}
          >
            {this.state.list.map((item, inx) => <div key={item.i + inx} className='list-item'>
              <Button onClick={() => this.onClick(inx)}>{item.i}</Button>
            </div>)}
            {/* {this.generateDOM()} */}
          </ReactGridLayout>
        </div>
        <div className='right'></div>
      </div>
    );
  }
}

export default MyFirstGrid