import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PackageHeaderProps {
  packageData: any;
  statsData: any;
}

export default function PackageHeader({ packageData, statsData }: PackageHeaderProps) {
  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-4">
              <i className="fas fa-file-alt text-3xl text-blue-600"></i>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{packageData.name}</h1>
                <p className="text-gray-600">{packageData.description}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 mb-4">
              <Badge variant="default" className="bg-green-600 hover:bg-green-700">
                <i className="fas fa-check-circle mr-1"></i>
                Latest: {packageData.version}
              </Badge>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                <i className="fas fa-shield-alt mr-1"></i>
                NSM Compliant
              </Badge>
              <Badge variant="secondary" className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                <i className="fas fa-globe mr-1"></i>
                GDPR Ready
              </Badge>
              <Badge variant="secondary" className="bg-orange-100 text-orange-800 hover:bg-orange-200">
                <i className="fas fa-flag mr-1"></i>
                Norwegian
              </Badge>
            </div>

            <div className="flex flex-wrap gap-2">
              {packageData.keywords?.map((keyword: string, index: number) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded border"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 lg:mt-0 lg:ml-8 flex-shrink-0">
            <div className="bg-gray-50 rounded-lg p-4 w-full lg:w-64">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {(packageData.weeklyDownloads / 1000).toFixed(1)}k
                  </div>
                  <div className="text-xs text-gray-600">Weekly downloads</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{packageData.version}</div>
                  <div className="text-xs text-gray-600">Version</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{packageData.license}</div>
                  <div className="text-xs text-gray-600">License</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{statsData?.testCoverage || 85}%</div>
                  <div className="text-xs text-gray-600">Test coverage</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
