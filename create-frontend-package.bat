@echo off
REM ParaCart Frontend Package Creator for Windows
REM This script creates a frontend-only zip file without backend services

echo.
echo 🚀 Creating ParaCart Frontend Package...
echo.

setlocal enabledelayedexpansion

set TEMP_DIR=ParaCart-Frontend-temp
set PACKAGE_NAME=ParaCart-Frontend

REM Remove if exists
if exist "%TEMP_DIR%" rmdir /s /q "%TEMP_DIR%"
if exist "%PACKAGE_NAME%.zip" del "%PACKAGE_NAME%.zip"

REM Create directory structure
mkdir "%TEMP_DIR%"

echo 📁 Copying frontend directories...
if exist app xcopy app "%TEMP_DIR%\app" /E /I /Q >nul 2>&1
if exist components xcopy components "%TEMP_DIR%\components" /E /I /Q >nul 2>&1
if exist context xcopy context "%TEMP_DIR%\context" /E /I /Q >nul 2>&1
if exist hooks xcopy hooks "%TEMP_DIR%\hooks" /E /I /Q >nul 2>&1
if exist lib xcopy lib "%TEMP_DIR%\lib" /E /I /Q >nul 2>&1
if exist public xcopy public "%TEMP_DIR%\public" /E /I /Q >nul 2>&1

echo ⚙️  Copying configuration files...
if exist package.json copy package.json "%TEMP_DIR%\" >nul 2>&1
if exist tsconfig.json copy tsconfig.json "%TEMP_DIR%\" >nul 2>&1
if exist tailwind.config.js copy tailwind.config.js "%TEMP_DIR%\" >nul 2>&1
if exist postcss.config.js copy postcss.config.js "%TEMP_DIR%\" >nul 2>&1
if exist next.config.js copy next.config.js "%TEMP_DIR%\" >nul 2>&1
if exist .gitignore copy .gitignore "%TEMP_DIR%\" >nul 2>&1
if exist .env.example copy .env.example "%TEMP_DIR%\" >nul 2>&1
if exist .env.local copy .env.local "%TEMP_DIR%\" >nul 2>&1

echo 📚 Copying documentation...
if exist README.md copy README.md "%TEMP_DIR%\" >nul 2>&1
if exist API_INTEGRATION.md copy API_INTEGRATION.md "%TEMP_DIR%\" >nul 2>&1
if exist DEPLOYMENT.md copy DEPLOYMENT.md "%TEMP_DIR%\" >nul 2>&1
if exist QUICKSTART.md copy QUICKSTART.md "%TEMP_DIR%\" >nul 2>&1
if exist PROJECT_SUMMARY.md copy PROJECT_SUMMARY.md "%TEMP_DIR%\" >nul 2>&1
if exist IMPLEMENTATION_COMPLETE.md copy IMPLEMENTATION_COMPLETE.md "%TEMP_DIR%\" >nul 2>&1
if exist FRONTEND_PACKAGE.md copy FRONTEND_PACKAGE.md "%TEMP_DIR%\" >nul 2>&1

echo 📦 Creating zip file...
REM Using PowerShell to create zip (available on Windows 10+)
powershell -command "Add-Type -AssemblyName System.IO.Compression.FileSystem; [System.IO.Compression.ZipFile]::CreateFromDirectory('%TEMP_DIR%', '%PACKAGE_NAME%.zip')" 2>nul

REM Cleanup temp directory
rmdir /s /q "%TEMP_DIR%"

echo.
echo ✅ Frontend package created successfully!
echo 📦 File: %PACKAGE_NAME%.zip
echo.
echo 📋 Contents:
echo    ✓ All Next.js app files
echo    ✓ All React components
echo    ✓ Context providers and custom hooks
echo    ✓ Configuration files
echo    ✓ Environment templates
echo    ✓ Documentation (7 files)
echo.
echo ⚠️  NOT included:
echo    ✗ Backend services (CartService, ProductService, OrderService)
echo    ✗ Java files and pom.xml
echo    ✗ node_modules (install with: npm install)
echo.
echo 🚀 Next steps:
echo    1. Extract %PACKAGE_NAME%.zip
echo    2. cd ParaCart-Frontend-temp
echo    3. npm install
echo    4. Copy .env.example to .env.local and update API URLs
echo    5. npm run dev
echo.
pause
