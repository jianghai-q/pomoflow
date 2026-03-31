import React, { useState } from 'react';

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');
  const [estimatedPomodoros, setEstimatedPomodoros] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('请输入任务标题');
      return;
    }

    onAddTask({
      title,
      priority,
      estimatedPomodoros,
    });

    // 重置表单
    setTitle('');
    setPriority('medium');
    setEstimatedPomodoros(1);
  };

  const priorityOptions = [
    { value: 'high', label: '高优先级', color: 'bg-red-500' },
    { value: 'medium', label: '中优先级', color: 'bg-yellow-500' },
    { value: 'low', label: '低优先级', color: 'bg-green-500' },
  ];

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 shadow-lg mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">添加新任务</h2>

      <div className="mb-4">
        <label htmlFor="taskTitle" className="block text-sm font-medium text-gray-700 mb-2">
          任务标题
        </label>
        <input
          id="taskTitle"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="输入任务名称..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          maxLength={100}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">优先级</label>
        <div className="flex gap-2">
          {priorityOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setPriority(option.value)}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                priority === option.value
                  ? `${option.color} text-white`
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="pomodoros" className="block text-sm font-medium text-gray-700 mb-2">
          预计番茄数
        </label>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setEstimatedPomodoros(Math.max(1, estimatedPomodoros - 1))}
            className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 text-xl font-bold"
            disabled={estimatedPomodoros <= 1}
          >
            -
          </button>
          <input
            id="pomodoros"
            type="number"
            value={estimatedPomodoros}
            onChange={(e) => {
              const value = Math.min(10, Math.max(1, parseInt(e.target.value) || 1));
              setEstimatedPomodoros(value);
            }}
            className="w-20 text-center text-xl font-bold px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="1"
            max="10"
          />
          <button
            type="button"
            onClick={() => setEstimatedPomodoros(Math.min(10, estimatedPomodoros + 1))}
            className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 text-xl font-bold"
            disabled={estimatedPomodoros >= 10}
          >
            +
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
      >
        添加任务
      </button>
    </form>
  );
};

export default TaskForm;