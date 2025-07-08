export interface DocumentConfig {
  maxFileSize: number;
  allowedMimeTypes: string[];
  storage: {
    provider: 'local' | 'aws' | 's3' | 'azure';
    path: string;
    encryption: boolean;
  };
  compliance: {
    nsm: boolean;
    gdpr: boolean;
    retention: number; // days
  };
}

export interface DocumentMetadata {
  id: string;
  filename: string;
  mimeType: string;
  size: number;
  checksum: string;
  uploadedAt: Date;
  uploadedBy: string;
  tenantId: string;
  classification: 'PUBLIC' | 'INTERNAL' | 'CONFIDENTIAL' | 'RESTRICTED';
  tags: string[];
  customFields: Record<string, any>;
}

export interface VersionInfo {
  version: string;
  previousVersion?: string;
  changedBy: string;
  changedAt: Date;
  changeReason: string;
  checksum: string;
}

export interface ArchivePolicy {
  retentionDays: number;
  compressionEnabled: boolean;
  encryptionRequired: boolean;
  deleteAfterArchive: boolean;
  archiveFormat: 'zip' | 'tar' | '7z';
}

export interface TemplateConfig {
  id: string;
  name: string;
  category: string;
  fields: TemplateField[];
  layout: string;
  compliance: {
    nsm: boolean;
    gdpr: boolean;
  };
}

export interface TemplateField {
  name: string;
  type: 'text' | 'number' | 'date' | 'select' | 'checkbox';
  required: boolean;
  validation?: string;
  options?: string[];
}

export interface ConversionOptions {
  targetFormat: 'pdf' | 'docx' | 'html' | 'txt' | 'png' | 'jpg';
  quality?: number;
  watermark?: string;
  compression?: boolean;
}

export interface SignatureConfig {
  provider: 'bankid' | 'idporten' | 'docusign' | 'adobesign';
  level: 'simple' | 'advanced' | 'qualified';
  timeStamping: boolean;
  longTermValidation: boolean;
}

export interface ComplianceReport {
  documentId: string;
  nsmClassification: string;
  gdprCompliant: boolean;
  retentionStatus: 'active' | 'archived' | 'deleted';
  lastAudit: Date;
  issues: string[];
  recommendations: string[];
}
