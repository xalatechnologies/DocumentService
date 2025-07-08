#!/bin/bash

# Publish @xala-technologies/document-services to GitHub Packages
set -e

echo "🚀 Publishing @xalatechnologies/document-services to GitHub Packages..."

# Verify we're in the correct directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Run this script from the package-build directory."
    exit 1
fi

# Check if GitHub token is available
if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ Error: GITHUB_TOKEN environment variable is not set."
    echo "Please set it with: export GITHUB_TOKEN=your_token_here"
    exit 1
fi

# Verify package is built
if [ ! -d "dist" ]; then
    echo "📦 Building package..."
    npm run build
fi

# Run tests before publishing
echo "🧪 Running tests..."
npm test

# Create .npmrc for GitHub Packages
echo "🔧 Configuring npm for GitHub Packages..."
cat > .npmrc << EOF
@xalatechnologies:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=\${GITHUB_TOKEN}
EOF

# Publish the package
echo "📤 Publishing to GitHub Packages..."
npm publish --registry=https://npm.pkg.github.com

echo "✅ Successfully published @xalatechnologies/document-services to GitHub Packages!"
echo "📦 Package URL: https://github.com/orgs/xalatechnologies/packages"
echo "💾 Installation: npm install @xalatechnologies/document-services"