#!/bin/bash

# ParaCart Frontend Package Creator
# This script creates a frontend-only zip file without backend services

echo "🚀 Creating ParaCart Frontend Package..."

# Create a temporary directory
TEMP_DIR="ParaCart-Frontend-temp"
PACKAGE_NAME="ParaCart-Frontend"

# Remove if exists
rm -rf "$TEMP_DIR"
rm -f "$PACKAGE_NAME.zip"

# Create directory structure
mkdir -p "$TEMP_DIR"

# Copy frontend directories
echo "📁 Copying frontend directories..."
cp -r app "$TEMP_DIR/" 2>/dev/null || true
cp -r components "$TEMP_DIR/" 2>/dev/null || true
cp -r context "$TEMP_DIR/" 2>/dev/null || true
cp -r hooks "$TEMP_DIR/" 2>/dev/null || true
cp -r lib "$TEMP_DIR/" 2>/dev/null || true
cp -r public "$TEMP_DIR/" 2>/dev/null || true

# Copy configuration files
echo "⚙️  Copying configuration files..."
cp package.json "$TEMP_DIR/" 2>/dev/null || true
cp tsconfig.json "$TEMP_DIR/" 2>/dev/null || true
cp tailwind.config.js "$TEMP_DIR/" 2>/dev/null || true
cp postcss.config.js "$TEMP_DIR/" 2>/dev/null || true
cp next.config.js "$TEMP_DIR/" 2>/dev/null || true
cp .gitignore "$TEMP_DIR/" 2>/dev/null || true
cp .env.example "$TEMP_DIR/" 2>/dev/null || true
cp .env.local "$TEMP_DIR/" 2>/dev/null || true

# Copy documentation
echo "📚 Copying documentation..."
cp README.md "$TEMP_DIR/" 2>/dev/null || true
cp API_INTEGRATION.md "$TEMP_DIR/" 2>/dev/null || true
cp DEPLOYMENT.md "$TEMP_DIR/" 2>/dev/null || true
cp QUICKSTART.md "$TEMP_DIR/" 2>/dev/null || true
cp PROJECT_SUMMARY.md "$TEMP_DIR/" 2>/dev/null || true
cp IMPLEMENTATION_COMPLETE.md "$TEMP_DIR/" 2>/dev/null || true
cp FRONTEND_PACKAGE.md "$TEMP_DIR/" 2>/dev/null || true

# Create zip file
echo "📦 Creating zip file..."
zip -r "$PACKAGE_NAME.zip" "$TEMP_DIR" -q

# Get file size
FILE_SIZE=$(du -h "$PACKAGE_NAME.zip" | cut -f1)

# Cleanup temp directory
rm -rf "$TEMP_DIR"

echo ""
echo "✅ Frontend package created successfully!"
echo "📦 File: $PACKAGE_NAME.zip"
echo "📊 Size: $FILE_SIZE"
echo ""
echo "📋 Contents:"
echo "   ✓ All Next.js app files"
echo "   ✓ All React components"
echo "   ✓ Context providers and custom hooks"
echo "   ✓ Configuration files"
echo "   ✓ Environment templates"
echo "   ✓ Documentation (7 files)"
echo ""
echo "⚠️  NOT included:"
echo "   ✗ Backend services (CartService, ProductService, OrderService)"
echo "   ✗ Java files and pom.xml"
echo "   ✗ node_modules (install with: npm install)"
echo ""
echo "🚀 Next steps:"
echo "   1. Extract $PACKAGE_NAME.zip"
echo "   2. cd ParaCart-Frontend-temp"
echo "   3. npm install"
echo "   4. Copy .env.example to .env.local and update API URLs"
echo "   5. npm run dev"
