import { useDispatch } from 'react-redux';
import './style.scss';

const DragCop = props => {
  const dispatch = useDispatch();
  const { children, defaultData, style } = props;

  const onDragStart = (e) => {
    dispatch({
      type: 'changeDataFrid',
      gridData: defaultData
    })
  }

  return (
    <div
    className='drag-gird'
    draggable
    isResizable
    onDragStart={onDragStart}
    style={style}
    >
      {children}
    </div>
  )
}

export default DragCop
