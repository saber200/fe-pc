import React from 'react'
import { Button } from 'antd';

const style = {
    width: '100px',
    height: '40px'
}

const DropButton = props => {
  return (
    <div>
      <Button
        style={style}
        draggable={true}
        unselectable="on"
        onDragStart={e => e.dataTransfer.setData("text", props.text)}
      >{props.text}</Button>
    </div>
  );
}

export default DropButton
