@echo off
rem Windows 一键启动：双击本文件即可
cd /d "%~dp0"
set PORT=8931

rem AI 助手的本地 CORS 代理（有 Node 才启动，随本窗口关闭；不用 AI 助手可忽略）
where node >nul 2>nul
if %errorlevel%==0 start "" /b cmd /c "node tools\cors-proxy.mjs >nul 2>&1"

where python >nul 2>nul
if %errorlevel%==0 goto PYTHON
where py >nul 2>nul
if %errorlevel%==0 goto PYLAUNCHER
where node >nul 2>nul
if %errorlevel%==0 goto NODE

echo 错误：未找到 Python 或 Node.js
echo 请先安装其一：https://www.python.org 或 https://nodejs.org
pause
exit /b 1

:PYTHON
echo 启动：http://127.0.0.1:%PORT% （关闭本窗口即停止）
start "" cmd /c "timeout /t 1 >nul & start http://127.0.0.1:%PORT%/"
python -m http.server %PORT% --bind 127.0.0.1
goto END

:PYLAUNCHER
echo 启动：http://127.0.0.1:%PORT% （关闭本窗口即停止）
start "" cmd /c "timeout /t 1 >nul & start http://127.0.0.1:%PORT%/"
py -m http.server %PORT% --bind 127.0.0.1
goto END

:NODE
echo 启动：http://127.0.0.1:%PORT% （关闭本窗口即停止）
start "" cmd /c "timeout /t 1 >nul & start http://127.0.0.1:%PORT%/"
node tools\serve.js %PORT%
goto END

:END
