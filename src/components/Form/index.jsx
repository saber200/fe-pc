import React, { useEffect, useState } from 'react';
import { Form, Input, Radio, Select, Button, InputNumber, Divider } from 'antd';
// import buttonConfig from '@/config/buttonConfig';
import { yesOrNo } from '@/utils/commonDict';

const ConfigForm = props => {
  const [form] = Form.useForm();
  const { childItem, json } = props;

  const submit = () => {
    const childItem = { ...props.childItem };
    const propsItem = { ...form.getFieldsValue() };

    childItem.render.props = childItem.render.props.map(item => ({ ...item, value: propsItem[item.name] }))

    const subConfig = childItem;

    console.log(JSON.stringify(subConfig))

    // 上传json
  }

  const getValue = (item) => {
    return item.value ? item.value : item.defaultValue ? item.defaultValue : '';
  }

  const setElement = (data) => {
    let item = { ...data };
    const { type } = item;

    switch (type) {
      case 'string':
        return <Input />
      case 'number':
        return <InputNumber controls={false} />
      case 'boolean':
        item.valueSource = item.valueSource ? item.valueSource : yesOrNo;
        return (
          <Radio.Group>
            {item.valueSource.map(part => {
              return <Radio value={part.value}>{part.label}</Radio>
            })}
          </Radio.Group>
        )
      case 'select':
        return (
          <Select options={item.valueSource} />
        )
      case 'com':
        return <img src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" style={{ width: '50px', height: '50px' }} />
      case 'primary | ghost | dashed | link | text | default':
        return (
          <Select options={item.valueSource} />
        )
      default:
        return null
    }
  }

  useEffect(() => {
    console.log(childItem)
  }, [])

  return (
    <>
      <Form
        name="configForm"
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          flexWrap: 'wrap'
        }}
        form={form}
      >
        {/* 组件基础信息配置 */}
        <div style={{ width: '100%' }}>
          <h3>基础配置</h3>
        </div>

        <div style={{ width: 'calc(50% - 20px)', margin: '10px' }}>
          <div>组件ID</div>
          <Form.Item
          initialValue={childItem.id}
          >
            <Input disabled value={childItem.id} />
          </Form.Item>
        </div>
        <div style={{ width: 'calc(50% - 20px)', margin: '10px' }}>
          <div>组件类型</div>
          <Form.Item
          initialValue={childItem.name}
          >
            <Input disabled value={childItem.name} />
          </Form.Item>
        </div>

        {/* 分割线 */}
        <Divider />

        {/* 组件属性配置 */}
        <div style={{ width: '100%' }}>
          <h3>属性</h3>
        </div>
        {childItem.render.props.map(item => {
          return (
            <div style={{ width: 'calc(50% - 20px)', margin: '10px' }}>
              <div>{item.showName}</div>
              <Form.Item
                initialValue={getValue(item)}
                key={item.id}
                name={item.name}
              >
                {setElement(item)}
              </Form.Item>
            </div>
          )
        })}
      </Form>
      <div>
        <Button onClick={submit}>提交</Button>
      </div>
    </>
  )
}

export default ConfigForm;