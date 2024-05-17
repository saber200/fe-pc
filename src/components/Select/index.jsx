import { Select } from 'antd';
import DragCop from '@/components/Drag';

const SelectCop = props => {
  const defaultData = {
    w: 12,
    h: 1,
    static: true,
    i: 'select'
  };

  return (
    <DragCop defaultData={defaultData} style={props.style || {}}>
      <Select
        placeholder="拖动创建下拉框"
        style={{ width: '100%' }}
        dropdownStyle={{ display: 'none' }}
      />
    </DragCop>
  )
}

export default SelectCop
