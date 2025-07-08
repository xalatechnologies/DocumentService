# @xala/document-services

## Overview

This repository contains a comprehensive TypeScript library for document management with built-in Norwegian compliance (NSM, GDPR) and international deployment support. The project is structured as a full-stack application with a React frontend displaying package information and an Express backend serving API endpoints for document services.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Build Tool**: Vite for development and production builds
- **UI Library**: Radix UI components with Tailwind CSS styling
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for client-side routing

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Storage**: In-memory storage implementation with plans for database integration
- **API Design**: RESTful endpoints for package management

### Package Library Structure
The core document services are organized into 8 specialized services:
1. **Document Service** - Core document management with NSM/GDPR compliance
2. **Version Service** - Document versioning with audit trails
3. **Archive Service** - Long-term storage with retention policies
4. **Template Service** - Document generation with Norwegian municipal templates
5. **Conversion Service** - Format conversion with watermarking
6. **Signature Service** - Digital signatures (BankID, ID-porten, DocuSign, Adobe)
7. **Metadata Service** - Document metadata with compliance validation
8. **Compliance Service** - NSM/GDPR regulatory compliance

## Key Components

### Norwegian Compliance Features
- **NSM Classification System**: Supports PUBLIC, INTERNAL, CONFIDENTIAL, RESTRICTED security levels
- **BankID Integration**: Norwegian citizen digital signature support
- **ID-porten Support**: Government employee authentication system
- **Municipal Workflows**: Specialized handling for building permits and policy documents
- **GDPR Compliance**: Personal data detection and consent management

### International Features
- **Multi-tenant Architecture**: Secure tenant isolation for different organizations
- **Global Signature Providers**: DocuSign and Adobe Sign integration
- **Regional Compliance**: Cloud-native deployment with regional data residency

### Technical Stack
- **TypeScript**: Full type safety across frontend and backend
- **Drizzle ORM**: Type-safe database operations with PostgreSQL
- **Event-Driven Architecture**: EventEmitter-based service communication
- **File Processing**: Support for PDF, DOCX, images with format conversion
- **Security**: Checksum validation, encryption support, and audit trails

## Data Flow

1. **Document Upload**: Files are uploaded through the Document Service with compliance validation
2. **Metadata Extraction**: Automatic metadata extraction based on file type
3. **Classification**: NSM security classification assignment
4. **Storage**: Secure file storage with encryption and versioning
5. **Compliance Checking**: Automated GDPR and NSM compliance validation
6. **Audit Trail**: Complete audit logging for all document operations

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Database connectivity
- **drizzle-orm**: Database ORM and migrations
- **multer**: File upload handling
- **sharp**: Image processing
- **pdf-lib**: PDF manipulation
- **mammoth**: Word document processing

### UI Dependencies
- **@radix-ui/***: Component library for accessible UI elements
- **@tanstack/react-query**: Server state management
- **tailwindcss**: Utility-first CSS framework
- **react-hook-form**: Form validation and handling

### Development Dependencies
- **TypeScript**: Type checking and compilation
- **Jest**: Testing framework with 85% coverage requirement
- **ESLint**: Code linting with strict TypeScript rules
- **Prettier**: Code formatting

## Deployment Strategy

### Development
- Vite development server with hot module replacement
- TypeScript compilation with strict checking
- In-memory storage for rapid development

### Production
- **Frontend**: Static build served from Express server
- **Backend**: Node.js server with Express API
- **Database**: PostgreSQL with connection pooling
- **File Storage**: Configurable storage providers (local, AWS S3, Azure)
- **Monitoring**: Comprehensive logging and audit trails

### Infrastructure Requirements
- Node.js runtime environment
- PostgreSQL database
- File storage system (local or cloud)
- SSL/TLS termination for security compliance

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- July 08, 2025. Initial setup