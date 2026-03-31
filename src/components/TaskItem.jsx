import React from 'react';

const TaskItem = ({ task, onDelete, onSelect, isSelected }) => {
  const priorityColors = {
    high: 'bg-red-100 border-red-300',
    medium: 'bg-yellow-100 border-yellow-300',
    low: 'bg-green-100 border-green-300',
  };

  const priorityLabels = {
    high: '高',
    medium: '中',
    low: '低',
  };

  const isCompleted = task.status === 'completed';

  return (
    <div
      className={`p-4 rounded-lg border-2 transition-all ${
        isSelected ? 'border-blue-500 shadow-md' : 'border-transparent'
      } ${isCompleted ? 'opacity-60' : ''}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`px-2 py-1 text-xs font-bold rounded ${priorityColors[task.priority]}`}
            >
              {priorityLabels[task.priority]}
            </span>
            {isCompleted && (
              <span className="px-2 py-1 text-xs font-bold rounded bg-gray-200 text-gray-700">
                已完成
              </span>
            )}
          </div>
          <h3
            className={`font-semibold text-gray-800 ${isCompleted ? 'line-through' : ''}`}
          >
            {task.title}
          </h3>
          <div className="mt-2 text-sm text-gray-600">
            <span className="mr-4">
              🍅 {task.completedPomodoros} / {task.estimatedPomodoros} 番茄
            </span>
          </div>
        </div>
        <div className="flex gap-2 ml-4">
          {!isCompleted && (
            <button
              onClick={() => onSelect(task.id)}
              className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm transition-colors"
              title="选择此任务开始番茄"
            >
              开始
            </button>
          )}
          <button
            onClick={() => onDelete(task.id)}
            className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm transition-colors"
            title="删除任务"
          >
            删除
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;