# Contributing to @xala-technologies/document-services

Thank you for your interest in contributing to our Norwegian compliance document management library! This guide will help you get started.

## 🇳🇴 Norwegian Municipal Focus

This library is specifically designed for Norwegian municipalities and organizations that need NSM (Norwegian Security Authority) and GDPR compliance. When contributing, please keep this focus in mind.

## 🚀 Getting Started

### Prerequisites

- Node.js 16.0.0 or higher
- npm or yarn
- Git
- TypeScript knowledge
- Basic understanding of Norwegian compliance requirements (NSM, GDPR)

### Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/your-username/document-services.git
   cd document-services
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run Tests**
   ```bash
   npm test
   npm run test:coverage
   npm run test:compliance
   ```

4. **Build the Project**
   ```bash
   npm run build
   ```

5. **Lint and Format**
   ```bash
   npm run lint
   npm run format
   ```

## 📋 Development Guidelines

### Code Standards

- **TypeScript**: All code must be written in TypeScript with strict type checking
- **ESLint**: Follow the provided ESLint configuration
- **Prettier**: Use Prettier for code formatting
- **Test Coverage**: Maintain 85% test coverage minimum
- **Documentation**: All public APIs must have JSDoc comments

### Norwegian Compliance Requirements

When working on compliance features:

1. **NSM Classification**: Understand the four levels (PUBLIC, INTERNAL, CONFIDENTIAL, RESTRICTED)
2. **BankID Integration**: Follow Norwegian digital signature standards
3. **ID-porten**: Understand government employee authentication requirements
4. **GDPR**: Implement proper personal data handling for Norwegian citizens

### Commit Message Format

Use conventional commits:

```
type(scope): description

[optional body]

[optional footer]
```

Examples:
```
feat(nsm): add RESTRICTED classification level support
fix(bankid): resolve signature validation for Norwegian citizens
docs(compliance): update GDPR implementation guide
test(municipal): add Oslo municipality workflow tests
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `test`: Test additions/modifications
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `chore`: Build process or auxiliary tool changes

## 🧪 Testing Guidelines

### Test Structure

```
__tests__/
├── setup.ts                    # Test configuration
├── document-service.test.ts    # Core document management tests
├── signature-service.test.ts   # Digital signature tests
├── compliance-service.test.ts  # Norwegian compliance tests
└── municipal-workflows.test.ts # Municipal use case tests
```

### Norwegian Compliance Tests

All compliance features must have dedicated tests:

```typescript
describe('Norwegian compliance', () => {
  it('should handle NSM INTERNAL classification for Oslo municipality', async () => {
    // Test NSM compliance
  });
  
  it('should validate BankID signatures for Norwegian citizens', async () => {
    // Test BankID integration
  });
  
  it('should enforce GDPR data retention for municipal documents', async () => {
    // Test GDPR compliance
  });
});
```

### Test Categories

1. **Unit Tests**: Individual service functionality
2. **Integration Tests**: Service interactions
3. **Compliance Tests**: Norwegian regulatory requirements
4. **Municipal Tests**: Real-world municipal workflows
5. **International Tests**: Multi-tenant and global features

## 📖 Documentation

### Code Documentation

Use JSDoc for all public APIs:

```typescript
/**
 * Uploads a document with Norwegian NSM classification
 * 
 * @param file - The document file to upload
 * @param metadata - Document metadata including NSM classification
 * @returns Promise resolving to document metadata
 * 
 * @example
 * ```typescript
 * const document = await documentService.uploadDocument(file, {
 *   classification: 'INTERNAL',
 *   tenantId: 'oslo-municipality',
 *   tags: ['building-permit', 'nsm:internal']
 * });
 * ```
 */
async uploadDocument(file: Express.Multer.File, metadata: Partial<DocumentMetadata>): Promise<DocumentMetadata>
```

### Municipal Use Cases

When adding features, provide Norwegian municipal examples:

```typescript
// Example: Building permit workflow for Oslo Municipality
const permit = await documentService.uploadDocument(file, {
  classification: 'INTERNAL',
  tenantId: 'oslo-municipality',
  uploadedBy: 'saksbehandler@oslo.kommune.no',
  tags: ['byggetillatelse', 'nsm:internal']
});
```

## 🔄 Pull Request Process

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/norwegian-municipal-workflow
   ```

2. **Implement Changes**
   - Write code following guidelines
   - Add comprehensive tests
   - Update documentation
   - Ensure compliance requirements are met

3. **Test Thoroughly**
   ```bash
   npm run test:coverage
   npm run test:compliance
   npm run lint
   ```

4. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat(municipal): add building permit workflow for Norwegian municipalities"
   ```

5. **Push and Create PR**
   ```bash
   git push origin feature/norwegian-municipal-workflow
   ```

6. **PR Requirements**
   - Clear description of changes
   - Link to related issues
   - Screenshots/examples if applicable
   - Confirmation of Norwegian compliance testing
   - Passing CI/CD checks

### PR Template

```markdown
## 🇳🇴 Norwegian Compliance Feature

### Description
Brief description of the changes and their impact on Norwegian municipal workflows.

### Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Norwegian compliance update
- [ ] Municipal workflow enhancement

### Norwegian Compliance Checklist
- [ ] NSM classification levels properly implemented
- [ ] BankID/ID-porten integration tested
- [ ] GDPR requirements satisfied
- [ ] Municipal workflow compatibility verified

### Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Norwegian compliance tests pass
- [ ] Municipal workflow tests pass
- [ ] Code coverage ≥ 85%

### Documentation
- [ ] Code comments updated
- [ ] README updated if needed
- [ ] API documentation updated
- [ ] Norwegian municipal examples provided
```

## 🏛️ Norwegian Municipal Workflows

### Priority Municipalities

We focus on these Norwegian municipalities:

1. **Oslo** - Capital city with complex workflows
2. **Bergen** - Major city with unique requirements
3. **Trondheim** - Technology hub with digital initiatives
4. **Stavanger** - Oil industry regulatory needs
5. **Kristiansand** - Southern region representation

### Common Municipal Use Cases

1. **Building Permits** (Byggetillatelser)
2. **Policy Documents** (Politiske dokumenter)
3. **Citizen Services** (Innbyggertjenester)
4. **Administrative Documents** (Administrative dokumenter)
5. **Planning Documents** (Plandokumenter)

## 🚨 Security Guidelines

### NSM Compliance

- Always implement proper classification levels
- Audit logging for all document operations
- Encryption for CONFIDENTIAL and RESTRICTED documents
- Access control based on security clearance

### GDPR Compliance

- Personal data detection and classification
- Consent tracking and management
- Right to erasure implementation
- Privacy impact assessments

### Security Review Process

All security-related changes require:

1. **Code Review**: Two approved reviews required
2. **Security Assessment**: Evaluation of NSM/GDPR impact
3. **Penetration Testing**: For significant changes
4. **Compliance Verification**: Norwegian regulatory check

## 🤝 Community

### Communication

- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: Community discussions and questions
- **Email**: enterprise@xala-technologies.com for enterprise support

### Recognition

Contributors will be recognized in:

- **README**: Contributor list
- **CHANGELOG**: Feature attribution
- **Documentation**: Example attribution
- **Norwegian Municipal Showcase**: Real-world implementations

## 📋 Release Process

### Version Numbering

We follow semantic versioning:

- **Major** (1.x.x): Breaking changes
- **Minor** (x.1.x): New features, Norwegian compliance updates
- **Patch** (x.x.1): Bug fixes, security patches

### Release Schedule

- **Major Releases**: Quarterly
- **Minor Releases**: Monthly
- **Patch Releases**: As needed
- **Security Releases**: Immediate

## ❓ Questions?

- **General Questions**: Create a GitHub Discussion
- **Bug Reports**: Create a GitHub Issue
- **Security Issues**: Email security@xala-technologies.com
- **Norwegian Compliance**: Email compliance@xala-technologies.com
- **Enterprise Support**: Email enterprise@xala-technologies.com

---

**Takk for ditt bidrag til norsk digital forvaltning!** 🇳🇴

*Thank you for contributing to Norwegian digital administration!*