/**
 * 格式化日期时间
 * @param {Date|string|number} date - 日期对象、时间戳或日期字符串
 * @param {string} format - 格式化模板，支持以下占位符：
 *   YYYY - 四位年份
 *   MM - 两位月份
 *   DD - 两位日期
 *   HH - 24小时制小时
 *   mm - 分钟
 *   ss - 秒数
 * @returns {string} 格式化后的日期字符串
 * @example
 * formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')
 * // => '2026-02-10 10:30:45'
 */
export function formatDate(date, format = 'YYYY-MM-DD HH:mm:ss') {
  if (!date) return '-'
  
  try {
    const d = new Date(date)
    
    if (isNaN(d.getTime())) {
      return typeof date === 'string' ? date : '-'
    }

    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    const hours = String(d.getHours()).padStart(2, '0')
    const minutes = String(d.getMinutes()).padStart(2, '0')
    const seconds = String(d.getSeconds()).padStart(2, '0')

    return format
      .replace('YYYY', year)
      .replace('MM', month)
      .replace('DD', day)
      .replace('HH', hours)
      .replace('mm', minutes)
      .replace('ss', seconds)
  } catch (error) {
    return typeof date === 'string' ? date : '-'
  }
}

/**
 * 获取相对时间描述（如：刚刚、5分钟前、2小时前等）
 * @param {Date|string|number} date - 日期对象、时间戳或日期字符串
 * @returns {string} 相对时间描述
 * @example
 * getRelativeTime(new Date(Date.now() - 60000))
 * // => '1分钟前'
 */
export function getRelativeTime(date) {
  const d = new Date(date)
  if (isNaN(d.getTime())) return '-'

  const now = Date.now()
  const diff = now - d.getTime()
  
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const months = Math.floor(days / 30)
  const years = Math.floor(days / 365)

  if (seconds < 60) return '刚刚'
  if (minutes < 60) return `${minutes}分钟前`
  if (hours < 24) return `${hours}小时前`
  if (days < 30) return `${days}天前`
  if (months < 12) return `${months}个月前`
  return `${years}年前`
}

/**
 * 判断是否为今天
 * @param {Date|string|number} date - 日期对象、时间戳或日期字符串
 * @returns {boolean} 是否为今天
 */
export function isToday(date) {
  const d = new Date(date)
  if (isNaN(d.getTime())) return false

  const today = new Date()
  return d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear()
}

/**
 * 判断是否为本周
 * @param {Date|string|number} date - 日期对象、时间戳或日期字符串
 * @returns {boolean} 是否为本周
 */
export function isThisWeek(date) {
  const d = new Date(date)
  if (isNaN(d.getTime())) return false

  const today = new Date()
  const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay()))
  const lastDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 6))
  
  return d >= firstDayOfWeek && d <= lastDayOfWeek
}

/**
 * 获取日期范围
 * @param {string} type - 范围类型：today, yesterday, week, month, year
 * @returns {Array} [startDate, endDate]
 */
export function getDateRange(type) {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  
  switch (type) {
    case 'today':
      return [
        new Date(today),
        new Date(today.getTime() + 24 * 60 * 60 * 1000 - 1)
      ]
    case 'yesterday':
      return [
        new Date(today.getTime() - 24 * 60 * 60 * 1000),
        new Date(today.getTime() - 1)
      ]
    case 'week':
      const firstDay = new Date(today)
      firstDay.setDate(today.getDate() - today.getDay())
      return [
        firstDay,
        new Date(today.getTime() + 24 * 60 * 60 * 1000 - 1)
      ]
    case 'month':
      return [
        new Date(today.getFullYear(), today.getMonth(), 1),
        new Date(today.getTime() + 24 * 60 * 60 * 1000 - 1)
      ]
    case 'year':
      return [
        new Date(today.getFullYear(), 0, 1),
        new Date(today.getTime() + 24 * 60 * 60 * 1000 - 1)
      ]
    default:
      return [today, new Date(today.getTime() + 24 * 60 * 60 * 1000 - 1)]
  }
}
