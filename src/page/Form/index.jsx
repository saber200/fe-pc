import React, { useEffect, useState } from 'react';
import {
  Form,
  Input,
  Radio,
  Select,
  Button,
  InputNumber,
  Divider,
  Modal,
  Tabs,
  Card
} from 'antd';
import { yesOrNo } from '@/utils/commonDict';
import eventsType from './eventTypes';
import eventsOptions from '@/utils/events';
const { TextArea } = Input;

const ConfigForm = props => {
  let { childItem, json, form } = props;
  const [open, setOpen] = useState(false);
  const [jsonText, setJsonText] = useState('');

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
      case 'type':
        item.valueSource = item.valueSource ? item.valueSource : yesOrNo;
        return (
          <Radio.Group>
            {item.valueSource.map(part => {
              return <Radio value={part.value}>{part.label}</Radio>
            })}
          </Radio.Group>
        )
      default:
        return null
    }
  }

  const handleOk = () => {
    setOpen(false)
  }

  const handleCancel = () => {
    setOpen(false)
  }

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
      <Modal
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
      >
        <TextArea
          style={{
            width: '90%',
            height: '500px',
            display: 'flex',
            justifyContent: 'center'
          }}
          value={jsonText}
        />
      </Modal>
    </>
  )
}

const ConfigEvent = props => {
  const { childItem, events, setEvents } = props;
  const { event } = childItem.render;
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [subType, setSubType] = useState(false);
  const [elOptions, setElOptions] = useState([]);

  const openModal = () => {
    setSubType(false);
    setOpen(true);
  }

  const submit = () => {
    const eventConfig = form.getFieldsValue();
    const evtOpt = eventsOptions.filter(ev => ev.value === eventConfig.eventConfigName)[0];
    const evtTyp = eventsType[childItem.name].filter(ev => ev.value === eventConfig.eventName)[0];

    setEvents(events.concat({
      eventName: evtTyp.value,
      showName: evtTyp.label,
      eventConfigs: [
        {
          eventName: evtOpt.value,
          showName: evtOpt.label,
          formName: eventConfig.formName,
          formValue: eventConfig.formValue
        }
      ]
    }))
    setOpen(false);
    form.resetFields();
  }

  const openDetail = (item) => {
    form.setFieldsValue({
      eventName: item.eventName,
      eventConfigName: item.eventConfigs[0].eventName,
      formName: item.eventConfigs[0].formName,
      formValue: item.eventConfigs[0].formValue,
    });
    setSubType(true);
    setOpen(true)
  }

  useEffect(() => {
    const options = props.json.data.map(item => ({ label: item.id, value: item.instanceId }));
    setElOptions(options);
  }, [])

  return (
    <div>
      <Button onClick={() => openModal()}>添加事件</Button>
      <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexWrap: "wrap" }}>
        {
          events.map(item => {
            return (
              <Card
                title="事件"
                extra={<a onClick={() => openDetail(item)}>查看详情</a>}
                style={{
                  width: 'calc(50% - 20px)',
                  margin: '10px',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <div>绑定事件：</div>
                    <div>{item.showName}</div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <div>事件流：</div>
                    {
                      item.eventConfigs.map(config => {
                        return <div>{config.showName}</div>
                      })
                    }
                  </div>
                </div>
              </Card>
            )
          })
        }
      </div>
      <Modal
        open={open}
        ok
        okText="提交"
        cancelText="取消"
        footer={[
          <Button key="back" onClick={() => setOpen(false)}>
            取消
          </Button>,
          (subType ? null : <Button key="submit" type="primary" onClick={() => submit()}>
            提交
          </Button>)
        ]}
      >
        <Form
          name="event-form"
          form={form}
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            flexWrap: 'wrap',
            margin: '20px 0'
          }}
        >
          <Form.Item
            name='eventName'
            label='选择事件'
            style={{ width: 'calc(50% - 20px)', margin: '10px' }}
          >
            <Select options={eventsType[childItem.name]} />
          </Form.Item>
          <Form.Item
            name='eventConfigName'
            label='绑定事件'
            style={{ width: 'calc(50% - 20px)', margin: '10px' }}
          >
            <Select options={eventsOptions} />
          </Form.Item>
          <Form.Item
            name='formName'
            label='更改字段名'
            style={{ width: 'calc(50% - 20px)', margin: '10px' }}
          >
            <Select options={elOptions} />
          </Form.Item>
          <Form.Item
            name='formValue'
            label='更改字段值'
            style={{ width: 'calc(50% - 20px)', margin: '10px' }}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

const ConfigData = props => {
  const { form } = props;
  const [type] = useState([
    { label: 'POST', value: 'POST' },
    { label: 'PUT', value: 'PUT' },
    { label: 'GET', value: 'GET' },
    { label: 'DELETE', value: 'DELETE' },
    { label: 'OPTION', value: 'OPTION' },
  ])
  return (
    <div>
      <Form
        name='request'
        form={form}
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          flexWrap: 'wrap'
        }}
      >
        <Form.Item name='url' label='数据源地址' style={{ width: 'calc(50% - 20px)', margin: '10px' }}>
          <Input />
        </Form.Item>
        <Form.Item name='type' label='请求类型' style={{ width: 'calc(50% - 20px)', margin: '10px' }}>
          <Select options={type} />
        </Form.Item>
      </Form>
    </div>
  )
}

const ConfigTabs = props => {
  const { childItem, json, setJson, closeOpen, layouts } = props;
  const [configForm] = Form.useForm();
  const [dataForm] = Form.useForm();
  const [events, setEvents] = useState([]);

  const submit = () => {
    const newJson = {...json}
    const config = configForm.getFieldsValue();

    childItem.render.props.forEach(el => {
      el.value = config[el.name] ? config[el.name] : '';
    })

    childItem.render.event = events;

    const subJsonData = newJson.data.map(item => {
      if(item.instanceId === childItem.instanceId){
        item = childItem
      }

      return item
    })

    newJson.data = subJsonData;

    newJson.data = newJson.data.map(item => {
      layouts.map(layout => {
        if(item.instanceId === layout.i){
          item.render.layout = layout;
        }
      })
      return item;
    })

    setJson(newJson);
    closeOpen();
  }

  const items = [
    {
      key: '1',
      label: '基础配置',
      children: <ConfigForm {...props} form={configForm} />,
    },
    {
      key: '2',
      label: '事件配置',
      children: <ConfigEvent {...props} events={events} setEvents={setEvents} />,
    }
  ];

  return [
    <Tabs defaultActiveKey="1" items={items} />,
    <div style={{ position: 'absolute', bottom: '20px', right: '20px' }}>
      <Button onClick={submit}>提交</Button>
    </div>
  ];
}

export default ConfigTabs;

// export default ConfigForm;