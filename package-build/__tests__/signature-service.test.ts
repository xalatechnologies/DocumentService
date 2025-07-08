import { SignatureService } from '../src/signature-service';

describe('SignatureService', () => {
  let signatureService: SignatureService;

  beforeEach(() => {
    signatureService = new SignatureService();
  });

  describe('Norwegian compliance', () => {
    it('should support BankID signatures for citizens', async () => {
      const documentId = 'building-permit-123';
      const signers = [
        { name: 'Lars Hansen', email: 'lars.hansen@example.com', role: 'citizen' }
      ];
      
      const config = {
        provider: 'bankid' as const,
        level: 'advanced' as const,
        timeStamping: true,
        longTermValidation: true
      };

      const result = await signatureService.initiateSignature(documentId, signers, config);

      expect(result.signatureId).toMatch(/^sig_\d+_[a-z0-9]+$/);
      expect(result.signatureUrl).toContain('bankid.example.com');
      expect(result.status).toBe('pending');
    });

    it('should support ID-porten signatures for government employees', async () => {
      const documentId = 'policy-doc-456';
      const signers = [
        { name: 'Kari Nordmann', email: 'kari.nordmann@oslo.kommune.no', role: 'saksbehandler' }
      ];
      
      const config = {
        provider: 'idporten' as const,
        level: 'qualified' as const,
        timeStamping: true,
        longTermValidation: true
      };

      const result = await signatureService.initiateSignature(documentId, signers, config);

      expect(result.signatureId).toMatch(/^sig_\d+_[a-z0-9]+$/);
      expect(result.signatureUrl).toContain('idporten.example.com');
      expect(result.status).toBe('pending');
    });
  });

  describe('International signature providers', () => {
    it('should support DocuSign for international contracts', async () => {
      const documentId = 'international-contract-789';
      const signers = [
        { name: 'John Smith', email: 'john@company.com', role: 'ceo' },
        { name: 'Maria Garcia', email: 'maria@partner.com', role: 'partner' }
      ];
      
      const config = {
        provider: 'docusign' as const,
        level: 'advanced' as const,
        timeStamping: false,
        longTermValidation: false
      };

      const result = await signatureService.initiateSignature(documentId, signers, config);

      expect(result.signatureId).toMatch(/^sig_\d+_[a-z0-9]+$/);
      expect(result.signatureUrl).toContain('docusign.example.com');
      expect(result.status).toBe('pending');
    });

    it('should support Adobe Sign for enterprise workflows', async () => {
      const documentId = 'enterprise-agreement-101';
      const signers = [
        { name: 'CEO Name', email: 'ceo@enterprise.com', role: 'ceo' }
      ];
      
      const config = {
        provider: 'adobesign' as const,
        level: 'simple' as const,
        timeStamping: true,
        longTermValidation: false
      };

      const result = await signatureService.initiateSignature(documentId, signers, config);

      expect(result.signatureId).toMatch(/^sig_\d+_[a-z0-9]+$/);
      expect(result.signatureUrl).toContain('adobesign.example.com');
      expect(result.status).toBe('pending');
    });
  });

  describe('Signature status tracking', () => {
    it('should track signature status for multiple signers', async () => {
      const signatureId = 'sig_123456789_abcdef123';
      
      const status = await signatureService.getSignatureStatus(signatureId);

      expect(status).toHaveProperty('status');
      expect(status).toHaveProperty('signers');
      expect(status.status).toMatch(/^(pending|completed|failed)$/);
      expect(Array.isArray(status.signers)).toBe(true);
    });
  });

  describe('Error handling', () => {
    it('should throw error for unsupported signature provider', async () => {
      const documentId = 'test-doc';
      const signers = [{ name: 'Test User', email: 'test@example.com' }];
      
      const config = {
        provider: 'unsupported' as any,
        level: 'simple' as const,
        timeStamping: false,
        longTermValidation: false
      };

      await expect(signatureService.initiateSignature(documentId, signers, config))
        .rejects.toThrow('Unsupported signature provider: unsupported');
    });
  });
});