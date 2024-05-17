import { Button } from 'antd';
import DragCop from '@/components/Drag';

const SelectCop = () => {
  const defaultData = {
    w: 4,
    h: 1,
    static: true,
    i: 'button'
  };

  return (
    <DragCop defaultData={defaultData}>
      <Button>拖拽获得按钮</Button>
    </DragCop>
  )
}

export default SelectCop
