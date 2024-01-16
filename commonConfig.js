let config = {
  id: 'pack_Table',
  name: 'Table',
  toolbox: {
    group: 'data',
    name: 'Table',
    showName: '表格',
    order: '',
    render: ''
  },
  render: {
    name: 'Table',
    parent: 'table',
    render: '',
    rowBlock: true,
    props: [
      {
        id: '',
        name: 'name',
        showName: '组件备注',
        desc: '组件备注',
        label: '组件备注',
        order: 1,
        type: 'string',
        //属性值的默认值
        defaultValue: '表格',
        //是否可以不设置
        isNull: true,
      },
      {
        id: '',
        name: 'bordered',
        showName: '显示外边框和列边框',
        desc: '显示外边框和列边框',
        label: '显示外边框和列边框',
        order: 1,
        type: 'boolean',
        defaultValue: true,
        isNull: true,
      },
      {
        name: "size",
        desc: "尺寸",
        type: "select",
        defaultValue: "middle",
        version: "",
        id: "dce2aebe-a443-43f1-b586-d0a8aeb4f020",
        showName: "尺寸",
        label: "尺寸",
        canEdit: true,
        order: 9,
        valueSource: [
          { label: "大", value: "large" },
          { label: "中", value: "middle " },
          { label: "小", value: "small" },
        ],
        group: "基本属性",
        groupType: "common",
      },
      {
        id: '',
        name: 'rowKey',
        showName: '行数据唯一标记',
        desc: '行数据唯一标记',
        label: '组件备注',
        order: 1,
        type: 'string',
        //属性值的默认值
        defaultValue: 'id',
        //是否可以不设置
        isNull: true,
      },

      {
        id: '',
        name: 'columns',
        showName: 'columns',
        desc: '列编辑',
        label: 'columns',
        order: 1,
        type: 'table_columns_edit',
        defaultValue: [
          {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
            width: 200,
            _mocha_col_orderNumber: 1
          },
          {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
            width: 200,
            _mocha_col_orderNumber: 2
          },
          {
            title: '住址',
            dataIndex: 'address',
            key: 'address',
            width: 200,
            _mocha_col_orderNumber: 3
          },
        ],
        isNull: true,
      },

      {
        id: '',
        name: 'rowSelection',
        showName: '行数据选择配置',
        desc: '行数据选择配置',
        label: '行数据选择配置',
        order: 1,
        type: 'table_rowselection',
        defaultValue: undefined,
        isNull: true,
        customerEditor: 'RowSelection',
        events: [
          {
            showName: '选择事件',
            name: 'onChange',
            triggetType: [],
            defaultTriggerType: '',
          }
        ],
      },
      {
        id: '',
        name: 'ref_table',
        showName: '关联表',
        desc: '关联表',
        label: '关联表',
        order: 1,
        type: 'r_table',
        defaultValue: undefined,
        isNull: true,
        editor: false

      },
      {
        id: '',
        name: 'showPagination',
        showName: '显示分页',
        desc: '显示分页',
        label: '显示分页',
        order: 1,
        type: 'boolean',
        defaultValue: true,

      },

      {
        id: '',
        name: 'serverPage',
        showName: '服务端分页/排序',
        desc: '服务端分页',
        label: '服务端分页',
        order: 1,
        type: 'boolean',
        defaultValue: true,
      },

      {
        id: '',
        name: 'pagination',
        showName: '分页配置',
        desc: '分页配置',
        label: '分页配置',
        order: 1,
        type: 'table_pagination',
        defaultValue: {
          pagination: true,
          position: 'bottomRight',
          pageSize: 15,
          showQuickJumper: true,
          size: 'default',
          current: 1,
          simple: false,
          showSizeChanger: true,

          total: 0

        },
        isNull: true,
        events: [
          {
            showName: '页码事件',
            name: 'onChange',
            triggetType: [],
            defaultTriggerType: '',
          },
          {
            showName: '页大小事件',
            name: 'onShowSizeChange',
            triggetType: [],
            defaultTriggerType: '',
          }
        ],
        customerEditor: 'paginationEditor',
        ifShow: { prop: 'showPagination', value: true }
      },
      {
        id: '',
        name: 'scroll',
        showName: '表格滚动配置',
        desc: '表格滚动配置',
        label: '表格滚动配置',
        order: 1,
        type: 'table_scroll',
        defaultValue: {
          scrollToFirstRowOnChange: true,
          x: false,
          width: '',
          height: '',
          y: false
        },
        isNull: true,

        customerEditor: 'ScrollEditor'

      },


      {
        id: '',
        name: 'totalCount',
        showName: '总页数',
        value: null,
        defaultValue: 0,

        editor: false,
        showEvent: true
      },

      {
        id: '',
        name: 'pageSize',
        showName: '每页数量',
        value: null,
        defaultValue: 10,

        editor: false,
        showEvent: true
      },
      {
        id: '',
        name: 'pageIndex',
        showName: '当前页码',
        value: null,
        defaultValue: 1,

        editor: false,
        showEvent: true
      },
      {
        id: '',
        name: 'filter',
        showName: '筛选字段',
        value: null,
        defaultValue: "",

        editor: false,
        showEvent: true
      },
      {
        id: '',
        name: 'filter_value',
        showName: '筛选字段内容',
        value: null,
        defaultValue: "",

        editor: false,
        showEvent: true
      },
      {
        id: '',
        name: 'sorter',
        showName: '排序字段',
        value: null,
        defaultValue: "",

        editor: false,
        showEvent: true
      },
      {
        id: '',
        name: 'sortOrder',
        showName: '排序方式',
        value: null,
        defaultValue: "",

        editor: false,
        showEvent: true
      },

      {
        id: '',
        name: 'selected',
        showName: '选中的数据',
        value: [],
        defaultValue: [],

        editor: false,
        showEvent: true
      },
      {
        id: '',
        name: 'selectedRowKeys',
        showName: '选中的数据key',
        value: [],
        defaultValue: [],

        editor: false,
        showEvent: true
      },
      {
        id: '',
        name: 'visible',
        showName: '可见',

        defaultValue: true,
        desc: '可见',
        label: '可见',
        type: 'boolean',
        showEvent: true

      },
      {
        id: '',
        name: 'showLoading',
        showName: '显示加载状态',
        desc: '显示加载状态',
        label: '显示加载状态',
        order: 1,
        type: 'boolean',
        //属性值的默认值
        defaultValue: false,
        //是否可以不设置
        isNull: true,
        editor: false,
        showEvent: true
      },
      {
        id: '',
        name: 'showLoadingText',
        showName: '加载状态提示文字',
        desc: '加载状态提示文字',
        label: '加载状态提示文字',
        order: 1,
        type: 'string',
        //属性值的默认值
        defaultValue: '',
        //是否可以不设置
        isNull: true,
        editor: false,
        showEvent: true
      },

      {
        id: '',
        name: 'canEditor',
        showName: '是否可编辑',
        value: null,
        defaultValue: false,
        type: 'boolean',

        editor: true,
        showEvent: false
      },
      {
        id: '',
        name: 'controlForm',
        showName: '关联表单',
        value: null,
        defaultValue: null,
        type: 'string',
        editor: true,
        showEvent: false,
        customerEditor: "ControlForm",
        ifShow: { prop: 'canEditor', value: true }
      },
    ],
    event: [


      {
        showName: '选择事件',
        name: 'onSelectChange',
        triggetType: [],
        defaultTriggerType: '',
      },
      {
        showName: '行单击',
        name: 'rowClick',
        triggetType: [],
        defaultTriggerType: '',
      },
      {
        showName: '行双击',
        name: 'rowDoubleClick',
        triggetType: [],
        defaultTriggerType: '',
      },
    ],
    datasource: {
      type: 'customerData',
      //绑定到组件的属性名称
      bindingPropName: 'treeData',
      customerData: [

      ],
      request: {
        fileds: {},
        eventInfo: {
          showName: '获取数据',
          name: 'getData',
          triggetType: [],
          defaultTriggerType: '',
        }
      }
    },
    commonStyle: [
      {
        name: 'styleBox',
        showName: '边距',
        value: {},
        defaultValue: {},
      },
      {
        name: 'border',
        showName: '边框',
        value: {},
        defaultValue: {},
      },
      {
        name: 'background',
        showName: '背景',
        value: '',
        defaultValue: '',
      },
      {
        name: 'width',
        showName: '宽度',
        value: '',
        defaultValue: '',
      },
      {
        name: 'height',
        showName: '高度',
        value: '',
        defaultValue: '',
      }
    ],
    permissionControl: [
      { name: 'visible', showName: '可见性', label: '可见性', type: 'boolean', defaultValue: false, value: false },

    ],
    permission: false
  }
}

export default config
