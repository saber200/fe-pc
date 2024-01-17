import React, { useEffect, useState } from 'react';
import { Form, Input, Radio, Select, Button } from 'antd';
import { yesOrNo } from '@/utils/commonDict';

const ConfigItem = props => {
  const [form] = Form.useForm();
  const { childItem, json } = props;

  const submit = () => {
    const subConfig = {
      // ...props.childItem,
      ...form.getFieldsValue()
    }

    console.log(subConfig);

    // 上传json
  }

  const setElement = (data) => {
    const item = { ...data }
    const { type } = item;
    const value = item.value ? item.value : item.defaultValue ? item.defaultValue : '';

    switch (type) {
      case 'string':
        return <Input defaultValue={value} />
      case 'boolean':
        item.valueSource = item.valueSource ? item.valueSource : yesOrNo;
        return (
          <Radio.Group defaultValue={value}>
            {item.valueSource.map(part => {
              return <Radio value={part.value}>{part.label}</Radio>
            })}
          </Radio.Group>
        )
      case 'select':
        return (
          <Select defaultValue={value} options={item.valueSource} />
        )
      default:
        return null
    }
  }

  useEffect(() => {
    console.log(childItem[0]);
  }, [])

  return (
    <Form
      name="configForm"
      style={{
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap'
      }}
      form={form}
    >
      {/* 属性 */}
      {childItem[0].render.props.map(item => {
        return (
          <div style={{ width: 'calc(50% - 20px)', margin: '10px' }}>
            <div>{item.showName}</div>
            <Form.Item
              key={item.id}
              name={item.name}
            // label={item.showName}
            >
              {setElement(item)}
            </Form.Item>
          </div>
        )
      })}

      <Form.Item>
        <Button onClick={submit}>提交</Button>
      </Form.Item>
      {/* {
        json.data.map(item => {

          return (
            <Form.Item key={item.id} name={item.id} label={item.toolbox.showName}>
              <Input defaultValue={item.toolbox.name} />
            </Form.Item>
          )
        })
      } */}
    </Form>
  )
}

export default ConfigItem;