import { SelectCop, ButtonCop } from '@/components/CopList';
import './style.scss';

const ComponentList = () => {
  return (
    <div className='component_list'>
      <SelectCop style={{ width: '100%' }} />
      <ButtonCop />
    </div>
  )
}

export default ComponentList
