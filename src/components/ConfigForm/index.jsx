import React, { useEffect, useState } from 'react';
import { Form, Input, Radio, Select, Button, InputNumber, Divider, Modal } from 'antd';
import { yesOrNo } from '@/utils/commonDict';
import './style.scss';

const ConfigForm = props => {
  return (
    <div className='config_form'>
      <Form>
        <Form.Item>
          <Input />
        </Form.Item>
        <Form.Item>
          <Input />
        </Form.Item>
        <Form.Item>
          <Input />
        </Form.Item>
        <Form.Item>
          <Input />
        </Form.Item>
        <Form.Item>
          <Input />
        </Form.Item>
      </Form>
    </div>
  )
}

export default ConfigForm;