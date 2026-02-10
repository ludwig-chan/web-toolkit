<template>
  <el-table-column
    v-bind="columnProps"
    :align="align"
    :header-align="headerAlign || align"
    :show-overflow-tooltip="showOverflowTooltip"
  >
    <!-- 自定义表头插槽 -->
    <template v-if="$slots.header" #header="scope">
      <slot name="header" v-bind="scope" />
    </template>

    <!-- 默认内容插槽 -->
    <template #default="scope">
      <slot v-bind="scope">
        <!-- 如果提供了 formatter，使用 formatter -->
        <span v-if="formatter">{{ formatter(scope.row, scope.column, scope.row[prop], scope.$index) }}</span>
        <!-- 日期类型格式化 -->
        <span v-else-if="type === 'date'">{{ formatDateValue(scope.row[prop]) }}</span>
        <!-- 状态类型（带标签） -->
        <el-tag v-else-if="type === 'status'" :type="getStatusType(scope.row[prop])">
          {{ getStatusLabel(scope.row[prop]) }}
        </el-tag>
        <!-- 默认显示 -->
        <span v-else>{{ scope.row[prop] }}</span>
      </slot>
    </template>
  </el-table-column>
</template>

<script setup>
import { computed } from 'vue'
import { ElTableColumn, ElTag } from 'element-plus'
import { formatDate } from '../utils/date.js'

const props = defineProps({
  // 基础属性
  prop: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  width: {
    type: [String, Number],
    default: ''
  },
  minWidth: {
    type: [String, Number],
    default: ''
  },
  fixed: {
    type: [String, Boolean],
    default: false
  },
  sortable: {
    type: [Boolean, String],
    default: false
  },
  // 对齐方式
  align: {
    type: String,
    default: 'left',
    validator: (value) => ['left', 'center', 'right'].includes(value)
  },
  headerAlign: {
    type: String,
    default: '',
    validator: (value) => ['', 'left', 'center', 'right'].includes(value)
  },
  // 溢出提示
  showOverflowTooltip: {
    type: Boolean,
    default: true
  },
  // 扩展类型
  type: {
    type: String,
    default: '',
    validator: (value) => ['', 'date', 'status', 'selection', 'index', 'expand'].includes(value)
  },
  // 日期格式
  dateFormat: {
    type: String,
    default: 'YYYY-MM-DD HH:mm:ss'
  },
  // 格式化函数
  formatter: {
    type: Function,
    default: null
  },
  // 状态映射配置
  statusMap: {
    type: Object,
    default: () => ({})
  }
})

// 将所有 props 传递给 el-table-column
const columnProps = computed(() => {
  const { align, headerAlign, showOverflowTooltip, dateFormat, statusMap, ...rest } = props
  return rest
})

// 日期格式化
const formatDateValue = (value) => {
  return formatDate(value, props.dateFormat)
}

// 获取状态标签类型
const getStatusType = (status) => {
  if (!props.statusMap[status]) return 'info'
  return props.statusMap[status].type || 'info'
}

// 获取状态标签文本
const getStatusLabel = (status) => {
  if (!props.statusMap[status]) return status
  return props.statusMap[status].label || status
}
</script>

<style scoped>
/* 可以在这里添加自定义样式 */
</style>
