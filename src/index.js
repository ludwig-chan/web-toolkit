// 导入工具函数
import * as dateUtils from './utils/date.js';

// 导入 Vue 组件
import TableColumn from './components/TableColumn.vue';

// 工具函数命名空间
export const utils = {
  // 日期时间工具
  ...dateUtils
};

// 组件命名空间
export const components = {
  TableColumn
};

// 按需导出（向后兼容）
export { 
  formatDate, 
  getRelativeTime, 
  isToday, 
  isThisWeek, 
  getDateRange 
} from './utils/date.js';

export { TableColumn };

// CommonJS 兼容（仅在 Node.js 环境中）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { 
    utils,
    components,
    // 向后兼容的平级导出
    ...dateUtils,
    TableColumn 
  };
}
