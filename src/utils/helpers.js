/**
 * 辅助工具函数
 */

/**
 * 生成 UUID v4
 * @returns {string} UUID
 */
export const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

/**
 * 格式化日期为 ISO 字符串（仅日期部分）
 * @param {Date} date - 日期对象
 * @returns {string} ISO 格式的日期字符串（YYYY-MM-DD）
 */
export const formatDate = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * 格式化日期时间为 ISO 字符串
 * @param {Date} date - 日期对象
 * @returns {string} ISO 格式的日期时间字符串
 */
export const formatDateTime = (date = new Date()) => {
  return date.toISOString();
};

/**
 * 格式化时间显示（秒 → MM:SS）
 * @param {number} seconds - 秒数
 * @returns {string} 格式化的时间字符串
 */
export const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
};

/**
 * 获取最近N天的日期数组
 * @param {number} days - 天数
 * @returns {Array<string>} 日期数组（从旧到新）
 */
export const getLastNDays = (days = 7) => {
  const dates = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(formatDate(date));
  }
  return dates;
};