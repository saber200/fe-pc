/*
 * @Author: v_qubo02 v_qubo02@baidu.com
 * @Date: 2024-05-16 11:16:09
 * @LastEditors: v_qubo02 v_qubo02@baidu.com
 * @LastEditTime: 2024-05-22 15:14:18
 * @FilePath: /fe-pc/src/components/Select/index.jsx
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
import { Select } from 'antd';
import DragCop from '@/components/Drag';

const SelectCop = props => {
  const defaultData = {
    w: 12,
    h: 1,
    static: true,
    maxH: 1,
    i: 'select',
    type: 'select',
    showName: '下拉框'
  };

  return (
    // <DragCop defaultData={defaultData} style={props.style || {}}>
    <Select
      placeholder="拖动创建下拉框"
      style={{ width: '100%' }}
      dropdownStyle={{ display: 'none' }}
    />
    // </DragCop>
  )
}

export default SelectCop
