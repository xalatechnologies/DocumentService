// Jest setup file for @xala-technologies/document-services

// Set test timeout
jest.setTimeout(10000);

// Mock external dependencies for testing
jest.mock('fs/promises');
jest.mock('crypto');

// Global test configuration
process.env.NODE_ENV = 'test';

// Suppress console.log during tests unless explicitly needed
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

// Mock EventEmitter for services
jest.mock('events', () => ({
  EventEmitter: class MockEventEmitter {
    emit = jest.fn();
    on = jest.fn();
    off = jest.fn();
    removeListener = jest.fn();
  }
}));

// Set up test environment variables
process.env.DOCUMENT_STORAGE_PROVIDER = 'local';
process.env.DOCUMENT_STORAGE_PATH = '/tmp/test-documents';
process.env.NSM_COMPLIANCE_ENABLED = 'true';
process.env.GDPR_COMPLIANCE_ENABLED = 'true';