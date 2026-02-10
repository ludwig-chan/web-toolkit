<template>
  <div class="dev-container">
    <el-container>
      <el-header>
        <h1>🛠️ Web Toolkit 开发调试</h1>
        <p>本地开发环境 - 用于测试组件和工具函数</p>
      </el-header>
      
      <el-main>
        <el-tabs v-model="activeTab" type="border-card">
          <!-- 日期工具函数演示 -->
          <el-tab-pane label="📅 日期工具" name="date">
            <DateUtilsDemo />
          </el-tab-pane>
          
          <!-- TableColumn 组件演示 -->
          <el-tab-pane label="📊 TableColumn 组件" name="table">
            <TableColumnDemo />
          </el-tab-pane>
          
          <!-- API 文档 -->
          <el-tab-pane label="📖 API 文档" name="docs">
            <ApiDocs />
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DateUtilsDemo from './demos/DateUtilsDemo.vue'
import TableColumnDemo from './demos/TableColumnDemo.vue'
import ApiDocs from './demos/ApiDocs.vue'

const activeTab = ref('date')
</script>

<style scoped>
.dev-container {
  min-height: 100vh;
  background: #f5f7fa;
}

.el-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 30px;
  text-align: center;
}

.el-header h1 {
  margin: 0 0 10px 0;
  font-size: 32px;
  font-weight: 600;
}

.el-header p {
  margin: 0;
  font-size: 16px;
  opacity: 0.9;
}

.el-main {
  padding: 30px;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}

:deep(.el-tabs--border-card) {
  border: none;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
