import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ContentTabsProps {
  packageData: any;
}

export default function ContentTabs({ packageData }: ContentTabsProps) {
  const [activeTab, setActiveTab] = useState("readme");

  const services = [
    {
      name: "Document Service",
      description: "Core document management with NSM/GDPR compliance, file upload, storage, and retrieval.",
      tags: ["Upload", "Search", "NSM"],
      color: "blue"
    },
    {
      name: "Version Service", 
      description: "Document versioning with audit trails and rollback capabilities.",
      tags: ["Versioning", "Audit", "History"],
      color: "green"
    },
    {
      name: "Signature Service",
      description: "Digital signatures with BankID, ID-porten, DocuSign, and Adobe Sign.",
      tags: ["BankID", "DocuSign", "Adobe"],
      color: "purple"
    },
    {
      name: "Archive Service",
      description: "Long-term storage with retention policies and compliance archiving.",
      tags: ["Retention", "Compression", "Encryption"],
      color: "orange"
    }
  ];

  const tabs = [
    { id: "readme", label: "README", icon: "fas fa-file-alt" },
    { id: "code", label: "Code", icon: "fas fa-code" },
    { id: "dependencies", label: "Dependencies", icon: "fas fa-project-diagram" },
    { id: "versions", label: "Versions", icon: "fas fa-history" },
    { id: "security", label: "Security", icon: "fas fa-shield-alt" }
  ];

  return (
    <Card>
      <div className="border-b border-gray-200 px-6">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant="ghost"
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <i className={`${tab.icon} mr-2`}></i>
              {tab.label}
            </Button>
          ))}
        </nav>
      </div>

      <CardContent className="p-6">
        {activeTab === "readme" && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Document Services Package</h2>
              <p className="text-gray-600 mb-4">
                A comprehensive TypeScript library for document management with built-in Norwegian compliance (NSM, GDPR) 
                and international deployment support. Features multi-tenant architecture, digital signatures, and enterprise-grade security.
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <i className="fas fa-flag text-red-500 mr-2"></i>
                    <h3 className="font-semibold text-gray-900">Norwegian Compliance</h3>
                  </div>
                  <p className="text-sm text-gray-600">NSM classification, BankID integration, ID-porten support</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <i className="fas fa-signature text-blue-500 mr-2"></i>
                    <h3 className="font-semibold text-gray-900">Digital Signatures</h3>
                  </div>
                  <p className="text-sm text-gray-600">BankID, DocuSign, Adobe Sign integration</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <i className="fas fa-globe text-green-500 mr-2"></i>
                    <h3 className="font-semibold text-gray-900">Multi-tenant</h3>
                  </div>
                  <p className="text-sm text-gray-600">Secure tenant isolation and international deployment</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Start</h3>
              <div className="bg-gray-900 rounded-lg p-4 mb-4">
                <pre className="text-sm overflow-x-auto">
                  <code className="text-gray-300">
{`import { DocumentService, SignatureService } from '@xala-technologies/document-services';

// Initialize with Norwegian compliance
const documentService = new DocumentService({
  storage: { provider: 'aws', encryption: true },
  compliance: { nsm: true, gdpr: true }
});

// Upload document with NSM classification
const document = await documentService.uploadDocument(file, {
  classification: 'INTERNAL',
  tenantId: 'oslo-municipality'
});`}
                  </code>
                </pre>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Available Services</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {services.map((service, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">{service.name}</h4>
                    <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {service.tags.map((tag, tagIndex) => (
                        <span 
                          key={tagIndex}
                          className={`px-2 py-1 text-xs rounded ${
                            service.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                            service.color === 'green' ? 'bg-green-100 text-green-800' :
                            service.color === 'purple' ? 'bg-purple-100 text-purple-800' :
                            'bg-orange-100 text-orange-800'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "dependencies" && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Dependencies</h3>
            <div className="space-y-4">
              {packageData.dependencies?.map((dep: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <span className="font-medium">{dep.name}</span>
                    <span className="text-sm text-gray-600 ml-2">{dep.version}</span>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded ${
                    dep.type === 'dependencies' ? 'bg-green-100 text-green-800' :
                    dep.type === 'devDependencies' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {dep.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "versions" && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Version History</h3>
            <div className="space-y-4">
              {packageData.versions?.map((version: any, index: number) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-lg">{version.version}</span>
                    <span className="text-sm text-gray-600">
                      {new Date(version.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-600">{version.changelog}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
