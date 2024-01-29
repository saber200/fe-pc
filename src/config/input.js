export default {
  "id": "pack_Input",
  "name": "Input",
  "toolbox": {
    "group": "form",
    "name": "Input",
    "showName": "Input",
    "order": "",
    "render": ""
  },
  "render": {
    "name": "Input",
    "parent": "input",
    "render": "",
    "isFormData": true,
    "layout": {
      "w": 1,
      "h": 1,
      "x": 0,
      "y": 0,
      "i": "page_r16mw~Input_3",
      "minW": 2,
      "moved": false,
      "static": false,
      "isDraggable": true,
      "text": "Input"
    },
    "props": [
      {
        "id": "",
        "name": "name",
        "showName": "组件备注",
        "desc": "组件备注",
        "label": "组件备注",
        "order": 1,
        "type": "string",
        "defaultValue": "文本框",
        "isNull": true,
        "value": ""
      },
      {
        "id": "",
        "name": "value",
        "showName": "文本框内容",
        "desc": "文本框内容",
        "label": "文本框内容",
        "order": 1,
        "type": "string",
        "defaultValue": "",
        "isNull": true,
        "showEvent": true,
        "value": "请输入产品名称"
      },
      {
        "name": "allowClear",
        "desc": "可以点击清除图标删除内容",
        "type": "boolean",
        "defaultValue": false,
        "version": "",
        "id": "4d4c2217-f3f2-4556-89fe-6fff594a8451",
        "showName": "可清除",
        "label": "可清除",
        "canEdit": true,
        "order": 2,
        "valueSource": [
          {
            "label": "true",
            "value": true
          },
          {
            "label": "false ",
            "value": false
          }
        ],
        "group": "基本属性",
        "groupType": "common",
        "value": true
      },
      {
        "name": "bordered",
        "desc": "是否有边框",
        "type": "boolean",
        "defaultValue": true,
        "version": "4.5.0",
        "id": "d623018b-7bda-4b3e-aa14-ad4100d11fa3",
        "showName": "是否有边框",
        "label": "是否有边框",
        "canEdit": true,
        "order": 3,
        "group": "基本属性",
        "groupType": "common",
        "value": true
      },
      {
        "name": "disabled",
        "desc": "禁用",
        "type": "boolean",
        "defaultValue": false,
        "id": "d623018b-7bda-4b3e-aa14-ad4100d11fa3",
        "showName": "禁用",
        "label": "禁用",
        "canEdit": true,
        "order": 3,
        "group": "基本属性",
        "groupType": "common",
        "showEvent": true,
        "value": ""
      },
      {
        "name": "readOnly",
        "desc": "只读",
        "type": "boolean",
        "defaultValue": false,
        "id": "d623018b-7bda-4b3e-aa14-ad4100d11fa3",
        "showName": "只读",
        "label": "只读",
        "canEdit": true,
        "order": 3,
        "group": "基本属性",
        "groupType": "common",
        "showEvent": true,
        "value": ""
      },
      {
        "name": "maxLength",
        "desc": "最大长度",
        "type": "number",
        "defaultValue": "-",
        "version": "",
        "id": "750af6cc-6c92-4618-91e3-fb4b8013fed7",
        "showName": "最大长度",
        "label": "最大长度",
        "canEdit": true,
        "order": 7,
        "group": "基本属性",
        "groupType": "common",
        "value": "-"
      },
      {
        "name": "size",
        "desc": "控件大小。注：标准表单内的输入框大小限制为 large",
        "type": "string",
        "defaultValue": "middle",
        "version": "",
        "id": "31d0d0ef-ed8c-46e9-8009-2f7e7e897045",
        "showName": "大小",
        "label": "大小",
        "canEdit": true,
        "order": 9,
        "valueSource": [
          {
            "label": "大",
            "value": "large"
          },
          {
            "label": "中 ",
            "value": "middle"
          },
          {
            "label": "小",
            "value": "small"
          }
        ],
        "group": "基本属性",
        "groupType": "common",
        "value": "middle"
      },
      {
        "id": "",
        "name": "label",
        "showName": "标签",
        "desc": "标签",
        "label": "标签",
        "order": 1,
        "type": "string",
        "defaultValue": "",
        "isNull": true,
        "value": "产品名称"
      },
      {
        "id": "",
        "name": "labelAlign",
        "showName": "标签对齐方式",
        "desc": "标签对齐方式",
        "label": "标签对齐方式",
        "order": 1,
        "type": "string",
        "defaultValue": "right",
        "isNull": true,
        "valueSource": [
          {
            "label": "左对齐",
            "value": "left"
          },
          {
            "label": "右对齐",
            "value": "right"
          }
        ],
        "value": "right"
      },
      {
        "id": "",
        "name": "formLayout",
        "showName": "标签布局",
        "desc": "标签",
        "label": "标签",
        "order": 1,
        "type": "select",
        "defaultValue": "horizontal",
        "isNull": true,
        "valueSource": [
          {
            "label": "垂直显示",
            "value": "vertical"
          },
          {
            "label": "水平显示",
            "value": "horizontal"
          }
        ],
        "value": "horizontal"
      },
      {
        "id": "",
        "name": "widthMode",
        "showName": "宽度模式",
        "desc": "标签",
        "label": "标签",
        "order": 1,
        "type": "select",
        "defaultValue": "input",
        "isNull": true,
        "valueSource": [
          {
            "label": "占满父容器宽度",
            "value": "auto"
          },
          {
            "label": "手动输入固定宽度",
            "value": "input"
          }
        ],
        "value": "input"
      },
      {
        "id": "",
        "name": "containerWidth",
        "showName": "宽度",
        "desc": "宽度",
        "label": "宽度",
        "order": 1,
        "type": "number",
        "defaultValue": "300",
        "isNull": true,
        "ifShow": {
          "prop": "widthMode",
          "value": "input"
        },
        "value": "300"
      },
      {
        "id": "",
        "name": "labelColSpan",
        "showName": "标签宽度占比",
        "desc": "标签宽度，按照24等分",
        "label": "标签宽度",
        "order": 1,
        "type": "number",
        "defaultValue": "",
        "isNull": true,
        "value": ""
      },
      {
        "id": "",
        "name": "labelColOffset",
        "showName": "标签偏移",
        "desc": "标签偏移，按照24等分",
        "label": "标签偏移",
        "order": 1,
        "type": "number",
        "defaultValue": "",
        "isNull": true,
        "value": ""
      },
      {
        "id": "",
        "name": "wrapperColSpan",
        "showName": "组件宽度占比",
        "desc": "组件度，按照24等分",
        "label": "组件宽度占比",
        "order": 1,
        "type": "select",
        "defaultValue": "",
        "isNull": true,
        "value": ""
      },
      {
        "id": "",
        "name": "wrapperColOffet",
        "showName": "组件偏移",
        "desc": "组件偏移，按照24等分",
        "label": "组件偏移",
        "order": 1,
        "type": "string",
        "defaultValue": "",
        "isNull": true,
        "value": ""
      },
      {
        "id": "",
        "name": "visible",
        "showName": "可见",
        "defaultValue": true,
        "desc": "可见",
        "label": "可见",
        "type": "boolean",
        "showEvent": true,
        "value": true
      },
      {
        "id": "",
        "name": "showLoading",
        "showName": "显示加载状态",
        "desc": "显示加载状态",
        "label": "显示加载状态",
        "order": 1,
        "type": "boolean",
        "defaultValue": false,
        "isNull": true,
        "editor": false,
        "showEvent": true,
        "value": false
      },
      {
        "id": "",
        "name": "showLoadingText",
        "showName": "加载状态提示文字",
        "desc": "加载状态提示文字",
        "label": "加载状态提示文字",
        "order": 1,
        "type": "string",
        "defaultValue": "",
        "isNull": true,
        "editor": false,
        "showEvent": true,
        "value": ""
      }
    ],
    "event": [
      {
        "showName": "输入变化",
        "name": "onChange",
        "triggetType": [],
        "defaultTriggerType": ""
      },
      {
        "showName": "回车",
        "name": "onPressEnter",
        "triggetType": [],
        "defaultTriggerType": ""
      },
      {
        "showName": "点击",
        "name": "onClick",
        "triggetType": [],
        "defaultTriggerType": ""
      },
      {
        "showName": "获得输入焦点",
        "name": "onFocus",
        "triggetType": [],
        "defaultTriggerType": ""
      }
    ],
    "commonStyle": [
      {
        "name": "styleBox",
        "showName": "边距",
        "value": {},
        "defaultValue": {}
      },
      {
        "name": "border",
        "showName": "边框",
        "value": {},
        "defaultValue": {}
      },
      {
        "name": "background",
        "showName": "背景",
        "value": "",
        "defaultValue": ""
      },
      {
        "name": "width",
        "showName": "宽度",
        "value": "",
        "defaultValue": ""
      },
      {
        "name": "height",
        "showName": "高度",
        "value": "",
        "defaultValue": ""
      }
    ],
    "rules": [],
    "permissionControl": [
      {
        "name": "visible",
        "showName": "可见性",
        "label": "可见性",
        "type": "boolean",
        "defaultValue": false,
        "value": false
      },
      {
        "name": "enable",
        "showName": "禁用",
        "label": "禁用",
        "type": "boolean",
        "defaultValue": false,
        "value": false
      },
      {
        "name": "readonly",
        "showName": "只读",
        "label": "只读",
        "type": "boolean",
        "defaultValue": false,
        "value": false
      }
    ],
    "renderOrder": 1
  },
  "pack": "antd",
  "instanceId": "page_r16mw~Input_3",
  "parentId": "page_r16mw~grid1_2",
  "containerId": "page_r16mw",
  "containerType": 2
}