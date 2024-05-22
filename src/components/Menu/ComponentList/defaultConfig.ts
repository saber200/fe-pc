/*
 * @Author: v_qubo02 v_qubo02@baidu.com
 * @Date: 2024-05-22 15:08:42
 * @LastEditors: v_qubo02 v_qubo02@baidu.com
 * @LastEditTime: 2024-05-22 16:05:53
 * @FilePath: /fe-pc/src/components/Menu/ComponentList/defaultConfig.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
const selectDefaultConfig = {
  w: 12,
  h: 1,
  static: true,
  maxH: 1,
  i: 'select',
  type: 'select',
  showName: '下拉框'
};

const buttonDefaultConfig = {
  w: 4,
  h: 1,
  static: true,
  i: 'button',
  type: 'button',
  label: '按钮'
};

const tableDefaultConfig = {
  w: 12,
  h: 6,
  static: true,
  i: 'table',
  type: 'table',
  minH: 6,
  maxH: Infinity
};

const paginationDefaultConfig = {
  w: 12,
  h: 1,
  static: true,
  i: 'pagination',
  type: 'pagination',
  maxH: 1
};

export {
  selectDefaultConfig,
  buttonDefaultConfig,
  tableDefaultConfig,
  paginationDefaultConfig
}