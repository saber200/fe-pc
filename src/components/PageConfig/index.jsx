import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import _ from "lodash";
import { Menu, Form, Input, Button, Modal, Select, Radio, Switch, TreeSelect } from 'antd';
import { query_list, getJson, saveMenus } from '@/utils/apis/saveJson';
import {
  HomeOutlined,
  TeamOutlined,
  UnorderedListOutlined
} from '@ant-design/icons';

import './style.scss';

const cocheList = await query_list();

const icons = {
  icon_1: <HomeOutlined />,
  icon_2: <UnorderedListOutlined />,
  icon_3: <TeamOutlined />
}

const defaultMenus = [
  { label: 'page_r16mw', value: 'page_r16mw' },
  { label: 'page_r17mw', value: 'page_r17mw' },
  { label: 'page_r18mw', value: 'page_r18mw' }
];

const PageConfig = (props) => {
  const { mockJson, setMockJson, urlParams, initConfig } = props;
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuOpenId, setMenuOpenId] = useState();
  const [removeMenuOpen, setRemoveMenuOpen] = useState(false);
  const [removeList, setRemoveList] = useState([]);
  const [editChecked, setEditChecked] = useState(false);
  const [defaultOpenKeys, setDefaultOpenKeys] = useState();
  const [treeData, setTreeData] = useState([]);
  const [querylist, setQuerylist] = useState([]);
  const [menuList, setMenuList] = useState([]);
  const [treeDataValue, setTreeDataValue] = useState([]);
  const [menus] = useState(defaultMenus);
  const [scrollType, setScrollType] = useState(defaultMenus);
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

    console.log(selectList)

    setDefaultOpenKeys(selectList.key);
    return false;
  }

  const getMenusList = async () => {
    const result = await query_list();
    const newTreeData = [];
    initOpenKeys(result);

    result.data.data.map((item, i) => {
      let treeItem = {};
      const { key } = item;
      if(item.icon_name){
        item.icon = icons[item.icon_name]
      }

      if(item.children){
        treeItem = {
          key: key,
          value: key,
          title: item.label,
          children: item.children.map((children, n) => {
            children = {
              key: `${key}-${children.key}`,
              value: `${key}-${children.key}`,
              title: children.label
            }
            return children;
          })
        }
        newTreeData.push(treeItem);
      }

      return item;
    });

    setQuerylist(result.data.data);
    setTreeData(newTreeData)
  }

  const onClick = async (e) => {
    const key = e.key;

    if(editChecked){
      // 编辑目录
      const oldQueryList = await query_list();
      const editOption = oldQueryList.data.data.filter(item => item.key === key)[0];
      const values = {
        menu_name: editOption.label,
        menu_name_id: editOption.key,
        ids: editOption.children ? editOption.children.map(item => item.key) : undefined,
        menu_icon: editOption.icon_name
      }
      menuForm.setFieldsValue(values);
      setMenuOpen(true);
      setMenuOpenId(key);
      return false;
    }

    const result = await getJson(key);
    setMockJson(result.data.json)

    navigate(`/?id=${key}`)
  };

  const onRemoveMenu = () => {
    let newQueryList = [...querylist];

    removeList.forEach(str => {
      const strs = str.split('-');
      const prv = strs[0], next = strs[1];
      next && newQueryList.forEach(item => {
        item.key === prv && item.children.forEach((el, i) => {
          el.key === next && item.children.splice(i, 1);
        });
      });
    })

    newQueryList.forEach((item, i) => {
      item.key !== 'index' && item.children.length <= 0 && delete newQueryList[i];
    })

    newQueryList = newQueryList.filter(item => !!item);
    
    saveMenus(newQueryList).then(res => {
      setRemoveMenuOpen(false);
      navigate('/index');
      getMenusList();
      initConfig();
      setTreeDataValue([]);
      setRemoveList([]);
    });
  }

  const onAddMenu = async () => {
    const add_menu = menuForm.getFieldsValue();
    let query_list = [...cocheList.data.data];
    const { menu_name_id, menu_name, ids, menu_icon } = add_menu;
    const newMockJson = { ...mockJson };

    if(editChecked){
      let editOption = query_list.filter(item => item.key === menuOpenId)[0];
      const children = ids.map(id => ({ value: id, label: id, key: id }));

      editOption = {
        key: menu_name_id,
        label: menu_name,
        icon_name: menu_icon,
        children
      }

      query_list = query_list.map(item => {
        if(item.key === menuOpenId){
          item = editOption;
        }
        return item;
      })
    }else{
      const children = ids.map(id => ({ value: id, label: id, key: id }));
      query_list.push({
        key: menu_name_id,
        label: menu_name,
        icon_name: menu_icon,
        children
      })
    }

    query_list = query_list.map(item => {
      const { icon_name, key, label, children } = item;
      return {
        icon_name,
        key,
        label,
        children
      }
    })

    saveMenus(query_list).then(res => {
      getMenusList();
      setQuerylist([...query_list]);
      setMenuOpen(false)
      setMenuOpenId();

      newMockJson.menus = query_list;
      setMockJson(newMockJson);
      menuForm.resetFields();

      setTimeout(() => {
        window.location.reload(); 
      });
    });
  }

  const setSelectMenusOptions = () => {
    menuForm.resetFields();
    setMenuOpen(true);
  }

  const onSwitchChange = checked => {
    setEditChecked(checked);
  };

  const onChangeScroll = (e) => {
    const val = e.target.value;
    saveMenus(querylist, val);
    setScrollType(val);
  }

  useEffect(() => {
    getMenusList();
  }, [])

  useEffect(() => {
    let newQuerylist = [...querylist];

    if(editChecked){
      newQuerylist = newQuerylist.map(item => {
        item.children = undefined;
        return item;
      })

      setMenuList(newQuerylist);
    }else{
      getMenusList();
    }
  }, [editChecked])

  return (
    <div className="pageconfig-continer">
      <div className="pageconfig-form">
        {/* <h3>页面配置</h3> */}
        <Button onClick={setSelectMenusOptions} type="primary" disabled={editChecked}>添加</Button>
        <Button style={{ marginLeft: '20px' }} type="primary" disabled={editChecked} danger onClick={() => setRemoveMenuOpen(true)}>删除</Button>
        <Switch
          style={{ marginLeft: '20px' }}
          defaultChecked={editChecked}
          onChange={onSwitchChange}
          checkedChildren="编辑"
          unCheckedChildren="编辑"
        />
      </div>
      <div className="pageconfig-form" style={{ flexDirection: 'column' }}>
        <h3>页面滑动设置</h3>
        <Radio.Group label='滑动设置' onChange={onChangeScroll}>
          <Radio.Button value='page'>页面滑动</Radio.Button>
          <Radio.Button value='tabs'>二级页面滑动</Radio.Button>
        </Radio.Group>
      </div>
      {!defaultOpenKeys ? null : <Menu
        onClick={onClick}
        style={{ width: 256 }}
        defaultOpenKeys={[defaultOpenKeys]}
        defaultSelectedKeys={[urlParams.id]}
        mode="inline"
        items={editChecked ? menuList : querylist}
      />}
      <Modal
        open={menuOpen}
        footer={[
          <Button onClick={() => {
            setMenuOpen(false);
            setMenuOpenId();
          }}>取消</Button>,
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
              // defaultValue={menuForm.ids}
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
      <Modal
      open={removeMenuOpen}
      okText="确定"
      cancelText='取消'
      onCancel={() => {
        setRemoveMenuOpen(false)
        setTreeDataValue([]);
        setRemoveList([]);
      }}
      onOk={onRemoveMenu}
      title="删除目录"
      >
        <div style={{ padding: '20px' }}>
          <TreeSelect
          style={{ width: '100%' }}
          treeCheckable
          treeData={treeData}
          value={treeDataValue}
          onChange={(ks) => {
            setTreeDataValue(ks);
            setRemoveList(ks);
          }}
          />
        </div>
      </Modal>
    </div>
  )
}

export default PageConfig;
