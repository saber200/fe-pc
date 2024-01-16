import React, { useEffect, useState } from 'react';
import { Form } from 'antd';

const ConfigItem = props => {
  const [form] = Form.useForm();
  const { childItem, json } = props;

  const submit = () => {
    const subConfig = {
      ...props.childItem,
      ...form.getFieldsValue()
    }

    // 上传json
  }

  useEffect(() => {
    // console.log(childItem)
  }, [])

  return (
    <Form
    name="configForm"
    form={form}
    >
      {
        json.data.map(item => {
          return (
            <Form.Item name={item.id} label={item.toolbox.showName}>
              { item.toolbox.name }
            </Form.Item>  
          )
        })
      }
      {/* <Form.Item name="title" label="标题">
        <Input />
      </Form.Item>
      <Form.Item name="content" label="按钮文字">
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" onClick={submit}>提交</Button>
      </Form.Item> */}
    </Form>
  )
}

export default ConfigItem;