import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import Enumeration from './Enumeration';

import './style.css';

const MenuComponent = () => {
  const [menus, setMenus] = useState([]);
  const [showName, setShowName] = useState('page_config');
  useEffect(() => {
    const items = [];
    Object.keys(Enumeration).map(keyStr => {
      const item = Enumeration[keyStr];
      const { key, label } = item;
      items.push({
        key,
        label
      })
    })

    setMenus(items);
  }, [])

  const onClick = (e) => {
    const name = e.key;
    setShowName(name)
  };

  const showSubMenu = name => {
    return Enumeration[name].component;
  }

  return (
    <div className='menu'>
      <Menu
        onClick={onClick}
        style={{
          width: 140,
          height: '100%',
        }}
        defaultSelectedKeys={['page_config']}
        defaultOpenKeys={['page_config']}
        mode="inline"
        items={menus}
      />
      <div className='sub_menu'>
        {showSubMenu(showName)}
        {/* <PageConfig /> */}
      </div>
    </div>
  );
};

export default MenuComponent;