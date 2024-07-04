import { Button } from 'antd';
import './style.scss';

const Header = () => {
  return (
    <div className='header'>
      <div className='header_title'>小程序低代码编辑器</div>
      <div className='header_user_setting'>
        <Button>重置</Button>
        <Button type='primary'>保存</Button>
      </div>
    </div>
  )
}

export default Header;
