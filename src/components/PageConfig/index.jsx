import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import _ from "lodash";
import { Menu, Form, Input, Button, Modal, Select, Radio, Switch } from 'antd';
import { query_list, getJson, saveMenus } from '@/utils/apis/saveJson';
import {
  HomeOutlined,
  TeamOutlined,
  UnorderedListOutlined
} from '@ant-design/icons';

import './style.scss';


const icons = {
  icon_1: <HomeOutlined />,
  icon_2: <UnorderedListOutlined />,
  icon_3: <TeamOutlined />
}

const PageConfig = (props) => {
  const { mockJson, setMockJson, urlParams } = props;
  const [menuOpen, setMenuOpen] = useState(false);
  const [editChecked, setEditChecked] = useState(false);
  const [editCheckedId, setEditCheckedId] = useState(false);
  const [defaultOpenKeys, setDefaultOpenKeys] = useState();
  const [menus, setMenus] = useState([
    { label: 'page_r16mw', value: 'page_r16mw' },
    { label: 'page_r17mw', value: 'page_r17mw' },
    { label: 'page_r18mw', value: 'page_r18mw' },
  ]);
  const [querylist, setQuerylist] = useState([]);
  const [menuForm] = Form.useForm();
  const navigate = useNavigate();

  const initOpenKeys = (result) => {
    const key = urlParams.id;
    let selectList = null;
    result.data.data.forEach(item => {
      if (item.children) {
        item.children.forEach(children => {
          if (children.value === key) {
            selectList = item;
          }
        })
      } else {
        if (item.key === key) {
          selectList = item;
        }
      }
    });

    setDefaultOpenKeys(selectList.key);
    return false;
  }

  const getMenusList = async () => {
    const result = await query_list();
    initOpenKeys(result);

    result.data.data.map(item => {
      if(item.icon_name){
        item.icon = icons[item.icon_name]
      }

      return item;
    });

    setQuerylist(result.data.data);
  }

  const onClick = async (e) => {
    const key = e.key;

    if(editChecked){
      setMenuOpen(true);
      setEditCheckedId(key);
      return false;
    }

    const result = await getJson(key);
    setMockJson(result.data.json)

    navigate(`/${key}`)
  };

  const onRemoveMenu = () => {
    let selectList = null;
    let selectListsArr = [];
    let newQueryList = [...querylist];
    newQueryList.forEach(item => {
      if (item.children) {
        item.children.forEach(children => {
          if (children.value === editCheckedId) {
            selectList = item;
          }
        })
      } else {
        if (item.key === editCheckedId) {
          selectList = item;
        }
      }
    });

    selectList.children.map(item => {
      if(item.value !== editCheckedId){
        selectListsArr.push(item);
      }
    })

    selectList.children = selectListsArr;

    newQueryList = newQueryList.map(item => {
      if(item.key === selectList.key){
        item = selectList;
      }

      return item;
    })

    saveMenus(newQueryList);

    navigate(`/index`)
    getMenusList();
    setMenuOpen(false);
  }

  const onAddMenu = () => {
    const add_menu = menuForm.getFieldsValue();
    const query_list = [...querylist];
    const { menu_name_id, menu_name, ids, menu_icon } = add_menu;
    const newMockJson = { ...mockJson };

    const children = ids.map(id => ({ value: id, label: id, key: id }));
    query_list.push({
      key: menu_name_id,
      label: menu_name,
      icon_name: menu_icon,
      icon: icons[menu_icon],
      children
    })

    setQuerylist(query_list);
    setMenuOpen(false)

    newMockJson.menus = query_list;
    setMockJson(newMockJson);
    menuForm.resetFields();

    saveMenus(query_list);
  }

  const setSelectMenusOptions = () => {
    setMenuOpen(true);
  }

  const onSwitchChange = checked => {
    setEditChecked(checked);
  };

  useEffect(() => {
    getMenusList();
  }, [])

  return (
    <div className="pageconfig-continer">
      <div className="pageconfig-form">
        {/* <h3>页面配置</h3> */}
        <Button onClick={setSelectMenusOptions}>添加一级页面</Button>
        <Switch
          style={{ marginLeft: '20px' }}
          defaultChecked={editChecked}
          onChange={onSwitchChange}
          checkedChildren="编辑"
          unCheckedChildren="编辑"
        />
      </div>
      {!defaultOpenKeys ? null : <Menu
        onClick={onClick}
        style={{ width: 256 }}
        defaultOpenKeys={[defaultOpenKeys]}
        defaultSelectedKeys={[urlParams.id]}
        mode="inline"
        items={querylist}
      />}
      <Modal
        open={menuOpen}
        footer={[
          <Button onClick={() => setMenuOpen(false)}>取消</Button>,
          <Button onClick={onRemoveMenu} type="primary" danger>删除</Button>,
          <Button onClick={onAddMenu} type="primary">确定</Button>
        ]}
        destroyOnClose={true}
      >
        <Form
          name="add_menu"
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: '10px',
            flexWrap: 'wrap'
          }}
          form={menuForm}
        >
          <Form.Item
            name="menu_name"
            label="一级目录"
            style={{ width: 'calc(50% - 20px)', margin: '10px' }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="menu_name_id"
            label="一级目录id"
            style={{ width: 'calc(50% - 20px)', margin: '10px' }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="ids"
            label="二级页面"
            style={{ width: '100%', margin: '10px' }}
          >
            <Select
              options={menus}
              mode="multiple"
            />
          </Form.Item>
          <Form.Item
            name="menu_icon"
            label='图标选择'
            style={{ width: '100%', margin: '10px' }}
          >
            <Radio.Group>
              <Radio value='icon_1'><HomeOutlined /></Radio>
              <Radio value='icon_2'><UnorderedListOutlined /></Radio>
              <Radio value='icon_3'><TeamOutlined /></Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default PageConfig;
