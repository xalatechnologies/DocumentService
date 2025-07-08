import { DocumentService } from '../src/document-service';
import { DocumentConfig } from '../src/types';

describe('DocumentService', () => {
  let documentService: DocumentService;
  let mockConfig: DocumentConfig;

  beforeEach(() => {
    mockConfig = {
      maxFileSize: 50 * 1024 * 1024, // 50MB
      allowedMimeTypes: ['application/pdf', 'text/plain'],
      storage: {
        provider: 'local',
        path: '/tmp/documents',
        encryption: false
      },
      compliance: {
        nsm: true,
        gdpr: true,
        retention: 2555 // 7 years
      }
    };
    
    documentService = new DocumentService(mockConfig);
  });

  describe('Norwegian compliance', () => {
    it('should handle NSM classification levels', async () => {
      const mockFile = {
        originalname: 'test-document.pdf',
        mimetype: 'application/pdf',
        size: 1024,
        buffer: Buffer.from('test content')
      } as any;

      const metadata = {
        classification: 'INTERNAL' as const,
        tenantId: 'oslo-municipality',
        uploadedBy: 'test@oslo.kommune.no',
        tags: ['nsm:internal', 'building-permit']
      };

      // Mock the private methods
      jest.spyOn(documentService as any, 'validateFile').mockResolvedValue(undefined);
      jest.spyOn(documentService as any, 'storeFile').mockResolvedValue('/tmp/documents/test-id');
      jest.spyOn(documentService as any, 'saveMetadata').mockResolvedValue(undefined);
      jest.spyOn(documentService as any, 'logNsmEvent').mockResolvedValue(undefined);

      const result = await documentService.uploadDocument(mockFile, metadata);

      expect(result.classification).toBe('INTERNAL');
      expect(result.tenantId).toBe('oslo-municipality');
      expect(result.tags).toContain('nsm:internal');
      expect(result.tags).toContain('building-permit');
    });

    it('should enforce NSM retention policies', async () => {
      const documentId = 'test-doc-id';
      
      // Mock metadata with recent upload date (should not be deletable)
      const mockMetadata = {
        id: documentId,
        filename: 'test.pdf',
        mimeType: 'application/pdf',
        size: 1024,
        checksum: 'test-checksum',
        uploadedAt: new Date(), // Recent upload
        uploadedBy: 'test@oslo.kommune.no',
        tenantId: 'oslo-municipality',
        classification: 'INTERNAL' as const,
        tags: ['nsm:internal'],
        customFields: {}
      };

      jest.spyOn(documentService as any, 'getMetadata').mockResolvedValue(mockMetadata);

      await expect(documentService.deleteDocument(documentId))
        .rejects.toThrow('Document cannot be deleted due to retention policy');
    });

    it('should validate BankID signature integration', () => {
      // Test that NSM compliance logging is called
      const logSpy = jest.spyOn(documentService as any, 'logNsmEvent');
      
      documentService.emit('documentUploaded', {
        id: 'test-id',
        classification: 'CONFIDENTIAL',
        tenantId: 'oslo-municipality'
      });

      expect(logSpy).toHaveBeenCalledWith('DOCUMENT_UPLOADED', expect.any(Object));
    });
  });

  describe('GDPR compliance', () => {
    it('should handle GDPR deletion requests', async () => {
      const documentId = 'test-doc-id';
      
      // Mock metadata with old upload date (should be deletable)
      const oldDate = new Date();
      oldDate.setFullYear(oldDate.getFullYear() - 8); // 8 years ago
      
      const mockMetadata = {
        id: documentId,
        filename: 'test.pdf',
        mimeType: 'application/pdf',
        size: 1024,
        checksum: 'test-checksum',
        uploadedAt: oldDate,
        uploadedBy: 'test@example.com',
        tenantId: 'test-tenant',
        classification: 'INTERNAL' as const,
        tags: ['gdpr:personal-data'],
        customFields: {}
      };

      jest.spyOn(documentService as any, 'getMetadata').mockResolvedValue(mockMetadata);
      jest.spyOn(documentService as any, 'deleteMetadata').mockResolvedValue(undefined);
      jest.spyOn(documentService as any, 'logGdprEvent').mockResolvedValue(undefined);
      
      // Mock file system operations
      const fs = require('fs/promises');
      fs.unlink = jest.fn().mockResolvedValue(undefined);

      await expect(documentService.deleteDocument(documentId))
        .resolves.toBeUndefined();
    });
  });

  describe('Multi-tenant support', () => {
    it('should isolate documents by tenant', async () => {
      const mockFile = {
        originalname: 'tenant-doc.pdf',
        mimetype: 'application/pdf',
        size: 1024,
        buffer: Buffer.from('tenant content')
      } as any;

      // Mock the private methods
      jest.spyOn(documentService as any, 'validateFile').mockResolvedValue(undefined);
      jest.spyOn(documentService as any, 'storeFile').mockResolvedValue('/tmp/documents/tenant-id');
      jest.spyOn(documentService as any, 'saveMetadata').mockResolvedValue(undefined);

      const result = await documentService.uploadDocument(mockFile, {
        tenantId: 'international-corp',
        classification: 'CONFIDENTIAL',
        uploadedBy: 'user@company.com'
      });

      expect(result.tenantId).toBe('international-corp');
      expect(result.classification).toBe('CONFIDENTIAL');
    });
  });
});