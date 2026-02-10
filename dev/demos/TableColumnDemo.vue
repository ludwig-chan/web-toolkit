<template>
  <div class="demo-container">
    <h2>TableColumn 组件演示</h2>
    
    <!-- 基础表格 -->
    <el-card class="demo-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span class="card-title">基础用法</span>
        </div>
      </template>
      
      <el-table :data="basicTableData" border style="width: 100%">
        <TableColumn prop="id" label="ID" width="80" align="center" />
        <TableColumn prop="name" label="姓名" width="120" />
        <TableColumn prop="age" label="年龄" width="100" align="center" />
        <TableColumn prop="address" label="地址" min-width="200" />
      </el-table>
    </el-card>

    <!-- 日期格式化 -->
    <el-card class="demo-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span class="card-title">日期格式化（type="date"）</span>
          <el-tag type="success">内置功能</el-tag>
        </div>
      </template>
      
      <el-table :data="dateTableData" border style="width: 100%">
        <TableColumn prop="title" label="标题" width="200" />
        <TableColumn 
          prop="createTime" 
          label="创建时间" 
          type="date"
          date-format="YYYY-MM-DD HH:mm"
          width="180"
        />
        <TableColumn 
          prop="updateTime" 
          label="更新时间（完整）" 
          type="date"
          width="200"
        />
        <TableColumn 
          prop="publishTime" 
          label="发布日期" 
          type="date"
          date-format="YYYY/MM/DD"
          width="150"
        />
      </el-table>
    </el-card>

    <!-- 状态标签 -->
    <el-card class="demo-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span class="card-title">状态标签（type="status"）</span>
          <el-tag type="warning">配置驱动</el-tag>
        </div>
      </template>
      
      <el-table :data="statusTableData" border style="width: 100%">
        <TableColumn prop="order" label="订单号" width="180" />
        <TableColumn prop="product" label="商品" width="200" />
        <TableColumn 
          prop="status" 
          label="状态" 
          type="status"
          :status-map="orderStatusMap"
          width="120"
          align="center"
        />
        <TableColumn 
          prop="payStatus" 
          label="支付状态" 
          type="status"
          :status-map="payStatusMap"
          width="120"
          align="center"
        />
        <TableColumn prop="amount" label="金额" width="120" align="right" />
      </el-table>
    </el-card>

    <!-- 自定义格式化 -->
    <el-card class="demo-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span class="card-title">自定义格式化（formatter）</span>
        </div>
      </template>
      
      <el-table :data="formatterTableData" border style="width: 100%">
        <TableColumn prop="product" label="商品名称" width="200" />
        <TableColumn 
          prop="price" 
          label="价格"
          :formatter="formatPrice"
          width="120"
          align="right"
        />
        <TableColumn 
          prop="stock" 
          label="库存"
          :formatter="formatStock"
          width="120"
          align="center"
        />
        <TableColumn 
          prop="sales" 
          label="销量"
          :formatter="formatSales"
          width="150"
          align="right"
        />
      </el-table>
    </el-card>

    <!-- 自定义插槽 -->
    <el-card class="demo-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span class="card-title">自定义插槽</span>
          <el-tag type="primary">灵活扩展</el-tag>
        </div>
      </template>
      
      <el-table :data="actionTableData" border style="width: 100%">
        <TableColumn prop="name" label="用户名" width="150" />
        <TableColumn prop="email" label="邮箱" width="200" />
        <TableColumn 
          prop="status" 
          label="状态" 
          type="status"
          :status-map="userStatusMap"
          width="100"
          align="center"
        />
        <TableColumn 
          prop="actions" 
          label="操作" 
          width="250"
          fixed="right"
          align="center"
        >
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="handleEdit(row)">
              编辑
            </el-button>
            <el-button 
              :type="row.status === 1 ? 'warning' : 'success'" 
              size="small" 
              @click="handleToggleStatus(row)"
            >
              {{ row.status === 1 ? '禁用' : '启用' }}
            </el-button>
            <el-button type="danger" size="small" @click="handleDelete(row)">
              删除
            </el-button>
          </template>
        </TableColumn>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { components } from '@edwardchan/web-toolkit'

const { TableColumn } = components

// 基础表格数据
const basicTableData = ref([
  { id: 1, name: '张三', age: 18, address: '北京市朝阳区某某街道' },
  { id: 2, name: '李四', age: 22, address: '上海市浦东新区某某路' },
  { id: 3, name: '王五', age: 25, address: '广州市天河区某某大道' },
])

// 日期格式化表格数据
const dateTableData = ref([
  {
    title: '新闻标题1',
    createTime: new Date('2024-01-15 10:30:00'),
    updateTime: new Date('2024-02-20 14:20:00'),
    publishTime: new Date('2024-01-16')
  },
  {
    title: '新闻标题2',
    createTime: new Date('2024-02-10 09:15:00'),
    updateTime: new Date('2024-02-25 16:45:00'),
    publishTime: new Date('2024-02-11')
  },
  {
    title: '新闻标题3',
    createTime: new Date(),
    updateTime: new Date(),
    publishTime: new Date()
  }
])

// 状态标签表格数据
const statusTableData = ref([
  { order: 'ORD20240101', product: 'iPhone 15 Pro', status: 1, payStatus: 1, amount: '¥7999.00' },
  { order: 'ORD20240102', product: 'MacBook Pro', status: 2, payStatus: 1, amount: '¥12999.00' },
  { order: 'ORD20240103', product: 'AirPods Pro', status: 0, payStatus: 0, amount: '¥1999.00' },
  { order: 'ORD20240104', product: 'iPad Air', status: 3, payStatus: 1, amount: '¥4799.00' }
])

const orderStatusMap = {
  0: { label: '待处理', type: 'info' },
  1: { label: '处理中', type: 'warning' },
  2: { label: '已完成', type: 'success' },
  3: { label: '已取消', type: 'danger' }
}

const payStatusMap = {
  0: { label: '未支付', type: 'danger' },
  1: { label: '已支付', type: 'success' }
}

// 自定义格式化表格数据
const formatterTableData = ref([
  { product: 'iPhone 15 Pro', price: 7999, stock: 150, sales: 1250 },
  { product: 'MacBook Pro', price: 12999, stock: 50, sales: 680 },
  { product: 'AirPods Pro', price: 1999, stock: 5, sales: 3420 },
  { product: 'iPad Air', price: 4799, stock: 0, sales: 890 }
])

const formatPrice = (row, column, cellValue) => {
  return `¥${cellValue.toFixed(2)}`
}

const formatStock = (row, column, cellValue) => {
  if (cellValue === 0) return '缺货'
  if (cellValue < 50) return `${cellValue} (库存紧张)`
  return `${cellValue}`
}

const formatSales = (row, column, cellValue) => {
  if (cellValue > 1000) return `${(cellValue / 1000).toFixed(1)}k 件`
  return `${cellValue} 件`
}

// 自定义插槽表格数据
const actionTableData = ref([
  { id: 1, name: 'admin', email: 'admin@example.com', status: 1 },
  { id: 2, name: 'user1', email: 'user1@example.com', status: 1 },
  { id: 3, name: 'user2', email: 'user2@example.com', status: 0 }
])

const userStatusMap = {
  0: { label: '禁用', type: 'danger' },
  1: { label: '启用', type: 'success' }
}

const handleEdit = (row) => {
  ElMessage.success(`编辑用户：${row.name}`)
}

const handleToggleStatus = (row) => {
  row.status = row.status === 1 ? 0 : 1
  ElMessage.success(`已${row.status === 1 ? '启用' : '禁用'}用户：${row.name}`)
}

const handleDelete = (row) => {
  ElMessage.error(`删除用户：${row.name}`)
}
</script>

<style scoped>
.demo-container {
  padding: 20px;
}

h2 {
  margin: 0 0 24px 0;
  color: #303133;
  font-size: 24px;
}

.demo-card {
  margin-bottom: 24px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: #303133;
}
</style>
