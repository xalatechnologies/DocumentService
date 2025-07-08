import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface QuickInstallProps {
  packageName: string;
}

export default function QuickInstall({ packageName }: QuickInstallProps) {
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Installation command copied successfully",
    });
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Install</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">npm</span>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-xs text-blue-600 hover:text-blue-700"
                onClick={() => copyToClipboard(`npm install ${packageName}`)}
              >
                <i className="fas fa-copy mr-1"></i> Copy
              </Button>
            </div>
            <div className="bg-gray-900 rounded-md p-3">
              <code className="text-green-400 text-sm font-mono">
                npm install {packageName}
              </code>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">yarn</span>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-xs text-blue-600 hover:text-blue-700"
                onClick={() => copyToClipboard(`yarn add ${packageName}`)}
              >
                <i className="fas fa-copy mr-1"></i> Copy
              </Button>
            </div>
            <div className="bg-gray-900 rounded-md p-3">
              <code className="text-green-400 text-sm font-mono">
                yarn add {packageName}
              </code>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
