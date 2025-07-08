#!/bin/bash

# Quick publish to GitHub Packages (skips tests)
set -e

echo "🚀 Publishing @xalatechnologies/document-services to GitHub Packages..."

# Check if GitHub token is available
if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ Error: GITHUB_TOKEN environment variable is not set."
    exit 1
fi

# Ensure package is built
echo "📦 Building package..."
npm run build

# Create .npmrc for GitHub Packages
echo "🔧 Configuring npm for GitHub Packages..."
cat > .npmrc << EOF
@xalatechnologies:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=\${GITHUB_TOKEN}
EOF

# Publish the package
echo "📤 Publishing to GitHub Packages..."
npm publish --registry=https://npm.pkg.github.com

echo "✅ Successfully published @xalatechnologies/document-services!"
echo "📦 Package URL: https://github.com/orgs/xalatechnologies/packages"
echo "💾 Installation: npm install @xalatechnologies/document-services"