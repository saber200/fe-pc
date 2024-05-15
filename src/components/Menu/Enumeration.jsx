import PageConfig from './PageConfig';
import PageMenu from './PageList';

export default {
  page_config: {
    key: 'page_config',
    label: '页面',
    component: <PageMenu />
  },
  component: {
    key: 'component',
    label: '基础组件',
    component: <div>component</div>
  }
}
