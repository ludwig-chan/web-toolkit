# ludwig-toolkit

我的个人提效工具包，包含常用组件和工具函数。

## 安装

```bash
npm install ludwig-toolkit
```

## 使用

### formatDate - 日期格式化

格式化日期时间为指定格式的字符串。

```javascript
const { formatDate } = require('ludwig-toolkit');

// 格式化当前时间
console.log(formatDate(new Date()));
// => '2026-02-07 10:30:45'

// 自定义格式
console.log(formatDate(new Date(), 'YYYY/MM/DD'));
// => '2026/02/07'

// 格式化时间戳
console.log(formatDate(1704614400000, 'YYYY-MM-DD'));
// => '2024-01-07'

// 格式化日期字符串
console.log(formatDate('2024-01-01', 'MM/DD/YYYY HH:mm'));
// => '01/01/2024 08:00'
```

### 支持的格式占位符

- `YYYY` - 四位年份
- `MM` - 两位月份（01-12）
- `DD` - 两位日期（01-31）
- `HH` - 24小时制小时（00-23）
- `mm` - 分钟（00-59）
- `ss` - 秒数（00-59）

## API

### formatDate(date, format)

- **date**: `Date | string | number` - 日期对象、时间戳或日期字符串
- **format**: `string` - 格式化模板，默认值：`'YYYY-MM-DD HH:mm:ss'`
- **返回值**: `string` - 格式化后的日期字符串

## License

MIT © ludwig-chan
