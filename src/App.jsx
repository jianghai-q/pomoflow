import { useState, useEffect } from 'react';
import { useTasks } from './hooks/useTasks';
import { useRecords } from './hooks/useRecords';
import { sendNotification, requestNotificationPermission } from './utils/notifications';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Timer from './components/Timer';
import Statistics from './components/Statistics';

function App() {
  const {
    tasks,
    activeTasks,
    completedTasks,
    isLoading,
    addTask,
    deleteTask,
    incrementPomodoros,
  } = useTasks();

  const {
    records,
    getRecentStats,
    getTotalPomodoros,
    getTotalDuration,
    addRecord,
  } = useRecords();

  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [showStats, setShowStats] = useState(false);

  // 获取选中的任务
  const selectedTask = activeTasks.find((task) => task.id === selectedTaskId);

  // 获取统计数据
  const recentStats = getRecentStats(7);
  const totalPomodoros = getTotalPomodoros();
  const totalDuration = getTotalDuration();

  // 请求通知权限
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  // 处理番茄完成
  const handlePomodoroComplete = () => {
    sendNotification('🍅 番茄完成！', '休息一下吧，喝杯水~');

    // 如果有选中的任务，增加其完成的番茄数
    if (selectedTask) {
      incrementPomodoros(selectedTaskId);
      addRecord(selectedTaskId);
    } else {
      // 没有选中任务时也记录
      addRecord(null);
    }

    // 清除选中的任务
    setSelectedTaskId(null);
  };

  // 处理任务选择
  const handleSelectTask = (taskId) => {
    setSelectedTaskId(taskId);
  };

  // 处理添加任务
  const handleAddTask = (taskData) => {
    addTask(taskData);
  };

  // 处理删除任务
  const handleDeleteTask = (taskId) => {
    if (window.confirm('确定要删除这个任务吗？')) {
      deleteTask(taskId);
      if (selectedTaskId === taskId) {
        setSelectedTaskId(null);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-800 text-xl">加载中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">🍅 PomoFlow</h1>
          <p className="text-gray-600 text-lg">番茄工作法效率工具</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 左侧：任务管理 */}
          <div className="space-y-6">
            <TaskForm onAddTask={handleAddTask} />
            <TaskList
              tasks={tasks}
              activeTasks={activeTasks}
              completedTasks={completedTasks}
              onDeleteTask={handleDeleteTask}
              onSelectTask={handleSelectTask}
              selectedTaskId={selectedTaskId}
            />
          </div>

          {/* 右侧：计时器和统计 */}
          <div className="space-y-6">
            <Timer selectedTask={selectedTask} onComplete={handlePomodoroComplete} />
            {showStats ? (
              <Statistics
                totalPomodoros={totalPomodoros}
                totalDuration={totalDuration}
                recentStats={recentStats}
              />
            ) : (
              <button
                onClick={() => setShowStats(true)}
                className="w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-colors"
              >
                📊 查看统计
              </button>
            )}
          </div>
        </div>

        <footer className="text-center mt-8 text-gray-500 text-sm">
          <p>使用番茄工作法提升效率 · 专注当下，成就未来</p>
        </footer>
      </div>
    </div>
  );
}

export default App;