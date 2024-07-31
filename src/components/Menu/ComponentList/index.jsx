import DragCop from '@/components/Drag';
import SelectIcon from "@/assets/i-select.svg?react";
import ButtonIcon from "@/assets/i-button.svg?react";
import PaginationIcon from "@/assets/i-pagination.svg?react";
import TableIcon from "@/assets/i-table.svg?react";
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
      <DragCop defaultData={selectDefaultConfig}>
        <div className='component_part'>
          <SelectIcon />
          <div>下拉框</div>
        </div>
      </DragCop>
      <DragCop defaultData={buttonDefaultConfig}>
        <div className='component_part'>
          <ButtonIcon />
          <div>按钮</div>
        </div>
      </DragCop>
      <DragCop defaultData={tableDefaultConfig}>
        <div className='component_part'>
          <TableIcon />
          <div>表格</div>
        </div>
      </DragCop>
      <DragCop defaultData={paginationDefaultConfig}>
        <div className='component_part'>
          <PaginationIcon />
          <div>分页</div>
        </div>
      </DragCop>
    </div>
  )
}

export default ComponentList
