# Publishing @xalatechnologies/document-services to GitHub Packages

## Prerequisites

1. **GitHub Personal Access Token**: You need a GitHub token with `write:packages` permission
2. **Organization Access**: Access to the Xala-Technologies organization on GitHub

## Step 1: Set up Authentication

Create a `.npmrc` file in your home directory or project root:

```bash
@xalatechnologies:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Set your GitHub token as an environment variable:

```bash
export GITHUB_TOKEN=your_github_token_here
```

## Step 2: Build and Test

```bash
# Install dependencies
npm install

# Run tests
npm test

# Build the package
npm run build

# Check what will be published
npm pack --dry-run
```

## Step 3: Publish to GitHub Packages

```bash
# Login to GitHub Packages (if needed)
npm login --registry=https://npm.pkg.github.com

# Publish the package
npm publish
```

## Step 4: Verify Publication

Visit: https://github.com/orgs/Xala-Technologies/packages?repo_name=document-services

## GitHub Repository Setup

1. Create a repository at: `https://github.com/Xala-Technologies/document-services`
2. Add the source code from the `package-build` directory
3. Configure GitHub Actions for automated publishing (optional)

## Installation Instructions for Users

Once published, users can install the package:

```bash
# Add .npmrc to their project
echo "@xalatechnologies:registry=https://npm.pkg.github.com" >> .npmrc

# Install the package
npm install @xalatechnologies/document-services
```

## Norwegian Municipal Usage Example

```typescript
import { 
  DocumentService, 
  SignatureService, 
  ComplianceService 
} from '@xalatechnologies/document-services';

// Configure for Norwegian municipality
const config = {
  maxFileSize: 50 * 1024 * 1024,
  allowedMimeTypes: ['application/pdf'],
  storage: { provider: 'aws', path: '/documents', encryption: true },
  compliance: { nsm: true, gdpr: true, retention: 2555 }
};

const documentService = new DocumentService(config);
const signatureService = new SignatureService();

// Upload building permit document
const document = await documentService.uploadDocument(file, {
  classification: 'INTERNAL',
  tenantId: 'oslo-municipality',
  uploadedBy: 'saksbehandler@oslo.kommune.no',
  tags: ['building-permit', 'nsm:internal']
});

// Initiate BankID signature for Norwegian citizen
const signature = await signatureService.initiateSignature(
  document.id,
  [{ name: 'Lars Hansen', email: 'lars@example.com', role: 'citizen' }],
  { provider: 'bankid', level: 'advanced', timeStamping: true }
);
```

## Package Features

✅ **Norwegian Compliance**
- NSM Classification (PUBLIC, INTERNAL, CONFIDENTIAL, RESTRICTED)
- BankID & ID-porten Digital Signatures
- GDPR Personal Data Protection
- Municipal Workflow Support

✅ **International Features**
- Multi-tenant Architecture
- DocuSign & Adobe Sign Integration
- Global Deployment Support
- Enterprise Security

✅ **Technical Quality**
- TypeScript with Full Type Safety
- 85% Test Coverage Requirement
- Comprehensive Documentation
- Event-Driven Architecture

## Support

- **Issues**: https://github.com/Xala-Technologies/document-services/issues
- **Documentation**: https://xala-technologies.github.io/document-services/
- **Enterprise**: enterprise@xala-technologies.com