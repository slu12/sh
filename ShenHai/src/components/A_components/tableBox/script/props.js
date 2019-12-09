export default {
  props: {
    /**
     * 通过Table组件父级元素高度
     * 设置Table组件的高度
     *
     * 当页面 只有一个table 组件的时候 “ table_box_id ” 不需要传值
     * 当页面 只有多个table 组件的时候 “ table_box_id ” 需要传不同的 “id”值
     */
    table_box_id: {
      type: String,
      default: () => {
        return 'table_box_id'
      }
    },
    /**
     * Table 进本属性值 与
     * Iview Table 表格属性一致
     */
    columns: {
      type: Array,
      default: () => {
        return []
      }
    },
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    stripe: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    width: {
      type: [Number, String]
    },
    maxHeight: {
      type: [Number, String]
    },
    loading: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    disabledHover: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    highlightRow: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    rowClassName: {
      type: Function,
      default () {
        return '';
      }
    },
    size: {
      type:String,
      default:()=>{
        return 'default'
      }
    },
    noDataText: {
      type: String
    },
    noFilteredDataText: {
      type: String
    },
    draggable: {
      type: Boolean,
      default: false
    },
    tooltipTheme: {
      type: String,
      default: 'dark'
    },
    rowKey: {
      type: Boolean,
      default: false
    }
  }
}
