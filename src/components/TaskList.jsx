import TaskItem from './TaskItem';

const TaskList = ({ tasks, activeTasks, completedTasks, onDeleteTask, onSelectTask, selectedTaskId }) => {
  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-lg p-8 shadow-lg text-center">
        <div className="text-6xl mb-4">📝</div>
        <p className="text-gray-600">暂无任务，开始添加第一个任务吧！</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {activeTasks.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            进行中 ({activeTasks.length})
          </h2>
          <div className="space-y-3">
            {activeTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onDelete={onDeleteTask}
                onSelect={onSelectTask}
                isSelected={selectedTaskId === task.id}
              />
            ))}
          </div>
        </div>
      )}

      {completedTasks.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            已完成 ({completedTasks.length})
          </h2>
          <div className="space-y-3">
            {completedTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onDelete={onDeleteTask}
                onSelect={() => {}} // 已完成任务不能选择
                isSelected={false}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;