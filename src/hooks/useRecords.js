import { useState, useEffect, useCallback } from 'react';
import { getRecords, setRecords } from '../utils/storage';
import { generateUUID, formatDateTime, formatDate } from '../utils/helpers';

/**
 * 番茄记录管理 Hook
 */
export const useRecords = () => {
  const [records, setRecordsState] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 从 localStorage 加载记录
  useEffect(() => {
    const loadedRecords = getRecords();
    setRecordsState(loadedRecords);
    setIsLoading(false);
  }, []);

  // 保存记录到 localStorage
  const saveRecords = useCallback((newRecords) => {
    const success = setRecords(newRecords);
    if (success) {
      setRecordsState(newRecords);
    }
  }, []);

  // 添加番茄记录
  const addRecord = useCallback((taskId = null, duration = 25) => {
    const newRecord = {
      id: generateUUID(),
      taskId,
      duration,
      date: formatDate(),
      createdAt: formatDateTime(),
    };

    saveRecords([...records, newRecord]);
    return newRecord;
  }, [records, saveRecords]);

  // 删除记录
  const deleteRecord = useCallback((recordId) => {
    const newRecords = records.filter((record) => record.id !== recordId);
    saveRecords(newRecords);
  }, [records, saveRecords]);

  // 获取指定日期的记录
  const getRecordsByDate = useCallback((date) => {
    return records.filter((record) => record.date === date);
  }, [records]);

  // 获取最近N天的统计数据
  const getRecentStats = useCallback((days = 7) => {
    const stats = [];
    const today = new Date();

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateString = formatDate(date);

      const dayRecords = records.filter((record) => record.date === dateString);
      stats.push({
        date: dateString,
        count: dayRecords.length,
        totalDuration: dayRecords.reduce((sum, record) => sum + record.duration, 0),
      });
    }

    return stats;
  }, [records]);

  // 获取总番茄数
  const getTotalPomodoros = useCallback(() => {
    return records.length;
  }, [records]);

  // 获取总专注时长（分钟）
  const getTotalDuration = useCallback(() => {
    return records.reduce((sum, record) => sum + record.duration, 0);
  }, [records]);

  return {
    records,
    isLoading,
    addRecord,
    deleteRecord,
    getRecordsByDate,
    getRecentStats,
    getTotalPomodoros,
    getTotalDuration,
  };
};