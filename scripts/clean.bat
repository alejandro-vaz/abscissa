@echo off
setlocal enabledelayedexpansion

echo Deleting all .js and .css files (excluding node_modules)...

for /f "delims=" %%i in ('dir /b /s *.js *.css ^| findstr /vi "\\node_modules\\"') do (
    echo Deleting: %%i
    del /f /q "%%i"
)

echo Deleting SQL database...
del "public\\templates\\database.sql"

echo Deleting node_modules folder...
if exist node_modules (
    rmdir /s /q node_modules
)

echo Running npm install...
npm install

echo Done.
pause
