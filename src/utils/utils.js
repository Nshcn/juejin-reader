/**
 * 格式化秒
 * @param result
 * @returns {string}
 */
export function formatSecond(result) {
  const h = Math.floor((result / 3600) % 24)
  const m = Math.floor((result / 60) % 60)
  const s = Math.floor(result % 60)
  result = s + '秒'
  if (m > 0) {
    result = m + '分钟' + result
  }
  if (h > 0) {
    result = h + '小时' + result
  }

  return result
}
