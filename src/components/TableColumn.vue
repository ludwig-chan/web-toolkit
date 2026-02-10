<template>
  <el-table-column v-bind="$attrs">
    <template v-for="(_, name) in $slots" #[name]="scope">
      <slot :name="name" v-bind="scope">
        <span v-if="name === 'default'">{{ isEmptyValue(scope.row[$attrs.prop]) ? '-' : scope.row[$attrs.prop] }}</span>
      </slot>
    </template>
  </el-table-column>
</template>

<script setup>
import { ElTableColumn } from 'element-plus'

defineOptions({
  inheritAttrs: false
})

const isEmptyValue = (value) => {
  return value === null || value === undefined || value === ''
}
</script>
