@echo off
title English Launcher
setlocal EnableDelayedExpansion

set "APP=%~dp0index.html"

if not exist "%APP%" (
    echo Nie znaleziono index.html obok tego pliku.
    pause
    exit /b 1
)

set "URL=file:///%APP:\=/%"
set "BROWSER="

if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe"        set "BROWSER=%ProgramFiles%\Google\Chrome\Application\chrome.exe"
if not defined BROWSER if exist "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"   set "BROWSER=%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"
if not defined BROWSER if exist "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe"  set "BROWSER=%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe"
if not defined BROWSER if exist "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe"       set "BROWSER=%ProgramFiles%\Microsoft\Edge\Application\msedge.exe"

echo.
echo   English Launcher - Liquid Glass
echo   --------------------------------------------
echo   Plik: %APP%
echo.

if defined BROWSER (
    echo   Tryb aplikacji: !BROWSER!
    start "" "!BROWSER!" --app="!URL!" --window-size=1300,880
) else (
    echo   Brak Chrome/Edge - otwieram w domyslnej przegladarce.
    start "" "!URL!"
)

endlocal