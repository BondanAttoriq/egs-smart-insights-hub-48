
import { Button } from '@/components/ui/button';
import { Play, Download } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-white border-b border-orange-100 px-8 py-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
            EGSmart 1.0
          </h1>
          <p className="text-gray-600 mt-1">
            Enhanced Geothermal Drilling Optimization powered by Multi-Model Machine Learning
          </p>
        </div>
        <div className="flex space-x-4">
          <Button variant="outline" className="border-orange-200 text-orange-600 hover:bg-orange-50">
            <Download className="w-4 h-4 mr-2" />
            Download Report
          </Button>
          <Button className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white">
            <Play className="w-4 h-4 mr-2" />
            Request Demo
          </Button>
        </div>
      </div>
    </header>
  );
};
