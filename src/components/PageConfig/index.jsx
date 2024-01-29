import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from 'react-router-dom'
import _ from "lodash";
import { Menu, Form, Input, Button, Modal, Select } from 'antd';
import { query_list, getJson, saveMenus } from '@/utils/apis/saveJson';

import './style.scss';

const PageConfig = (props) => {
  const { mockJson, setMockJson } = props;
  const [menuOpen, setMenuOpen] = useState(false);
  const [menus, setMenus] = useState([
    { label: 'page_r16mw', value: 'page_r16mw' },
    { label: 'page_r17mw', value: 'page_r17mw' },
    { label: 'page_r18mw', value: 'page_r18mw' },
  ]);
  const [querylist, setQuerylist] = useState([]);
  const [menuForm] = Form.useForm();
  const navigate = useNavigate();
  
  useEffect(() => {
    async function fetchData() {
      const result = await query_list();
      setQuerylist(result.data.data);
    }
    fetchData();
  }, [])

  const onClick = async (e) => {
    let key = 'index';
    if(e.keyPath.length > 1){
      key = e.item.props.value;
    }

    const result = await getJson(key);
    setMockJson(result.data.json)

    navigate(`/${key}`)
  };

  const onAddMenu = () => {
    const add_menu = menuForm.getFieldsValue();
    const query_list = [...querylist];
    const { menu_name_id, menu_name, ids } = add_menu;
    const newMockJson = {...mockJson};

    const children = ids.map(id => ({ value: id, label: id }));
    query_list.push({
      key: menu_name_id,
      label: menu_name,
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

  return (
    <div className="pageconfig-continer">
      <div className="pageconfig-form">
        {/* <h3>页面配置</h3> */}
        <Button onClick={setSelectMenusOptions}>添加一级页面</Button>
      </div>
      <Menu
        onClick={onClick}
        style={{
          width: 256,
        }}
        defaultSelectedKeys={['index']}
        mode="inline"
        items={querylist}
      />
      <Modal
      open={menuOpen}
      onOk={onAddMenu}
      onCancel={() => setMenuOpen(false)}
      okText="确定"
      cancelText="取消"
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
        </Form>
      </Modal>
    </div>
  )
}

export default PageConfig;
