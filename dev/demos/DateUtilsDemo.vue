<template>
  <div class="demo-container">
    <h2>日期工具函数演示</h2>
    
    <!-- formatDate -->
    <el-card class="demo-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span class="card-title">formatDate - 日期格式化</span>
          <el-tag type="success">推荐</el-tag>
        </div>
      </template>
      
      <div class="demo-item">
        <el-space direction="vertical" :size="15" style="width: 100%">
          <div class="input-group">
            <label>选择日期：</label>
            <el-date-picker
              v-model="selectedDate"
              type="datetime"
              placeholder="选择日期时间"
            />
          </div>
          
          <div class="input-group">
            <label>格式化模板：</label>
            <el-select v-model="dateFormat" placeholder="选择格式">
              <el-option label="YYYY-MM-DD HH:mm:ss" value="YYYY-MM-DD HH:mm:ss" />
              <el-option label="YYYY-MM-DD" value="YYYY-MM-DD" />
              <el-option label="YYYY/MM/DD" value="YYYY/MM/DD" />
              <el-option label="MM/DD/YYYY" value="MM/DD/YYYY" />
              <el-option label="HH:mm:ss" value="HH:mm:ss" />
              <el-option label="YYYY年MM月DD日" value="YYYY年MM月DD日" />
            </el-select>
          </div>
          
          <div class="result-box">
            <strong>结果：</strong>
            <code>{{ formattedDate }}</code>
          </div>
          
          <div class="code-box">
            <strong>代码：</strong>
            <pre><code>import { utils } from '@edwardchan/web-toolkit'
utils.formatDate(new Date('{{ selectedDate }}'), '{{ dateFormat }}')</code></pre>
          </div>
        </el-space>
      </div>
    </el-card>

    <!-- getRelativeTime -->
    <el-card class="demo-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span class="card-title">getRelativeTime - 相对时间</span>
        </div>
      </template>
      
      <div class="demo-item">
        <el-space direction="vertical" :size="15" style="width: 100%">
          <div class="input-group">
            <label>时间偏移：</label>
            <el-radio-group v-model="relativeOffset">
              <el-radio-button :label="30 * 1000">30秒前</el-radio-button>
              <el-radio-button :label="5 * 60 * 1000">5分钟前</el-radio-button>
              <el-radio-button :label="2 * 60 * 60 * 1000">2小时前</el-radio-button>
              <el-radio-button :label="3 * 24 * 60 * 60 * 1000">3天前</el-radio-button>
            </el-radio-group>
          </div>
          
          <div class="result-box">
            <strong>结果：</strong>
            <code>{{ relativeTime }}</code>
          </div>
          
          <div class="code-box">
            <strong>代码：</strong>
            <pre><code>import { utils } from '@edwardchan/web-toolkit'
utils.getRelativeTime(new Date(Date.now() - {{ relativeOffset }}))</code></pre>
          </div>
        </el-space>
      </div>
    </el-card>

    <!-- isToday / isThisWeek -->
    <el-card class="demo-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span class="card-title">日期判断函数</span>
        </div>
      </template>
      
      <div class="demo-item">
        <el-space direction="vertical" :size="15" style="width: 100%">
          <div class="input-group">
            <label>测试日期：</label>
            <el-date-picker
              v-model="testDate"
              type="date"
              placeholder="选择日期"
            />
          </div>
          
          <div class="result-box">
            <el-descriptions :column="2" border>
              <el-descriptions-item label="isToday()">
                <el-tag :type="isTodayResult ? 'success' : 'info'">
                  {{ isTodayResult ? '✓ 是今天' : '✗ 不是今天' }}
                </el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="isThisWeek()">
                <el-tag :type="isThisWeekResult ? 'success' : 'info'">
                  {{ isThisWeekResult ? '✓ 是本周' : '✗ 不是本周' }}
                </el-tag>
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </el-space>
      </div>
    </el-card>

    <!-- getDateRange -->
    <el-card class="demo-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span class="card-title">getDateRange - 日期范围</span>
        </div>
      </template>
      
      <div class="demo-item">
        <el-space direction="vertical" :size="15" style="width: 100%">
          <div class="input-group">
            <label>范围类型：</label>
            <el-radio-group v-model="rangeType">
              <el-radio-button label="today">今天</el-radio-button>
              <el-radio-button label="yesterday">昨天</el-radio-button>
              <el-radio-button label="week">本周</el-radio-button>
              <el-radio-button label="month">本月</el-radio-button>
              <el-radio-button label="year">今年</el-radio-button>
            </el-radio-group>
          </div>
          
          <div class="result-box">
            <el-descriptions :column="1" border>
              <el-descriptions-item label="开始时间">
                <code>{{ dateRangeStart }}</code>
              </el-descriptions-item>
              <el-descriptions-item label="结束时间">
                <code>{{ dateRangeEnd }}</code>
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </el-space>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { utils } from '@edwardchan/web-toolkit'

// formatDate 演示
const selectedDate = ref(new Date())
const dateFormat = ref('YYYY-MM-DD HH:mm:ss')
const formattedDate = computed(() => {
  return utils.formatDate(selectedDate.value, dateFormat.value)
})

// getRelativeTime 演示
const relativeOffset = ref(5 * 60 * 1000)
const relativeTime = computed(() => {
  return utils.getRelativeTime(new Date(Date.now() - relativeOffset.value))
})

// isToday / isThisWeek 演示
const testDate = ref(new Date())
const isTodayResult = computed(() => utils.isToday(testDate.value))
const isThisWeekResult = computed(() => utils.isThisWeek(testDate.value))

// getDateRange 演示
const rangeType = ref('today')
const dateRange = computed(() => utils.getDateRange(rangeType.value))
const dateRangeStart = computed(() => utils.formatDate(dateRange.value[0], 'YYYY-MM-DD HH:mm:ss'))
const dateRangeEnd = computed(() => utils.formatDate(dateRange.value[1], 'YYYY-MM-DD HH:mm:ss'))
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

.demo-item {
  padding: 10px 0;
}

.input-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.input-group label {
  min-width: 120px;
  font-weight: 500;
  color: #606266;
}

.result-box {
  padding: 16px;
  background: #f4f4f5;
  border-radius: 4px;
  border-left: 4px solid #409eff;
}

.result-box code {
  font-size: 16px;
  color: #409eff;
  font-weight: 600;
}

.code-box {
  padding: 16px;
  background: #282c34;
  border-radius: 4px;
  color: #abb2bf;
}

.code-box pre {
  margin: 8px 0 0 0;
}

.code-box code {
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 13px;
  line-height: 1.6;
}
</style>
