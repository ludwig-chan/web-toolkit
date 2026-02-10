<template>
  <div class="docs-container">
    <h2>📖 API 文档</h2>
    
    <!-- 快速导航 -->
    <el-card class="nav-card" shadow="hover">
      <el-space wrap>
        <el-button @click="scrollTo('utils')">工具函数</el-button>
        <el-button @click="scrollTo('components')">组件</el-button>
        <el-button type="primary" @click="openGithub">
          <el-icon><Link /></el-icon>
          GitHub 仓库
        </el-button>
      </el-space>
    </el-card>

    <!-- 工具函数文档 -->
    <div id="utils" class="section">
      <el-card shadow="hover">
        <template #header>
          <h3>🛠️ utils - 工具函数命名空间</h3>
        </template>
        
        <el-collapse>
          <el-collapse-item title="formatDate(date, format)" name="1">
            <div class="api-item">
              <p><strong>说明：</strong>格式化日期时间为指定格式的字符串</p>
              <p><strong>参数：</strong></p>
              <ul>
                <li><code>date</code> - Date | string | number - 日期对象、时间戳或日期字符串</li>
                <li><code>format</code> - string - 格式化模板，默认：'YYYY-MM-DD HH:mm:ss'</li>
              </ul>
              <p><strong>返回值：</strong>string - 格式化后的日期字符串</p>
              <div class="code-example">
                <pre><code>import { utils } from '@edwardchan/web-toolkit'

utils.formatDate(new Date(), 'YYYY-MM-DD')
// => '2026-02-10'</code></pre>
              </div>
            </div>
          </el-collapse-item>

          <el-collapse-item title="getRelativeTime(date)" name="2">
            <div class="api-item">
              <p><strong>说明：</strong>获取相对时间描述（如：刚刚、5分钟前、2小时前等）</p>
              <p><strong>参数：</strong></p>
              <ul>
                <li><code>date</code> - Date | string | number - 日期对象、时间戳或日期字符串</li>
              </ul>
              <p><strong>返回值：</strong>string - 相对时间描述</p>
              <div class="code-example">
                <pre><code>import { utils } from '@edwardchan/web-toolkit'

utils.getRelativeTime(new Date(Date.now() - 60000))
// => '1分钟前'</code></pre>
              </div>
            </div>
          </el-collapse-item>

          <el-collapse-item title="isToday(date)" name="3">
            <div class="api-item">
              <p><strong>说明：</strong>判断给定日期是否为今天</p>
              <p><strong>参数：</strong></p>
              <ul>
                <li><code>date</code> - Date | string | number - 日期对象、时间戳或日期字符串</li>
              </ul>
              <p><strong>返回值：</strong>boolean - 是否为今天</p>
              <div class="code-example">
                <pre><code>import { utils } from '@edwardchan/web-toolkit'

utils.isToday(new Date())
// => true</code></pre>
              </div>
            </div>
          </el-collapse-item>

          <el-collapse-item title="isThisWeek(date)" name="4">
            <div class="api-item">
              <p><strong>说明：</strong>判断给定日期是否为本周</p>
              <p><strong>参数：</strong></p>
              <ul>
                <li><code>date</code> - Date | string | number - 日期对象、时间戳或日期字符串</li>
              </ul>
              <p><strong>返回值：</strong>boolean - 是否为本周</p>
              <div class="code-example">
                <pre><code>import { utils } from '@edwardchan/web-toolkit'

utils.isThisWeek(new Date())
// => true</code></pre>
              </div>
            </div>
          </el-collapse-item>

          <el-collapse-item title="getDateRange(type)" name="5">
            <div class="api-item">
              <p><strong>说明：</strong>获取指定类型的日期范围</p>
              <p><strong>参数：</strong></p>
              <ul>
                <li><code>type</code> - string - 范围类型：'today' | 'yesterday' | 'week' | 'month' | 'year'</li>
              </ul>
              <p><strong>返回值：</strong>Array&lt;Date&gt; - 日期范围 [startDate, endDate]</p>
              <div class="code-example">
                <pre><code>import { utils } from '@edwardchan/web-toolkit'

const [start, end] = utils.getDateRange('today')
// => [今天 00:00:00, 今天 23:59:59]</code></pre>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-card>
    </div>

    <!-- 组件文档 -->
    <div id="components" class="section">
      <el-card shadow="hover">
        <template #header>
          <h3>🧩 components - 组件命名空间</h3>
        </template>
        
        <el-collapse>
          <el-collapse-item title="TableColumn - 表格列组件" name="1">
            <div class="api-item">
              <p><strong>说明：</strong>基于 Element Plus 的 el-table-column 二次封装，提供更便捷的配置和扩展功能</p>
              
              <p><strong>Props：</strong></p>
              <el-table :data="tableColumnProps" border>
                <el-table-column prop="name" label="参数" width="150" />
                <el-table-column prop="type" label="类型" width="150" />
                <el-table-column prop="default" label="默认值" width="150" />
                <el-table-column prop="desc" label="说明" />
              </el-table>
              
              <p style="margin-top: 20px"><strong>示例：</strong></p>
              <div class="code-example">
                <pre><code>&lt;template&gt;
  &lt;el-table :data="tableData"&gt;
    &lt;!-- 基础用法 --&gt;
    &lt;TableColumn prop="name" label="姓名" /&gt;
    
    &lt;!-- 日期格式化 --&gt;
    &lt;TableColumn 
      prop="createTime" 
      label="创建时间" 
      type="date"
      date-format="YYYY-MM-DD"
    /&gt;
    
    &lt;!-- 状态标签 --&gt;
    &lt;TableColumn 
      prop="status" 
      label="状态" 
      type="status"
      :status-map="{
        1: { label: '启用', type: 'success' },
        0: { label: '禁用', type: 'danger' }
      }"
    /&gt;
  &lt;/el-table&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { components } from '@edwardchan/web-toolkit'
const { TableColumn } = components
&lt;/script&gt;</code></pre>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-card>
    </div>

    <!-- 使用方式 -->
    <el-card class="section" shadow="hover">
      <template #header>
        <h3>📦 导入方式</h3>
      </template>
      
      <el-tabs type="border-card">
        <el-tab-pane label="命名空间导入（推荐）">
          <div class="code-example">
            <pre><code>// ES Module
import { utils, components } from '@edwardchan/web-toolkit'

// 使用工具函数
utils.formatDate(new Date())

// 使用组件
const { TableColumn } = components</code></pre>
          </div>
        </el-tab-pane>
        
        <el-tab-pane label="按需导入">
          <div class="code-example">
            <pre><code>// ES Module
import { formatDate, getRelativeTime, TableColumn } from '@edwardchan/web-toolkit'

// 直接使用
formatDate(new Date())</code></pre>
          </div>
        </el-tab-pane>
        
        <el-tab-pane label="CommonJS">
          <div class="code-example">
            <pre><code>// CommonJS
const { utils, components } = require('@edwardchan/web-toolkit')

// 使用
utils.formatDate(new Date())</code></pre>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const tableColumnProps = ref([
  { name: 'prop', type: 'string', default: '-', desc: '字段名称' },
  { name: 'label', type: 'string', default: '-', desc: '列标题' },
  { name: 'width', type: 'string/number', default: '-', desc: '列宽度' },
  { name: 'align', type: 'string', default: 'left', desc: '对齐方式：left/center/right' },
  { name: 'type', type: 'string', default: '-', desc: '扩展类型：date/status/selection/index' },
  { name: 'dateFormat', type: 'string', default: 'YYYY-MM-DD HH:mm:ss', desc: '日期格式' },
  { name: 'formatter', type: 'function', default: '-', desc: '自定义格式化函数' },
  { name: 'statusMap', type: 'object', default: '{}', desc: '状态映射配置' },
  { name: 'showOverflowTooltip', type: 'boolean', default: 'true', desc: '溢出显示提示' }
])

const scrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const openGithub = () => {
  window.open('https://github.com/ludwig-chan/web-toolkit', '_blank')
}
</script>

<style scoped>
.docs-container {
  padding: 20px;
}

h2 {
  margin: 0 0 24px 0;
  color: #303133;
  font-size: 24px;
}

.nav-card {
  margin-bottom: 24px;
}

.section {
  margin-bottom: 24px;
  scroll-margin-top: 20px;
}

h3 {
  margin: 0;
  color: #303133;
  font-size: 20px;
  font-weight: 600;
}

.api-item {
  padding: 16px;
}

.api-item p {
  margin: 12px 0;
  line-height: 1.6;
}

.api-item ul {
  margin: 8px 0;
  padding-left: 24px;
}

.api-item li {
  margin: 8px 0;
  line-height: 1.6;
}

.api-item code {
  padding: 2px 6px;
  background: #f4f4f5;
  border-radius: 3px;
  color: #e83e8c;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 13px;
}

.code-example {
  margin-top: 16px;
  background: #282c34;
  border-radius: 4px;
  padding: 16px;
}

.code-example pre {
  margin: 0;
  color: #abb2bf;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 13px;
  line-height: 1.6;
  overflow-x: auto;
}
</style>
