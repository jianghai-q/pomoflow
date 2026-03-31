import { useState, useEffect, useCallback } from 'react';
import { getTasks, setTasks } from '../utils/storage';
import { generateUUID, formatDateTime } from '../utils/helpers';

/**
 * 任务管理 Hook
 */
export const useTasks = () => {
  const [tasks, setTasksState] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 从 localStorage 加载任务
  useEffect(() => {
    const loadedTasks = getTasks();
    setTasksState(loadedTasks);
    setIsLoading(false);
  }, []);

  // 保存任务到 localStorage
  const saveTasks = useCallback((newTasks) => {
    const success = setTasks(newTasks);
    if (success) {
      setTasksState(newTasks);
    }
  }, []);

  // 添加任务
  const addTask = useCallback((taskData) => {
    const newTask = {
      id: generateUUID(),
      title: taskData.title.trim(),
      priority: taskData.priority || 'medium',
      estimatedPomodoros: taskData.estimatedPomodoros || 1,
      completedPomodoros: 0,
      status: 'active',
      createdAt: formatDateTime(),
      updatedAt: formatDateTime(),
    };

    saveTasks([...tasks, newTask]);
    return newTask;
  }, [tasks, saveTasks]);

  // 删除任务
  const deleteTask = useCallback((taskId) => {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    saveTasks(newTasks);
  }, [tasks, saveTasks]);

  // 更新任务
  const updateTask = useCallback((taskId, updates) => {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          ...updates,
          updatedAt: formatDateTime(),
        };
      }
      return task;
    });
    saveTasks(newTasks);
  }, [tasks, saveTasks]);

  // 标记任务为完成
  const completeTask = useCallback((taskId) => {
    updateTask(taskId, { status: 'completed' });
  }, [updateTask]);

  // 激活任务（取消完成状态）
  const activateTask = useCallback((taskId) => {
    updateTask(taskId, { status: 'active' });
  }, [updateTask]);

  // 增加任务完成的番茄数
  const incrementPomodoros = useCallback((taskId) => {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        const newCompletedPomodoros = task.completedPomodoros + 1;
        const newStatus = newCompletedPomodoros >= task.estimatedPomodoros
          ? 'completed'
          : 'active';
        return {
          ...task,
          completedPomodoros: newCompletedPomodoros,
          status: newStatus,
          updatedAt: formatDateTime(),
        };
      }
      return task;
    });
    saveTasks(newTasks);
  }, [tasks, saveTasks]);

  // 获取活动任务列表
  const activeTasks = tasks.filter((task) => task.status === 'active');

  // 获取已完成任务列表
  const completedTasks = tasks.filter((task) => task.status === 'completed');

  // 按优先级排序任务
  const sortedTasks = [...tasks].sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return {
    tasks: sortedTasks,
    activeTasks,
    completedTasks,
    isLoading,
    addTask,
    deleteTask,
    updateTask,
    completeTask,
    activateTask,
    incrementPomodoros,
  };
};