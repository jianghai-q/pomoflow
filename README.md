# 🍅 PomoFlow

> 结合任务管理与番茄工作法的效率工具

[![React](https://img.shields.io/badge/React-18.3-blue)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-purple)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0-38bdf8)](https://tailwindcss.com/)

## ✨ 功能特性

### MVP 核心功能
- ✅ **任务管理**：添加、删除、查看任务列表
- ✅ **优先级设置**：高、中、低三种优先级
- ✅ **番茄计时器**：25分钟工作、5分钟短休息、15分钟长休息
- ✅ **任务联动**：为任务启动番茄，自动统计完成数量
- ✅ **智能完成**：达到预计番茄数自动标记任务完成
- ✅ **数据统计**：展示最近7天的番茄完成趋势
- ✅ **浏览器通知**：计时结束弹出通知
- ✅ **音频提醒**：计时结束播放提示音

### 即将推出
- 暗色主题切换
- 任务编辑功能
- 自定义番茄时长
- 任务分类/标签
- 数据云端同步

## 🚀 快速开始

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 预览生产构建
```bash
npm run preview
```

## 📖 使用指南

### 1. 添加任务
- 输入任务标题
- 选择优先级（高/中/低）
- 设置预计番茄数
- 点击"添加任务"

### 2. 开始番茄
- 点击任务列表中的"开始"按钮选择任务
- 点击计时器上的"开始"按钮启动倒计时
- 计时结束后，任务的已完成番茄数自动 +1

### 3. 查看统计
- 点击"查看统计"按钮查看详细数据
- 折线图展示最近7天的番茄完成趋势
- 统计总番茄数和总专注时长

## 🛠 技术栈

- **前端框架**：React 18.3
- **构建工具**：Vite 5.x
- **样式框架**：TailwindCSS 3.x
- **图表库**：Recharts 2.x
- **状态管理**：React Hooks
- **数据持久化**：localStorage

## 📁 项目结构

```
pomoflow/
├── src/
│   ├── components/       # React 组件
│   │   ├── TaskForm.jsx
│   │   ├── TaskItem.jsx
│   │   ├── TaskList.jsx
│   │   ├── Timer.jsx
│   │   └── Statistics.jsx
│   ├── hooks/           # 自定义 Hooks
│   │   ├── useTasks.js
│   │   └── useRecords.js
│   ├── utils/           # 工具函数
│   │   ├── storage.js
│   │   ├── notifications.js
│   │   └── helpers.js
│   ├── App.jsx          # 主应用组件
│   ├── main.jsx         # 入口文件
│   └── index.css        # 全局样式
├── public/              # 静态资源
└── package.json         # 项目配置
```

## 📝 开发规范

### 数据结构

#### 任务 (Task)
```javascript
{
  id: string,                    // UUID
  title: string,                 // 任务标题
  priority: 'high' | 'medium' | 'low',
  estimatedPomodoros: number,    // 预计番茄数
  completedPomodoros: number,    // 已完成番茄数
  status: 'active' | 'completed',
  createdAt: string,             // ISO datetime
  updatedAt: string              // ISO datetime
}
```

#### 番茄记录 (PomodoroRecord)
```javascript
{
  id: string,                    // UUID
  taskId: string | null,         // 关联任务ID
  duration: number,              // 时长（分钟）
  date: string,                  // ISO date
  createdAt: string              // ISO datetime
}
```

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 👤 作者

[jianghai-q](https://github.com/jianghai-q)

---

**PomoFlow** - 专注当下，成就未来 🍅
