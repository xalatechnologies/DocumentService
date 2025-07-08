import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/header";
import PackageHeader from "@/components/package-header";
import QuickInstall from "@/components/quick-install";
import ContentTabs from "@/components/content-tabs";
import { Card, CardContent } from "@/components/ui/card";

export default function PackagePage() {
  const params = useParams();
  const packageName = params.name || "@xala-technologies/document-services";

  const { data: packageData, isLoading, error } = useQuery({
    queryKey: [`/api/packages/${encodeURIComponent(packageName)}`],
  });

  const { data: statsData } = useQuery({
    queryKey: [`/api/packages/${encodeURIComponent(packageName)}/stats`],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-48 bg-gray-200 rounded-lg mb-6"></div>
            <div className="h-32 bg-gray-200 rounded-lg mb-6"></div>
            <div className="h-96 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !packageData) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card>
            <CardContent className="pt-6 text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Package Not Found</h1>
              <p className="text-gray-600">The package "{packageName}" could not be found.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PackageHeader packageData={packageData} statsData={statsData} />
        <QuickInstall packageName={packageData.name} />
        <ContentTabs packageData={packageData} />
        
        <div className="mt-8 grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Development Status</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Test Coverage</span>
                      <span className="text-sm font-semibold text-green-600">{statsData?.testCoverage || 85}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${statsData?.testCoverage || 85}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Documentation</span>
                      <span className="text-sm font-semibold text-blue-600">Complete</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: "100%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Package Info</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Version</span>
                    <span className="font-mono">{packageData.version}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">License</span>
                    <span>{packageData.license}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Size</span>
                    <span>{statsData?.size || "245 kB"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Files</span>
                    <span>{statsData?.files || 42}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Maintainers</h4>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
                  <span className="text-sm">{packageData.author}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Links</h4>
                <div className="space-y-2">
                  <a href="#" className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700">
                    <i className="fab fa-github"></i>
                    <span>Repository</span>
                  </a>
                  <a href="#" className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700">
                    <i className="fas fa-home"></i>
                    <span>Homepage</span>
                  </a>
                  <a href="#" className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700">
                    <i className="fas fa-bug"></i>
                    <span>Issues</span>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
