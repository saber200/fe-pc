let config = {
  "id": "pack_Select",
  "name": "select",
  "toolbox": {
    "group": "form",
    "name": "select",
    "showName": "下拉选择框",
    "order":3,
    "render": ""
  },
  "render": {
    "name": "select",
    "parent": "select",
    "render": "",
    isFormData:true,
    "props": [
      {
        id: '',
        name: 'label',
        showName: '标签',
        desc: '标签',
        label: '标签',
        order: 1,
        type: 'string',
        //属性值的默认值
        defaultValue: '下拉选择框',
        //是否可以不设置
        isNull: true,
      },
      {
        id: '',
        name: 'name',
        showName: '组件备注',
        desc: '组件备注',
        label: '组件备注',
        order: 1,
        type: 'string',
        //属性值的默认值
        defaultValue: '下拉选择框',
        //是否可以不设置
        isNull: true,
      },
      {
        "name": "allowClear",
        "desc": "支持清除",
        "type": "boolean",
        "defaultValue": "false",
        "version": "",
        "id": "ddcdae64-9a55-42c8-a8ca-f99ae814624c",
        "showName": "支持清除",
        "label": "支持清除",
        "canEdit": true,
        "order": 0,
        "group": "基本属性"
      },
      {
        "name": "bordered",
        "desc": "是否有边框",
        "type": "boolean",
        "defaultValue": "true",
        "version": "",
        "id": "932dc647-2e49-4bc7-bbe2-c8894a9f7575",
        "showName": "是否有边框",
        "label": "是否有边框",
        "canEdit": true,
        "order": 3,
        "group": "基本属性"
      },
      {
        "name": "defaultValue",
        "desc": "指定默认选中的条目",
        "type": "string",
        "defaultValue": "",
        "version": "",
        "id": "0685e14a-d145-4a27-a5f1-fa41bc88a9fd",
        "showName": "指定默认选中的值",
        "label": "默认值",
        "canEdit": true,
        "order": 7,
        "group": "基本属性"
      },
      {
        "name": "multiple",
        "desc": "多选",
        "type": "boolean",
        "defaultValue": false,
        "version": "",
        "id": "de28ffd9-77f0-4254-b948-64fab77fc8c5",
        "showName": "多选",
        "label": "多选",
        "canEdit": true,
        "order": 23,
        "group": "基本属性"
      },
      {
        "name": "mode",
        "desc": "多选的方式",
        "type": "select",
        "defaultValue": "tags",
        "version": "",
        "id": "de28ffd9-77f0-4254-b948-64fab77fc8c5",
        "showName": "选择方式",
        "label": "模式",
        "canEdit": true,
        "order": 23,
        "valueSource": [
          { "label": "下拉", "value": "multiple" },
          { "label": "标签", "value": "tags" }
        ],
        ifShow: { prop: 'multiple', value: true },
        "group": "基本属性"
      },
      {
        name: 'disabled',
        desc: '禁用',
        type: 'boolean',
        defaultValue: false,
       
        id: 'd623018b-7bda-4b3e-aa14-ad4100d11fa3',
        showName: '禁用',
        label: '禁用',
        canEdit: true,
        order: 3,

        group: '基本属性',
        groupType: 'common',
        showEvent:true
      },
      {
        id:'',
        name:'disabledValue',
        showName:'不可选中项key',
        value:null,
        defaultValue:null,
        
        editor:false,
        showEvent:true
      },

       {
        name: 'showSearch',
        desc: '启用搜索',
        type: 'boolean',
        defaultValue: false,
       
        id: 'd623018b-7bda-4b3e-aa14-ad4100d11fa3',
        showName: '启用搜索',
        label: '启用搜索',
        canEdit: true,
        order: 3,

        group: '基本属性',
        groupType: 'common'
      },
      {
        name: 'readOnly',
        desc: '只读',
        type: 'boolean',
        defaultValue: false,
       
        id: 'd623018b-7bda-4b3e-aa14-ad4100d11fa3',
        showName: '只读',
        label: '只读',
        canEdit: true,
        order: 3,

        group: '基本属性',
        groupType: 'common',
        showEvent:true
      },
      {
        "name": "placeholder",
        "desc": "选择框默认文本",
        "type": "string",
        "defaultValue": "",
        "version": "",
        "id": "d2430cc7-0051-453a-b86b-8d23cf694a9f",
        "showName": "框默认文本",
        "label": "占位符",
        "canEdit": true,
        "order": 29,
        "group": "基本属性"
      },
      {
        "name": "size",
        "desc": "选择框大小",
        "type": "large | middle | small",
        "defaultValue": "middle",
        "version": "",
        "id": "e075256f-a8fc-4b03-b87d-7e60f405861e",
        "showName": "选择框大小",
        "label": "大小",
        "canEdit": true,
        "order": 34,
        "valueSource": [
          { "label": "large", "value": "large" },
          { "label": "middle ", "value": "middle " },
          { "label": "small", "value": "small" }
        ],
        "group": "基本属性"
      },
      {
        id: '',
        name: 'labelAlign',
        showName: '标签对齐方式',
        desc: '标签对齐方式',
        label: '标签对齐方式',
        order: 1,
        type: 'string',
        //属性值的默认值
        defaultValue: 'right',
        //是否可以不设置
        isNull: true,
        valueSource: [
          { label: '左对齐', value: 'left' },
          { label: '右对齐', value: 'right' },

        ],
      },


    
      {
        id: '',
        name: 'formLayout',
        showName: '标签布局',
        desc: '标签',
        label: '标签',
        order: 1,
        type: 'select',
        //属性值的默认值
        defaultValue: 'horizontal',
        //是否可以不设置
        isNull: true,
        valueSource: [
          { label: '垂直显示', value: 'vertical' },
          { label: '水平显示', value: 'horizontal' },

        ],
      },
      {
        id: '',
        name: 'widthMode',
        showName: '宽度模式',
        desc: '标签',
        label: '标签',
        order: 1,
        type: 'select',
        //属性值的默认值
        defaultValue: 'input',
        //是否可以不设置
        isNull: true,
        valueSource: [
          { label: '占满父容器宽度', value: 'auto' },
          { label: '手动输入固定宽度', value: 'input' },

        ],
      },
      {
        id: '',
        name: 'containerWidth',
        showName: '宽度',
        desc: '宽度',
        label: '宽度',
        order: 1,
        type: 'number',
        //属性值的默认值
        defaultValue: '400',
        //是否可以不设置
        isNull: true,
        ifShow: { prop: 'widthMode', value: 'input' }

      },

      {
        id: '',
        name: 'labelColSpan',
        showName: '标签宽度占比',
        desc: '标签宽度，按照24等分',
        label: '标签宽度',
        order: 1,
        type: 'number',
        //属性值的默认值
        defaultValue: '',
        //是否可以不设置
        isNull: true,
      },
      {
        id: '',
        name: 'labelColOffset',
        showName: '标签偏移',
        desc: '标签偏移，按照24等分',
        label: '标签偏移',
        order: 1,
        type: 'number',
        //属性值的默认值
        defaultValue: '',
        //是否可以不设置
        isNull: true,
      },




      {
        id: '',
        name: 'wrapperColSpan',
        showName: '组件宽度占比',
        desc: '组件度，按照24等分',
        label: '组件宽度占比',
        order: 1,
        type: 'select',
        //属性值的默认值
        defaultValue: '',
        //是否可以不设置
        isNull: true,


      },
      {
        id: '',
        name: 'wrapperColOffet',
        showName: '组件偏移',
        desc: '组件偏移，按照24等分',
        label: '组件偏移',
        order: 1,
        type: 'string',
        //属性值的默认值
        defaultValue: '',
        //是否可以不设置
        isNull: true

      },

      {
        id:'',
        name:'value',
        showName:'选中的数据值',
        value:null,
        defaultValue:null,
        
        editor:false,
        showEvent:true
      },
      
      {
        id:'',
        name:'selectedLabel',
        showName:'选中的显示文本',
        value:null,
        defaultValue:null,
        
        editor:false,
        showEvent:true
      },
      {
        id:'',
        name:'selected',
        showName:'选中的数据',
        value:[],
        defaultValue:[],
        
        editor:false,
        showEvent:true
      },
      {
        id: '',
        name: 'fieldNames_label',
        showName: '数据label字段',
        desc: '数据label字段',
        label: '数据label字段',
        order: 1,
        type: 'string',
        defaultValue: 'label',
        isNull: true,
        editor:false
      },
      {
        id: '',
        name: 'fieldNames_value',
        showName: '数据value字段',
        desc: '数据value字段',
        label: '数据value字段',
        order: 1,
        type: 'string',
        defaultValue: 'value',
        isNull: true,
        editor:false
      },
      {
        id: '',
        name: 'fieldNames_options',
        showName: '数据options字段',
        desc: '数据options字段',
        label: '数据options字段',
        order: 1,
        type: 'string',
        defaultValue: 'options',
        isNull: true,
        editor:false
      },
      {
        id:'',
        name:'visible',
        showName:'可见',
        
        defaultValue:true,
        desc: '可见',
        label: '可见',
        type: 'boolean',
        showEvent:true
         
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
        editor:false,
        showEvent:true
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
        editor:false,
        showEvent:true
      },
    ],
    datasource: {
      type: 'customerData',
      //绑定到组件的属性名称
      bindingPropName: 'options',
      customerData: [
        
      ],
      request: {
        fileds: {
          key: '',
          value: '',
        },
        eventInfo: {
          showName: '获取数据',
          name: 'getData',
          triggetType: [],
          defaultTriggerType: '',
        }
      },
      dataMapping:[
        {source:'',target:'label',targetShowName:'label'},
        {source:'',target:'value',targetShowName:'value'},
      ]
      
    },
    event: [
      {
        showName: '选中变化',
        name: 'onChange',
        triggetType: [],
        defaultTriggerType: '',
      },
      {
        showName: '搜索事件',
        name: 'onSearch',
        triggetType: [],
        defaultTriggerType: '',
      },

      
      {
        showName: '点击事件',
        name: 'onClick',
        triggetType: [],
        defaultTriggerType: '',
      },
      {
        showName: '获得输入焦点',
        name: 'onFocus',
        triggetType: [],
        defaultTriggerType: '',
      },
    ],
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
    rules: [
     
    ],
    permissionControl:[
      {name:'visible',showName:'可见性', label:'可见性', type: 'boolean',defaultValue:false,value:false},
      {name:'enable',showName:'禁用',label:'禁用',type: 'boolean',defaultValue:false,value:false},
      {name:'readonly',showName:'只读',label:'只读',type: 'boolean',defaultValue:false,value:false}
  ],
  permission:false
  }
}


export default config