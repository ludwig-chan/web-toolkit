# 开发调试指南

## 启动开发服务器

```bash
npm run dev
```

这将启动一个本地开发服务器，默认运行在 `http://localhost:3000`

## 功能模块

### 1. 📅 日期工具演示
- 实时测试 `formatDate` 日期格式化
- 测试 `getRelativeTime` 相对时间
- 测试 `isToday`、`isThisWeek` 判断函数
- 测试 `getDateRange` 日期范围

### 2. 📊 TableColumn 组件演示
- 基础用法示例
- 日期格式化功能
- 状态标签功能
- 自定义格式化
- 自定义插槽扩展

### 3. 📖 API 文档
- 完整的 API 参考文档
- 使用示例和代码演示
- 快速导航

## 项目结构

```
web-toolkit/
├── dev/                    # 开发调试目录
│   ├── main.js            # 应用入口
│   ├── App.vue            # 主应用组件
│   └── demos/             # 演示组件
│       ├── DateUtilsDemo.vue      # 日期工具演示
│       ├── TableColumnDemo.vue    # 表格组件演示
│       └── ApiDocs.vue            # API 文档
├── src/                   # 源代码
│   ├── utils/            # 工具函数
│   ├── components/       # Vue 组件
│   └── index.js          # 入口文件
├── index.html            # HTML 入口
├── vite.config.js        # Vite 配置
└── package.json
```

## 可用命令

```bash
# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 开发提示

1. **实时预览**：修改代码后会自动热更新
2. **调试工具**：打开浏览器开发者工具查看 console
3. **组件测试**：在演示页面中直接测试所有功能
4. **样式调试**：支持实时修改样式并查看效果

## 注意事项

- 确保 Node.js 版本 >= 16
- 如果端口 3000 被占用，Vite 会自动使用下一个可用端口
- 开发服务器仅用于本地调试，不要用于生产环境

## 技术栈

- **构建工具**：Vite 4
- **框架**：Vue 3
- **UI 库**：Element Plus
- **开发语言**：JavaScript

## 反馈问题

如果遇到问题，请访问：https://github.com/ludwig-chan/web-toolkit/issues
