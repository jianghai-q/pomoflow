@echo off
chcp 65001 >nul
title PomoFlow 启动器
color 0A

echo ========================================
echo           🍅 PomoFlow 启动器
echo ========================================
echo.

:: 检查 Node.js 是否安装
echo [1/4] 检查 Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ 未检测到 Node.js！
    echo.
    echo 请先安装 Node.js：
    echo 访问 https://nodejs.org/zh-cn/
    echo 下载 LTS 版本并安装（一路点击"下一步"即可）
    echo.
    pause
    exit
) else (
    echo ✅ Node.js 已安装
)

echo.
echo [2/4] 检查依赖是否安装...
if not exist "node_modules\" (
    echo 📦 首次运行，正在安装依赖...
    call npm install
) else (
    echo ✅ 依赖已安装
)

echo.
echo [3/4] 正在启动 PomoFlow...
echo.
echo 🌐 应用即将在浏览器中打开...
echo    如需停止，请关闭此窗口
echo.
call npm run dev

echo.
echo ========================================
echo    按任意键退出
pause >nul
