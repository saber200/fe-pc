import React from 'react'
import { Button } from 'antd';

const style = {
    width: '100px',
    height: '40px'
}

const DropButton = props => {
  const { compId, text } = props;

  return (
    <div>
      <Button
        style={style}
        draggable={true}
        unselectable="on"
        onDragStart={e => {
          e.dataTransfer.setData("compId", compId)
          e.dataTransfer.setData("innertext", text)
        }}
      >{text}</Button>
    </div>
  );
}

export default DropButton
