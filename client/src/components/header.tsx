import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <i className="fas fa-cube text-blue-600 text-xl"></i>
              <span className="text-xl font-bold text-gray-900">NPM Registry</span>
            </div>
            <div className="hidden md:block text-sm text-gray-600">Package Manager</div>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">Packages</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">Documentation</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">Community</a>
          </nav>

          <div className="flex items-center space-x-4">
            <Button className="hidden md:flex items-center space-x-2">
              <i className="fas fa-plus text-sm"></i>
              <span>Publish</span>
            </Button>
            <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
          </div>
        </div>
      </div>
    </header>
  );
}
