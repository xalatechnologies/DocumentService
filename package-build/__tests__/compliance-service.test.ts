import { ComplianceService } from '../src/compliance-service';

describe('ComplianceService - Norwegian compliance', () => {
  let complianceService: ComplianceService;

  beforeEach(() => {
    complianceService = new ComplianceService();
  });

  describe('NSM Classification Compliance', () => {
    it('should validate NSM classification levels for municipal documents', async () => {
      const documentId = 'oslo-building-permit-123';
      
      // Mock document metadata with proper NSM classification
      jest.spyOn(complianceService as any, 'getDocumentMetadata').mockResolvedValue({
        id: documentId,
        filename: 'building-permit.pdf',
        classification: 'INTERNAL',
        tenantId: 'oslo-municipality',
        tags: ['nsm:internal', 'building-permit'],
        customFields: {
          legalBasis: 'Plan- og bygningsloven',
          retentionPeriod: '7 years',
          dataSubjectRights: 'documented'
        }
      });

      const report = await complianceService.generateComplianceReport(documentId);

      expect(report.nsmClassification).toBe('INTERNAL');
      expect(report.gdprCompliant).toBe(true);
      expect(report.issues).toHaveLength(0);
      expect(report.recommendations).toHaveLength(0);
    });

    it('should flag missing NSM classification', async () => {
      const documentId = 'invalid-doc-456';
      
      jest.spyOn(complianceService as any, 'getDocumentMetadata').mockResolvedValue({
        id: documentId,
        filename: 'unclassified-doc.pdf',
        classification: null, // Missing classification
        tenantId: 'stavanger-municipality',
        tags: [],
        customFields: {}
      });

      const report = await complianceService.generateComplianceReport(documentId);

      expect(report.nsmClassification).toBe('UNKNOWN');
      expect(report.issues).toContain('Missing NSM classification');
      expect(report.recommendations).toContain('Assign appropriate NSM classification level');
    });

    it('should validate RESTRICTED documents for government use', async () => {
      const documentId = 'classified-policy-789';
      
      jest.spyOn(complianceService as any, 'getDocumentMetadata').mockResolvedValue({
        id: documentId,
        filename: 'classified-policy.pdf',
        classification: 'RESTRICTED',
        tenantId: 'regjeringen-no',
        tags: ['nsm:restricted', 'policy', 'government'],
        customFields: {
          legalBasis: 'Offentleglova',
          retentionPeriod: '30 years',
          dataSubjectRights: 'limited'
        }
      });

      const report = await complianceService.generateComplianceReport(documentId);

      expect(report.nsmClassification).toBe('RESTRICTED');
      expect(report.gdprCompliant).toBe(true);
      expect(report.retentionStatus).toBe('active');
    });
  });

  describe('GDPR Compliance for Norwegian Municipalities', () => {
    it('should validate GDPR compliance for citizen data', async () => {
      const documentId = 'citizen-application-101';
      
      jest.spyOn(complianceService as any, 'getDocumentMetadata').mockResolvedValue({
        id: documentId,
        filename: 'citizen-application.pdf',
        classification: 'CONFIDENTIAL',
        tenantId: 'bergen-municipality',
        tags: ['gdpr:personal-data', 'citizen-service'],
        customFields: {
          legalBasis: 'Samtykke (Art. 6(1)(a) GDPR)',
          retentionPeriod: '5 years',
          dataSubjectRights: 'full-access',
          gdprConsent: true,
          dataSubject: 'citizen-12345'
        }
      });

      const report = await complianceService.generateComplianceReport(documentId);

      expect(report.gdprCompliant).toBe(true);
      expect(report.issues).toHaveLength(0);
    });

    it('should flag missing GDPR consent for personal data', async () => {
      const documentId = 'no-consent-doc-202';
      
      jest.spyOn(complianceService as any, 'getDocumentMetadata').mockResolvedValue({
        id: documentId,
        filename: 'personal-data.pdf',
        classification: 'CONFIDENTIAL',
        tenantId: 'trondheim-municipality',
        tags: ['gdpr:personal-data'],
        customFields: {} // Missing GDPR fields
      });

      const report = await complianceService.generateComplianceReport(documentId);

      expect(report.gdprCompliant).toBe(false);
      expect(report.issues).toContain('Missing GDPR legal basis for processing');
      expect(report.issues).toContain('Missing data retention period');
      expect(report.issues).toContain('Missing data subject rights information');
    });
  });

  describe('Document Auditing', () => {
    it('should perform comprehensive compliance audit', async () => {
      const documentId = 'audit-test-303';
      
      jest.spyOn(complianceService as any, 'getDocumentMetadata').mockResolvedValue({
        id: documentId,
        filename: 'compliant-document.pdf',
        classification: 'INTERNAL',
        tenantId: 'oslo-municipality',
        tags: ['nsm:internal', 'gdpr:compliant'],
        customFields: {
          legalBasis: 'Offentlig oppgave (Art. 6(1)(e) GDPR)',
          retentionPeriod: '7 years',
          dataSubjectRights: 'documented'
        }
      });

      const audit = await complianceService.auditDocument(documentId);

      expect(audit.passed).toBe(true);
      expect(audit.violations).toHaveLength(0);
      expect(audit.score).toBe(100);
    });

    it('should calculate compliance score for partially compliant documents', async () => {
      const documentId = 'partial-compliance-404';
      
      jest.spyOn(complianceService as any, 'getDocumentMetadata').mockResolvedValue({
        id: documentId,
        filename: 'partial-document.pdf',
        classification: 'INTERNAL',
        tenantId: 'kristiansand-municipality',
        tags: ['nsm:internal'],
        customFields: {
          legalBasis: 'Public task'
          // Missing other GDPR fields
        }
      });

      const audit = await complianceService.auditDocument(documentId);

      expect(audit.passed).toBe(false);
      expect(audit.violations.length).toBeGreaterThan(0);
      expect(audit.score).toBeLessThan(100);
      expect(audit.score).toBeGreaterThan(0);
    });
  });

  describe('Retention Policy Compliance', () => {
    it('should correctly identify documents for archival', async () => {
      const oldDate = new Date();
      oldDate.setFullYear(oldDate.getFullYear() - 2); // 2 years old
      
      const documentId = 'archive-candidate-505';
      
      jest.spyOn(complianceService as any, 'getDocumentMetadata').mockResolvedValue({
        id: documentId,
        filename: 'old-document.pdf',
        classification: 'INTERNAL',
        uploadedAt: oldDate,
        tenantId: 'drammen-municipality',
        tags: ['nsm:internal'],
        customFields: {}
      });

      const report = await complianceService.generateComplianceReport(documentId);

      expect(report.retentionStatus).toBe('archived');
    });

    it('should identify documents for deletion after retention period', async () => {
      const veryOldDate = new Date();
      veryOldDate.setFullYear(veryOldDate.getFullYear() - 8); // 8 years old
      
      const documentId = 'deletion-candidate-606';
      
      jest.spyOn(complianceService as any, 'getDocumentMetadata').mockResolvedValue({
        id: documentId,
        filename: 'very-old-document.pdf',
        classification: 'PUBLIC',
        uploadedAt: veryOldDate,
        tenantId: 'bodo-municipality',
        tags: ['nsm:public'],
        customFields: {}
      });

      const report = await complianceService.generateComplianceReport(documentId);

      expect(report.retentionStatus).toBe('deleted');
    });
  });
});