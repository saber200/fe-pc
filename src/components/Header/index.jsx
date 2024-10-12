import { Button, Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import './style.scss';

const Header = props => {
  const pageConfig = useSelector(state => state);
  const dispatch = useDispatch();

  const onSave = () => {
    const config = {...pageConfig.config}
    config.config = [...pageConfig.layouts];

    props.savePageData(config)
  }

  const onReset = () => {
    Modal.confirm({
      cancelText: '取消',
      okText: '确定',
      okType: 'primary',
      title: '确定重置页面配置？',
      onOk: () => {
        dispatch({
          type: 'initPageConfig'
        })
      }
    })
  }

  return (
    <div className='header'>
      <div className='header_title'>小程序低代码编辑器</div>
      <div className='header_user_setting'>
        <Button onClick={onReset}>重置</Button>
        <Button type='primary' onClick={onSave}>保存</Button>
      </div>
    </div>
  )
}

export default Header;
