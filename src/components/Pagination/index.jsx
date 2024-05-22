/*
 * @Author: v_qubo02 v_qubo02@baidu.com
 * @Date: 2024-05-19 11:56:36
 * @LastEditors: v_qubo02 v_qubo02@baidu.com
 * @LastEditTime: 2024-05-22 15:47:10
 * @FilePath: /fe-pc/src/components/Pagination/index.jsx
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
import { Pagination } from 'antd';

const PaginationCop = props => {
  return (
    <Pagination defaultCurrent={1} total={50} />
  )
}

export default PaginationCop
