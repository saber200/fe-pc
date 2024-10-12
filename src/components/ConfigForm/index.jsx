import React, { useEffect, useState } from 'react';
import { Form, Input, Radio, Select, Button, InputNumber, Divider, Modal, Tabs } from 'antd';
import { yesOrNo } from '@/utils/commonDict';
import { useSelector, useDispatch } from 'react-redux';
import './style.scss';

const ConfigForm = props => {
  const [form] = Form.useForm();
  const pageConfig = useSelector(state => state); // 所有公共状态
  const editOptionName = useSelector(state => state.editOptionName); // 当前拖动组件
  const editComp = useSelector(state => state.editComp); // 所有公共状态
  const dispatch = useDispatch();

  const switchCompoments = item => {
    let { type, defaultValue, valueSource } = item;

    if(type === 'primary | ghost | dashed | link | text | default' || type === 'large | middle | small'){
      type = 'select'
    }

    switch(type){
      case 'string': 
        return <Input defaultValue={defaultValue} />

      case 'number':
        return <InputNumber defaultValue={defaultValue} style={{ width: '100%' }} />
      
      case 'select':
        return <Select options={valueSource} defaultValue={defaultValue} />

      case 'boolean':
        return (
          <Radio.Group defaultValue={defaultValue}>
            {yesOrNo.map(radio => <Radio value={radio.value}>{radio.label}</Radio>)}
          </Radio.Group>
        )

      case 'com':
        return <span>{defaultValue}</span>

      default: 
        return <Input defaultValue={defaultValue} />
    }
  }

  const onFieldsChange = val => {
    const key = Object.getOwnPropertyNames(val)[0];
    const value = val[key];
    const editOption = pageConfig.layouts.find(item => item.id === editOptionName);
    const editInx = pageConfig.layouts.findIndex(item => item.id === editOptionName);
    const propsInx = editOption.render.props.findIndex(item => item.name === key);

    editOption.render.props[propsInx].value = value;

    pageConfig.layouts[editInx] = editOption;

    dispatch({
      type: 'changeLayouts',
      layouts: pageConfig.layouts
    })
  }

  return (
    <div className='config'>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane key="tab_1" tab="基础配置">
          <Form
          className='config_form'
          labelCol={{
            span: 9
          }}
          labelAlign='left'
          form={form}
          onValuesChange={onFieldsChange}
          >
            {editComp?.render?.props.map(item => {
              return (
                <Form.Item
                name={item.name}
                key={item.name}
                label={item.showName}
                initialValue={item.value ? item.value : item.defaultValue ? item.defaultValue : ''}
                >
                  {switchCompoments(item)}
                </Form.Item>
              )
            })}
          </Form>
        </Tabs.TabPane>
        <Tabs.TabPane key="tab_2" tab="事件配置">
          事件配置
        </Tabs.TabPane>
        <Tabs.TabPane key="tab_3" tab="其它配置">
          其它配置
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}

export default ConfigForm;