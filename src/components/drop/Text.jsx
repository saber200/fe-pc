import React from 'react'

const style = {
    width: '100px',
    height: '40px'
}

const DropText = props => {
  return (
    <div>
      <div
        style={style}
        draggable={true}
        unselectable="on"
        onDragStart={e => e.dataTransfer.setData("text", "文本")}
      >文本</div>
    </div>
  );
}

export default DropText
