import React, { useState, useEffect, useCallback } from 'react';
import { formatTime } from '../utils/helpers';

const POMODORO_TIME = 25 * 60; // 25分钟
const SHORT_BREAK_TIME = 5 * 60; // 5分钟
const LONG_BREAK_TIME = 15 * 60; // 15分钟

const Timer = ({ selectedTask, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(POMODORO_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState('pomodoro'); // pomodoro, shortBreak, longBreak

  useEffect(() => {
    // 切换模式时重置时间
    if (mode === 'pomodoro') {
      setTimeLeft(POMODORO_TIME);
    } else if (mode === 'shortBreak') {
      setTimeLeft(SHORT_BREAK_TIME);
    } else {
      setTimeLeft(LONG_BREAK_TIME);
    }
    setIsRunning(false);
  }, [mode]);

  useEffect(() => {
    let interval = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft]);

  useEffect(() => {
    // 计时结束时
    if (timeLeft === 0 && !isRunning) {
      handleTimerComplete();
    }
  }, [timeLeft, isRunning]);

  const handleTimerComplete = useCallback(() => {
    // 调用完成回调
    if (mode === 'pomodoro' && onComplete) {
      onComplete();
    }

    // 自动切换模式
    if (mode === 'pomodoro') {
      // 番茄完成后，切换到休息
      setMode('shortBreak');
    } else {
      // 休息完成后，切换回番茄
      setMode('pomodoro');
    }
  }, [mode, onComplete]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    if (mode === 'pomodoro') {
      setTimeLeft(POMODORO_TIME);
    } else if (mode === 'shortBreak') {
      setTimeLeft(SHORT_BREAK_TIME);
    } else {
      setTimeLeft(LONG_BREAK_TIME);
    }
  };

  const setModeHandler = (newMode) => {
    setMode(newMode);
  };

  const modeLabels = {
    pomodoro: '🍅 番茄钟',
    shortBreak: '☕ 短休息',
    longBreak: '🌴 长休息',
  };

  const modeColors = {
    pomodoro: 'bg-gradient-to-br from-red-500 to-red-600',
    shortBreak: 'bg-gradient-to-br from-green-500 to-green-600',
    longBreak: 'bg-gradient-to-br from-blue-500 to-blue-600',
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-xl">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{modeLabels[mode]}</h2>
        {selectedTask && mode === 'pomodoro' && (
          <p className="text-gray-600 text-sm">当前任务：{selectedTask.title}</p>
        )}
      </div>

      <div className={`${modeColors[mode]} rounded-2xl p-8 mb-6`}>
        <div className="text-7xl font-bold text-white text-center font-mono">
          {formatTime(timeLeft)}
        </div>
      </div>

      <div className="flex gap-3 justify-center mb-6">
        {!isRunning ? (
          <button
            onClick={startTimer}
            className="flex-1 py-3 px-6 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition-colors"
          >
            开始
          </button>
        ) : (
          <button
            onClick={pauseTimer}
            className="flex-1 py-3 px-6 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-lg transition-colors"
          >
            暂停
          </button>
        )}
        <button
          onClick={resetTimer}
          className="flex-1 py-3 px-6 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-lg transition-colors"
        >
          重置
        </button>
      </div>

      <div className="flex gap-2 justify-center">
        <button
          onClick={() => setModeHandler('pomodoro')}
          className={`py-2 px-4 rounded-lg font-medium transition-colors ${
            mode === 'pomodoro'
              ? 'bg-red-100 text-red-700'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          番茄钟
        </button>
        <button
          onClick={() => setModeHandler('shortBreak')}
          className={`py-2 px-4 rounded-lg font-medium transition-colors ${
            mode === 'shortBreak'
              ? 'bg-green-100 text-green-700'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          短休息
        </button>
        <button
          onClick={() => setModeHandler('longBreak')}
          className={`py-2 px-4 rounded-lg font-medium transition-colors ${
            mode === 'longBreak'
              ? 'bg-blue-100 text-blue-700'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          长休息
        </button>
      </div>
    </div>
  );
};

export default Timer;