import React from 'react';
import { Form, Input, Button } from 'antd';
// const form = Form.useForm();

const ConfigItem = props => {
  const [form] = Form.useForm();

  const submit = () => {
    const subConfig = {
      ...props.childItem,
      ...form.getFieldsValue()
    }

    // 上传json
  }

  return (
    <Form
    name="configForm"
    form={form}
    >
      <Form.Item name="title" label="标题">
        <Input />
      </Form.Item>
      <Form.Item name="content" label="按钮文字">
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" onClick={submit}>提交</Button>
      </Form.Item>
    </Form>
  )
}

export default ConfigItem;