@echo off
title Circuit Builder Server
cd /d "C:\Users\mylap\OneDrive\Desktop\eng_store_check"
:loop
echo Starting server on http://localhost:8766 ...
python -m http.server 8766 --bind 0.0.0.0
echo Server stopped. Restarting in 2 seconds...
timeout /t 2 /nobreak >nul
goto loop