const btnEvents = [
  { label: '点击事件', value: 'onClick' },
]

const selectEvents = [
  { label: '点击事件', value: 'onClick' },
  { label: '下拉', value: 'onOpen' },
  { label: '选择', value: 'select' },
]

const inputEvents = [
  { label: '获取焦点', value: 'onFoucs' },
  { label: '内容更改', value: 'onChange' },
  { label: '失去焦点', value: 'onBlur' },
]

const tableEvents = [
  { label: '选择行', value: 'onSelect' },
  { label: '排序', value: 'onSort' },
]

export default {
  'Table': tableEvents,
  'Input': inputEvents,
  'button': btnEvents,
  'select': selectEvents
}