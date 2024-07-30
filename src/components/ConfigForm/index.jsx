import React, { useEffect, useState } from 'react';
import { Form, Input, Radio, Select, Button, InputNumber, Divider, Modal, Tabs } from 'antd';
import { yesOrNo } from '@/utils/commonDict';
import { useSelector } from 'react-redux';
import './style.scss';

const ConfigForm = props => {
  const [form] = Form.useForm();
  const componentConfig = useSelector(state => state.componentConfig); // 所有公共状态

  const onChangeTabs = (key) => {
    console.log(form.getFieldsValue())
  };

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

  return (
    <div className='config'>
      <Tabs defaultActiveKey="1" onChange={onChangeTabs}>
        <Tabs.TabPane key="tab_1" tab="基础配置">
          <Form
          className='config_form'
          labelCol={{
            span: 9
          }}
          labelAlign='left'
          form={form}
          >
            {componentConfig?.render?.props.map(item => {
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