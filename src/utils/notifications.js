/**
 * 通知工具函数
 * 使用 Web Notifications API 和音频提醒
 */

/**
 * 播放音频提醒
 */
export const playAudioAlert = () => {
  try {
    // 使用 Web Audio API 创建简单的提示音
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // 设置频率为 800Hz，正弦波
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';

    // 设置音量为 0.3
    gainNode.gain.value = 0.3;

    // 播放 200ms
    oscillator.start();
    setTimeout(() => {
      oscillator.stop();
      audioContext.close();
    }, 200);
  } catch (error) {
    console.error('Error playing audio alert:', error);
  }
};

/**
 * 发送浏览器通知
 * @param {string} title - 通知标题
 * @param {string} body - 通知内容
 * @param {Function} onClick - 点击通知时的回调函数
 */
export const sendNotification = (title, body, onClick = null) => {
  // 检查是否支持 Web Notifications API
  if (!('Notification' in window)) {
    console.log('This browser does not support desktop notification');
    return;
  }

  // 播放音频提醒
  playAudioAlert();

  // 请求权限并发送通知
  if (Notification.permission === 'granted') {
    createNotification(title, body, onClick);
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        createNotification(title, body, onClick);
      }
    });
  }
};

/**
 * 创建通知
 * @param {string} title - 通知标题
 * @param {string} body - 通知内容
 * @param {Function} onClick - 点击通知时的回调函数
 */
const createNotification = (title, body, onClick) => {
  const notification = new Notification(title, {
    body,
    icon: '/vite.svg',
    badge: '/vite.svg',
    tag: 'pomoflow', // 相同 tag 的通知会互相替换
  });

  if (onClick) {
    notification.onclick = onClick;
  }
};

/**
 * 请求通知权限
 * @returns {Promise<string>} 权限状态
 */
export const requestNotificationPermission = async () => {
  if (!('Notification' in window)) {
    return 'not-supported';
  }

  if (Notification.permission === 'granted') {
    return 'granted';
  }

  if (Notification.permission === 'denied') {
    return 'denied';
  }

  const permission = await Notification.requestPermission();
  return permission;
};