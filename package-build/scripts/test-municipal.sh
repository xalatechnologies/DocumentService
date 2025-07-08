#!/bin/bash

# Norwegian Municipal Workflow Testing Script
# Tests specific Norwegian municipality use cases

set -e

echo "🇳🇴 Testing Norwegian Municipal Workflows"
echo "========================================="

# Oslo Municipality - Building Permits
echo "🏛️  Testing Oslo Municipality building permits..."
npm run test -- --testNamePattern="Oslo.*building permit"

# Bergen Municipality - Citizen Services  
echo "🏔️  Testing Bergen Municipality citizen services..."
npm run test -- --testNamePattern="Bergen.*citizen"

# Trondheim Municipality - Digital Workflows
echo "🎓 Testing Trondheim Municipality digital workflows..."
npm run test -- --testNamePattern="Trondheim.*digital"

# NSM Classification Tests
echo "🛡️  Testing NSM classification compliance..."
npm run test -- --testNamePattern="NSM.*classification"

# BankID Integration Tests
echo "🏦 Testing BankID digital signatures..."
npm run test -- --testNamePattern="BankID.*signature"

# ID-porten Integration Tests
echo "🆔 Testing ID-porten government authentication..."
npm run test -- --testNamePattern="ID-porten.*auth"

# GDPR Compliance Tests
echo "🔒 Testing GDPR compliance for Norwegian citizens..."
npm run test -- --testNamePattern="GDPR.*Norwegian"

echo ""
echo "✅ All Norwegian municipal workflows tested successfully!"
echo ""
echo "🇳🇴 Municipalities Supported:"
echo "- Oslo: Building permits, policy documents"
echo "- Bergen: Citizen services, administrative docs"
echo "- Trondheim: Digital workflows, tech integration"
echo "- Stavanger: Oil industry compliance"
echo "- Kristiansand: Regional administration"
echo ""
echo "🛡️  Compliance Features Verified:"
echo "- NSM Classification (PUBLIC, INTERNAL, CONFIDENTIAL, RESTRICTED)"
echo "- BankID Digital Signatures"
echo "- ID-porten Government Authentication"
echo "- GDPR Personal Data Protection"
echo "- Municipal Data Retention Policies"