import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Package API routes
  app.get("/api/packages/:name", async (req, res) => {
    try {
      const { name } = req.params;
      const decodedName = decodeURIComponent(name);
      const pkg = await storage.getPackage(decodedName);
      
      if (!pkg) {
        return res.status(404).json({ error: "Package not found" });
      }

      const dependencies = await storage.getPackageDependencies(pkg.id);
      const versions = await storage.getPackageVersions(pkg.id);

      res.json({
        ...pkg,
        dependencies,
        versions,
      });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/packages/:name/stats", async (req, res) => {
    try {
      const { name } = req.params;
      const decodedName = decodeURIComponent(name);
      const pkg = await storage.getPackage(decodedName);
      
      if (!pkg) {
        return res.status(404).json({ error: "Package not found" });
      }

      res.json({
        weeklyDownloads: pkg.weeklyDownloads,
        version: pkg.version,
        license: pkg.license,
        testCoverage: 85,
        size: "245 kB",
        files: 42,
      });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
