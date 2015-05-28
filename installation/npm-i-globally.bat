@echo off

cmd /c "%1 -v"
if errorlevel 1 (
    echo %1 wasn't found globally. Trying to install.
    cmd /c "echo NPM version is: && npm -v"
    if errorlevel 1 (
        echo NPM is not found. Check your PATH env variable.
        exit /b %errorlevel%
    )
    cmd /c "npm i %1 -g"
)
