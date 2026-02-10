# web-toolkit

我的个人提效工具包，包含常用组件和工具函数。

## 特性

- 🛠️ **工具函数**：日期时间处理等常用工具函数
- 🧩 **Vue 组件**：基于 Element Plus 的二次封装组件
- 📦 **模块化**：清晰的命名空间，支持按需导入
- 📝 **TypeScript**：完善的类型定义（规划中）

## 项目结构

```
web-toolkit/
├── src/                 # 源代码
│   ├── utils/           # 工具函数模块
│   │   ├── date.js      # 日期时间工具
│   │   └── index.js     # 统一导出
│   ├── components/      # Vue 组件模块
│   │   └── TableColumn.vue  # 表格列组件
│   └── index.js         # 入口文件
├── dev/                 # 开发调试（本地演示）
│   ├── demos/           # 交互式演示组件
│   ├── App.vue          # 演示应用
│   └── main.js          # 演示入口
└── package.json
```

## 安装

```bash
npm install @edwardchan/web-toolkit
```

**注意**：如果使用 Vue 组件，需要确保项目已安装：
- `vue ^3.0.0`
- `element-plus ^2.0.0`

## 快速开始

```javascript
// 导入命名空间
import { utils, components } from '@edwardchan/web-toolkit';

// 使用工具函数
const formattedDate = utils.formatDate(new Date(), 'YYYY-MM-DD');
const relativeTime = utils.getRelativeTime(new Date());

// 使用组件
const { TableColumn } = components;
```

或者按需导入：

```javascript
import { formatDate, getRelativeTime, TableColumn } from '@edwardchan/web-toolkit';
```

## 本地开发调试

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问 http://localhost:3000 查看演示和调试
```

开发服务器提供了完整的演示页面，包括：
- 📅 所有日期工具函数的实时演示
- 📊 TableColumn 组件的各种用法示例
- 📖 完整的 API 文档

详见 [开发调试指南](./DEV_GUIDE.md)

## 使用

### 方式一：命名空间导入（推荐）

使用命名空间导入，代码结构更清晰：

```javascript
// ES Module
import { utils, components } from '@edwardchan/web-toolkit';

// 使用日期工具
utils.formatDate(new Date());
utils.getRelativeTime(new Date());

// 使用组件
const { TableColumn } = components;
```

```javascript
// CommonJS
const { utils, components } = require('@edwardchan/web-toolkit');

// 使用工具函数
utils.formatDate(new Date());
```

### 方式二：按需导入

如果只需要部分功能，可以按需导入：

```javascript
// ES Module
import { formatDate, getRelativeTime, TableColumn } from '@edwardchan/web-toolkit';

// CommonJS
const { formatDate, TableColumn } = require('@edwardchan/web-toolkit');
```

### 工具函数

#### 日期时间工具

提供了一套完整的日期时间处理工具函数。

```javascript
import { utils } from '@edwardchan/web-toolkit';

// 或者按需导入
import { formatDate, getRelativeTime, isToday, isThisWeek, getDateRange } from '@edwardchan/web-toolkit';
```

##### formatDate - 日期格式化

格式化日期时间为指定格式的字符串。

```javascript
// 格式化当前时间
formatDate(new Date())
// => '2026-02-10 10:30:45'

// 自定义格式
formatDate(new Date(), 'YYYY/MM/DD')
// => '2026/02/10'

// 格式化时间戳
formatDate(1704614400000, 'YYYY-MM-DD')
// => '2024-01-07'

// 空值处理
formatDate(null)
// => '-'
```

**支持的格式占位符：**
- `YYYY` - 四位年份
- `MM` - 两位月份（01-12）
- `DD` - 两位日期（01-31）
- `HH` - 24小时制小时（00-23）
- `mm` - 分钟（00-59）
- `ss` - 秒数（00-59）

##### getRelativeTime - 相对时间

获取相对时间描述（如：刚刚、5分钟前、2小时前等）。

```javascript
getRelativeTime(new Date(Date.now() - 60000))
// => '1分钟前'

getRelativeTime(new Date(Date.now() - 3600000))
// => '1小时前'

getRelativeTime(new Date(Date.now() - 86400000))
// => '1天前'
```

##### isToday - 判断是否为今天

```javascript
isToday(new Date())
// => true

isToday('2024-01-01')
// => false
```

##### isThisWeek - 判断是否为本周

```javascript
isThisWeek(new Date())
// => true
```

##### getDateRange - 获取日期范围

```javascript
// 获取今天的日期范围
getDateRange('today')
// => [startDate, endDate]

// 支持的类型：today, yesterday, week, month, year
getDateRange('week')
// => [本周一开始时间, 当前时间]
```

### Vue 组件

#### TableColumn - 表格列组件

基于 Element Plus 的 `el-table-column` 进行二次封装，提供更便捷的配置和扩展功能。

##### 基础使用

```vue
<template>
  <el-table :data="tableData">
    <TableColumn prop="name" label="姓名" width="180" />
    <TableColumn prop="age" label="年龄" align="center" />
    <TableColumn prop="address" label="地址" />
  </el-table>
</template>

<script setup>
// 方式一：命名空间导入
import { components } from '@edwardchan/web-toolkit'
const { TableColumn } = components

// 方式二：按需导入
import { TableColumn } from '@edwardchan/web-toolkit'

const tableData = [
  { name: '张三', age: 18, address: '北京市朝阳区' },
  { name: '李四', age: 22, address: '上海市浦东新区' }
]
</script>
```

##### 日期格式化

```vue
<TableColumn 
  prop="createTime" 
  label="创建时间" 
  type="date"
  date-format="YYYY-MM-DD"
/>
```

##### 状态标签

```vue
<TableColumn 
  prop="status" 
  label="状态" 
  type="status"
  :status-map="{
    1: { label: '启用', type: 'success' },
    0: { label: '禁用', type: 'danger' }
  }"
/>
```

##### 自定义格式化

```vue
<TableColumn 
  prop="price" 
  label="价格"
  :formatter="(row, column, cellValue) => `¥${cellValue.toFixed(2)}`"
/>
```

##### 自定义插槽

```vue
<TableColumn prop="actions" label="操作" width="200">
  <template #default="{ row }">
    <el-button type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
    <el-button type="danger" size="small" @click="handleDelete(row)">删除</el-button>
  </template>
</TableColumn>
```

##### Props 说明

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| prop | 字段名称 | string | — | — |
| label | 列标题 | string | — | — |
| width | 列宽度 | string/number | — | — |
| minWidth | 最小列宽度 | string/number | — | — |
| fixed | 列固定位置 | string/boolean | left/right/true/false | false |
| sortable | 是否可排序 | boolean/string | true/false/'custom' | false |
| align | 对齐方式 | string | left/center/right | left |
| headerAlign | 表头对齐方式 | string | left/center/right | 继承 align |
| showOverflowTooltip | 溢出显示提示 | boolean | — | true |
| type | 扩展类型 | string | date/status/selection/index/expand | — |
| dateFormat | 日期格式 | string | — | YYYY-MM-DD HH:mm:ss |
| formatter | 自定义格式化函数 | function | — | — |
| statusMap | 状态映射配置 | object | — | {} |

## 命名空间说明

### utils 命名空间

包含所有工具函数，目前提供日期时间相关功能：

```javascript
import { utils } from '@edwardchan/web-toolkit';

// 可用方法
utils.formatDate()      // 日期格式化
utils.getRelativeTime() // 相对时间
utils.isToday()         // 判断是否今天
utils.isThisWeek()      // 判断是否本周
utils.getDateRange()    // 获取日期范围
```

### components 命名空间

包含所有 Vue 组件：

```javascript
import { components } from '@edwardchan/web-toolkit';

// 可用组件
components.TableColumn  // 表格列组件
```

### 为什么使用命名空间？

1. **结构清晰**：一眼就能看出功能的分类和来源
2. **避免冲突**：不同模块的同名功能不会冲突
3. **易于扩展**：后续添加新功能时结构不会混乱
4. **向后兼容**：同时保留按需导入的方式

```javascript
// 命名空间方式：结构清晰
import { utils, components } from '@edwardchan/web-toolkit';
utils.formatDate(...);

// 按需导入：代码简洁
import { formatDate } from '@edwardchan/web-toolkit';
formatDate(...);
```

## API

### 日期时间工具 API

#### formatDate(date, format)

- **date**: `Date | string | number` - 日期对象、时间戳或日期字符串
- **format**: `string` - 格式化模板，默认值：`'YYYY-MM-DD HH:mm:ss'`
- **返回值**: `string` - 格式化后的日期字符串

#### getRelativeTime(date)

- **date**: `Date | string | number` - 日期对象、时间戳或日期字符串
- **返回值**: `string` - 相对时间描述

#### isToday(date)

- **date**: `Date | string | number` - 日期对象、时间戳或日期字符串
- **返回值**: `boolean` - 是否为今天

#### isThisWeek(date)

- **date**: `Date | string | number` - 日期对象、时间戳或日期字符串
- **返回值**: `boolean` - 是否为本周

#### getDateRange(type)

- **type**: `string` - 范围类型：`today` | `yesterday` | `week` | `month` | `year`
- **返回值**: `Array<Date>` - 日期范围 [startDate, endDate]

## License

MIT © ludwig-chan
