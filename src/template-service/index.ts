import { EventEmitter } from 'events';
import { TemplateConfig, TemplateField } from '../types';

export class TemplateService extends EventEmitter {
  private templates: Map<string, TemplateConfig> = new Map();

  constructor() {
    super();
  }

  async createTemplate(template: TemplateConfig): Promise<string> {
    await this.validateTemplate(template);
    this.templates.set(template.id, template);
    await this.saveTemplate(template);
    this.emit('templateCreated', template);
    return template.id;
  }

  async generateDocument(
    templateId: string,
    data: Record<string, any>
  ): Promise<Buffer> {
    const template = this.templates.get(templateId);
    if (!template) {
      throw new Error(`Template not found: ${templateId}`);
    }

    await this.validateTemplateData(template, data);
    const document = await this.processTemplate(template, data);
    this.emit('documentGenerated', { templateId, dataKeys: Object.keys(data) });

    return document;
  }

  private async validateTemplate(template: TemplateConfig): Promise<void> {
    if (!template.id || !template.name) {
      throw new Error('Template must have id and name');
    }

    for (const field of template.fields) {
      if (!field.name || !field.type) {
        throw new Error('Template fields must have name and type');
      }
    }

    if (template.compliance.nsm) {
      await this.validateNsmCompliance(template);
    }
  }

  private async validateNsmCompliance(template: TemplateConfig): Promise<void> {
    const requiredFields = ['classification', 'created_by', 'created_date'];
    
    for (const required of requiredFields) {
      if (!template.fields.some(f => f.name === required)) {
        throw new Error(`NSM compliant templates must include ${required} field`);
      }
    }
  }

  private async validateTemplateData(
    template: TemplateConfig,
    data: Record<string, any>
  ): Promise<void> {
    for (const field of template.fields) {
      if (field.required && !data[field.name]) {
        throw new Error(`Required field missing: ${field.name}`);
      }
    }
  }

  private async processTemplate(template: TemplateConfig, data: Record<string, any>): Promise<Buffer> {
    let content = template.layout;

    for (const field of template.fields) {
      const placeholder = `{{${field.name}}}`;
      const value = data[field.name] || '';
      content = content.replace(new RegExp(placeholder, 'g'), String(value));
    }

    return Buffer.from(content, 'utf8');
  }

  private async saveTemplate(template: TemplateConfig): Promise<void> {
    console.log('Template saved', { id: template.id });
  }
}
