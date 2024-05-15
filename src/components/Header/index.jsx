import { Avatar } from 'antd';
import './style.css';

const Header = () => {
  return (
    <div className='header'>
      <div className='header_title'>小程序低代码编辑器</div>
      <div className='header_user_info'>
        <Avatar />
      </div>
    </div>
  )
}

export default Header;