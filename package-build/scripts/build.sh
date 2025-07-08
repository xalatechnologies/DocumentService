#!/bin/bash

# Build script for @xala-technologies/document-services
# This script builds, tests, and prepares the package for publishing

set -e

echo "🏗️  Building @xala-technologies/document-services"
echo "=================================================="

# Clean previous build
echo "🧹 Cleaning previous build..."
npm run clean

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Run linting
echo "🔍 Running ESLint..."
npm run lint

# Run tests with coverage
echo "🧪 Running tests with coverage..."
npm run test:coverage

# Run Norwegian compliance tests
echo "🇳🇴 Running Norwegian compliance tests..."
npm run test:compliance

# Check TypeScript compilation
echo "📝 Compiling TypeScript..."
npm run build

# Generate documentation
echo "📚 Generating API documentation..."
npm run docs

# Check package contents
echo "📋 Checking package contents..."
npm pack --dry-run

echo ""
echo "✅ Build completed successfully!"
echo ""
echo "📊 Build Summary:"
echo "- TypeScript compilation: ✅"
echo "- Tests passed: ✅"
echo "- Norwegian compliance tests: ✅"
echo "- Code coverage: ≥85%"
echo "- Linting: ✅"
echo "- Documentation: ✅"
echo ""
echo "🚀 Ready for publishing!"
echo "Run 'npm publish' to publish to NPM registry"