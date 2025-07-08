import { EventEmitter } from 'events';
import { DocumentMetadata } from '../types';

export class MetadataService extends EventEmitter {
  constructor() {
    super();
  }

  async extractMetadata(
    buffer: Buffer,
    mimeType: string,
    filename: string
  ): Promise<Partial<DocumentMetadata>> {
    console.log('Extracting metadata', { mimeType, filename });

    const metadata: Partial<DocumentMetadata> = {
      filename,
      mimeType,
      size: buffer.length,
      uploadedAt: new Date(),
      tags: []
    };

    // Extract format-specific metadata
    switch (mimeType) {
      case 'application/pdf':
        await this.extractPdfMetadata(buffer, metadata);
        break;
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        await this.extractDocxMetadata(buffer, metadata);
        break;
      case 'image/jpeg':
      case 'image/png':
        await this.extractImageMetadata(buffer, metadata);
        break;
    }

    this.emit('metadataExtracted', metadata);
    return metadata;
  }

  async validateCompliance(metadata: DocumentMetadata): Promise<{
    nsmCompliant: boolean;
    gdprCompliant: boolean;
    issues: string[];
    recommendations: string[];
  }> {
    const issues: string[] = [];
    const recommendations: string[] = [];

    // NSM compliance validation
    const nsmCompliant = this.validateNsmCompliance(metadata, issues, recommendations);
    
    // GDPR compliance validation
    const gdprCompliant = this.validateGdprCompliance(metadata, issues, recommendations);

    return {
      nsmCompliant,
      gdprCompliant,
      issues,
      recommendations
    };
  }

  private async extractPdfMetadata(
    buffer: Buffer,
    metadata: Partial<DocumentMetadata>
  ): Promise<void> {
    // Extract PDF-specific metadata
    console.log('Extracting PDF metadata');
  }

  private async extractDocxMetadata(
    buffer: Buffer,
    metadata: Partial<DocumentMetadata>
  ): Promise<void> {
    // Extract DOCX-specific metadata
    console.log('Extracting DOCX metadata');
  }

  private async extractImageMetadata(
    buffer: Buffer,
    metadata: Partial<DocumentMetadata>
  ): Promise<void> {
    // Extract image metadata (EXIF data)
    console.log('Extracting image metadata');
  }

  private validateNsmCompliance(
    metadata: DocumentMetadata,
    issues: string[],
    recommendations: string[]
  ): boolean {
    let compliant = true;

    // Check classification
    if (!metadata.classification) {
      issues.push('Missing NSM classification');
      recommendations.push('Add NSM classification level');
      compliant = false;
    }

    // Check required tags
    const nsmTags = metadata.tags.filter(tag => tag.startsWith('nsm:'));
    if (nsmTags.length === 0) {
      issues.push('Missing NSM tags');
      recommendations.push('Add appropriate NSM tags');
      compliant = false;
    }

    return compliant;
  }

  private validateGdprCompliance(
    metadata: DocumentMetadata,
    issues: string[],
    recommendations: string[]
  ): boolean {
    let compliant = true;

    // Check for personal data indicators
    const personalDataIndicators = ['ssn', 'personal', 'private', 'gdpr'];
    const hasPersonalData = metadata.tags.some(tag => 
      personalDataIndicators.some(indicator => tag.toLowerCase().includes(indicator))
    );

    if (hasPersonalData) {
      // Check for GDPR-specific fields
      if (!metadata.customFields.gdprConsent) {
        issues.push('Missing GDPR consent information');
        recommendations.push('Add GDPR consent tracking');
        compliant = false;
      }

      if (!metadata.customFields.dataSubject) {
        issues.push('Missing data subject information');
        recommendations.push('Add data subject identification');
        compliant = false;
      }
    }

    return compliant;
  }
}
