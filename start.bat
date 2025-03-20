@echo off
echo 正在启动计时器应用...
echo 请稍候...

:: 检查是否安装了依赖
if not exist "node_modules" (
    echo 首次运行，正在安装依赖...
    npm install
)

:: 启动服务器
start http://localhost:3000
node server.js 