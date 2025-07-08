import { EventEmitter } from 'events';
import { ComplianceReport, DocumentMetadata } from '../types';

export class ComplianceService extends EventEmitter {
  constructor() {
    super();
  }

  async generateComplianceReport(documentId: string): Promise<ComplianceReport> {
    console.log('Generating compliance report', { documentId });

    const metadata = await this.getDocumentMetadata(documentId);
    if (!metadata) {
      throw new Error(`Document not found: ${documentId}`);
    }

    const issues: string[] = [];
    const recommendations: string[] = [];

    // NSM compliance check
    const nsmClassification = this.checkNsmClassification(metadata, issues, recommendations);

    // GDPR compliance check
    const gdprCompliant = this.checkGdprCompliance(metadata, issues, recommendations);

    // Retention status check
    const retentionStatus = this.checkRetentionStatus(metadata);

    const report: ComplianceReport = {
      documentId,
      nsmClassification,
      gdprCompliant,
      retentionStatus,
      lastAudit: new Date(),
      issues,
      recommendations
    };

    this.emit('complianceReportGenerated', report);
    return report;
  }

  async auditDocument(documentId: string): Promise<{
    passed: boolean;
    violations: string[];
    score: number;
  }> {
    console.log('Auditing document', { documentId });

    const report = await this.generateComplianceReport(documentId);
    
    const violations = report.issues;
    const totalChecks = 10; // Total number of compliance checks
    const passedChecks = totalChecks - violations.length;
    const score = (passedChecks / totalChecks) * 100;

    return {
      passed: violations.length === 0,
      violations,
      score
    };
  }

  private async getDocumentMetadata(documentId: string): Promise<DocumentMetadata | null> {
    // Retrieve from database
    return null; // Placeholder
  }

  private checkNsmClassification(
    metadata: DocumentMetadata,
    issues: string[],
    recommendations: string[]
  ): string {
    if (!metadata.classification) {
      issues.push('Missing NSM classification');
      recommendations.push('Assign appropriate NSM classification level');
      return 'UNKNOWN';
    }

    const validClassifications = ['PUBLIC', 'INTERNAL', 'CONFIDENTIAL', 'RESTRICTED'];
    if (!validClassifications.includes(metadata.classification)) {
      issues.push('Invalid NSM classification');
      recommendations.push('Use valid NSM classification levels');
      return 'INVALID';
    }

    return metadata.classification;
  }

  private checkGdprCompliance(
    metadata: DocumentMetadata,
    issues: string[],
    recommendations: string[]
  ): boolean {
    let compliant = true;

    // Check for personal data processing basis
    if (!metadata.customFields.legalBasis) {
      issues.push('Missing GDPR legal basis for processing');
      recommendations.push('Document legal basis for personal data processing');
      compliant = false;
    }

    // Check data retention period
    if (!metadata.customFields.retentionPeriod) {
      issues.push('Missing data retention period');
      recommendations.push('Define clear data retention period');
      compliant = false;
    }

    // Check for data subject rights information
    if (!metadata.customFields.dataSubjectRights) {
      issues.push('Missing data subject rights information');
      recommendations.push('Document available data subject rights');
      compliant = false;
    }

    return compliant;
  }

  private checkRetentionStatus(metadata: DocumentMetadata): 'active' | 'archived' | 'deleted' {
    // Check if document should be archived or deleted based on age
    const now = new Date();
    const uploadDate = new Date(metadata.uploadedAt);
    const daysSinceUpload = Math.floor((now.getTime() - uploadDate.getTime()) / (1000 * 60 * 60 * 24));

    // Simple retention logic - would be more sophisticated in real implementation
    if (daysSinceUpload > 2555) { // 7 years
      return 'deleted';
    } else if (daysSinceUpload > 365) { // 1 year
      return 'archived';
    } else {
      return 'active';
    }
  }
}
