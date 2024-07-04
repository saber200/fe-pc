import { createNewPage } from '@/utils/utils';

const initialState = {
  pages: [
    {
      key: '0',
      page_name: '首页',
      page_id: 'page_index',
      page_level: '一级页面',
      index: true,
    },
    {
      key: '1',
      page_name: '新建页面_1',
      page_id: 'page_new_1',
      page_level: '一级页面',
      index: false,
    },
  ],
  pageId: '00001',
  logo: '',
  pageName: 'test1',
  buildPageId: '',
  gridData: {}
}

export function initState(state = initialState, action) {
  const { gridData, type } = action;
  if(type === 'initPageConfig'){
    return {
      ...action.state
    }
  }

  if (type === 'changeDataFrid') {
    return {
      ...state,
      gridData
    }
  }

  if(type === 'setIndex') {
    const { page_id } = action;

    const newPages = state.pages.map(item => {
      if(item.page_id === page_id){
        return {
          ...item,
          index: true
        }
      }else{
        return {
          ...item,
          index: false
        }
      }
    })

    return {
      ...state,
      pages: newPages
    }
  }

  if(type === 'createPage') {
    return {
      ...state,
      pages: createNewPage(state.pages)
    }
  }

  if(type === 'setBuildPageId') {
    return {
      ...state,
      buildPageId: action.buildPageId
    }
  }
  
  return state
}