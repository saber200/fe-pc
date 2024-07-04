import pageConfig from '@/config/pageConfig';

export function createNewPage(pages) {
  const newPages = [...pages];
  const key = Number(newPages[newPages.length - 1].key) + 1;

  newPages.push({
    ...pageConfig,
    key: String(key),
    page_id: `page_new_${key}`,
    page_name: `新建页面_${key}`,
  })
  return newPages
}
