/**
 * localStorage 工具函数
 * 提供安全的 localStorage 操作，包含错误处理
 */

const TASKS_KEY = 'pomoflow_tasks';
const RECORDS_KEY = 'pomoflow_records';

/**
 * 安全地获取 localStorage 中的数据
 * @param {string} key - localStorage 的键
 * @param {any} defaultValue - 如果不存在或出错时返回的默认值
 * @returns {any} 解析后的数据或默认值
 */
export const getFromStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage (key: ${key}):`, error);
    return defaultValue;
  }
};

/**
 * 安全地设置 localStorage 中的数据
 * @param {string} key - localStorage 的键
 * @param {any} value - 要存储的值
 * @returns {boolean} 是否成功
 */
export const setToStorage = (key, value) => {
  try {
    const jsonString = JSON.stringify(value);
    localStorage.setItem(key, jsonString);
    return true;
  } catch (error) {
    if (error.name === 'QuotaExceededError') {
      console.error(`localStorage quota exceeded for key: ${key}`);
      // 这里可以实现自动清理最旧记录的逻辑
      // 暂时简单提示用户
      alert('存储空间已满，请清理部分数据或使用其他浏览器');
    } else {
      console.error(`Error writing to localStorage (key: ${key}):`, error);
    }
    return false;
  }
};

/**
 * 删除 localStorage 中的指定键
 * @param {string} key - localStorage 的键
 * @returns {boolean} 是否成功
 */
export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing from localStorage (key: ${key}):`, error);
    return false;
  }
};

/**
 * 获取任务列表
 * @returns {Array} 任务列表
 */
export const getTasks = () => {
  return getFromStorage(TASKS_KEY, []);
};

/**
 * 保存任务列表
 * @param {Array} tasks - 任务列表
 * @returns {boolean} 是否成功
 */
export const setTasks = (tasks) => {
  return setToStorage(TASKS_KEY, tasks);
};

/**
 * 获取番茄记录列表
 * @returns {Array} 番茄记录列表
 */
export const getRecords = () => {
  return getFromStorage(RECORDS_KEY, []);
};

/**
 * 保存番茄记录列表
 * @param {Array} records - 番茄记录列表
 * @returns {boolean} 是否成功
 */
export const setRecords = (records) => {
  return setToStorage(RECORDS_KEY, records);
};