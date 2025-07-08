import { packages, type Package, type InsertPackage, packageDependencies, packageVersions } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<any | undefined>;
  getUserByUsername(username: string): Promise<any | undefined>;
  createUser(user: any): Promise<any>;
  getPackage(name: string): Promise<Package | undefined>;
  createPackage(pkg: InsertPackage): Promise<Package>;
  getPackageDependencies(packageId: number): Promise<any[]>;
  getPackageVersions(packageId: number): Promise<any[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, any>;
  private packages: Map<string, Package>;
  private dependencies: Map<number, any[]>;
  private versions: Map<number, any[]>;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.packages = new Map();
    this.dependencies = new Map();
    this.versions = new Map();
    this.currentId = 1;
    
    // Initialize with @xala/document-services package
    this.initializeDocumentServicesPackage();
  }

  private initializeDocumentServicesPackage() {
    const pkg: Package = {
      id: 1,
      name: "@xala/document-services",
      version: "1.0.0",
      description: "Comprehensive document management services for Norwegian compliance and international deployment",
      author: "Xala Technologies",
      license: "MIT",
      keywords: ["document-management", "norwegian-compliance", "nsm", "gdpr", "archiving", "version-control"],
      weeklyDownloads: 2300,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    this.packages.set(pkg.name, pkg);
    
    // Add dependencies
    this.dependencies.set(1, [
      { name: "@xala/foundation", version: "^1.0.0", type: "dependencies" },
      { name: "multer", version: "^1.4.5-lts.1", type: "dependencies" },
      { name: "sharp", version: "^0.32.6", type: "dependencies" },
      { name: "pdf-lib", version: "^1.17.1", type: "dependencies" },
      { name: "mammoth", version: "^1.6.0", type: "dependencies" },
      { name: "typescript", version: "^5.0.0", type: "devDependencies" },
      { name: "jest", version: "^29.5.0", type: "devDependencies" },
    ]);
    
    // Add versions
    this.versions.set(1, [
      { version: "1.0.0", publishedAt: new Date(), changelog: "Initial release with full Norwegian compliance support" },
      { version: "0.9.0", publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), changelog: "Beta release with core services" },
    ]);
  }

  async getUser(id: number): Promise<any | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<any | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: any): Promise<any> {
    const id = this.currentId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getPackage(name: string): Promise<Package | undefined> {
    return this.packages.get(name);
  }

  async createPackage(insertPackage: InsertPackage): Promise<Package> {
    const id = this.currentId++;
    const pkg: Package = {
      ...insertPackage,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.packages.set(pkg.name, pkg);
    return pkg;
  }

  async getPackageDependencies(packageId: number): Promise<any[]> {
    return this.dependencies.get(packageId) || [];
  }

  async getPackageVersions(packageId: number): Promise<any[]> {
    return this.versions.get(packageId) || [];
  }
}

export const storage = new MemStorage();
