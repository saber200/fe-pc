import DragCop from '@/components/Drag';
import {
  SelectCop,
  ButtonCop,
  TableCop,
  PaginationCop
} from '@/components/CopList';
import {
  selectDefaultConfig,
  buttonDefaultConfig,
  tableDefaultConfig,
  paginationDefaultConfig
} from './defaultConfig';
import './style.scss';

const ComponentList = () => {
  return (
    <div className='component_list'>
      <DragCop defaultData={selectDefaultConfig} style={{ width: '100%' }}>
        <SelectCop style={{ width: '100%' }} />
      </DragCop>
      <DragCop defaultData={buttonDefaultConfig} style={{ width: '100%' }}>
        <ButtonCop />
      </DragCop>
      <DragCop defaultData={tableDefaultConfig} style={{ width: '100%' }}>
        <TableCop />
      </DragCop>
      <DragCop defaultData={paginationDefaultConfig} style={{ width: '100%' }}>
        <PaginationCop />
      </DragCop>
    </div>
  )
}

export default ComponentList
