
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Database, Download, Upload, Search } from 'lucide-react';

export const CloudDataset = () => {
  const datasets = [
    {
      name: "EGS Historical Data",
      size: "2.3 GB",
      records: "450,000",
      lastUpdated: "2 hours ago",
      status: "Active"
    },
    {
      name: "ROP Training Dataset",
      size: "1.8 GB",
      records: "320,000",
      lastUpdated: "1 day ago",
      status: "Active"
    },
    {
      name: "Geothermal Parameters",
      size: "890 MB",
      records: "125,000",
      lastUpdated: "3 hours ago",
      status: "Processing"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Cloud Dataset Management</h2>
        <p className="text-lg text-gray-600">
          Akses dan kelola dataset pengeboran tersimpan di cloud untuk analisis lanjutan
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 text-center border-orange-100">
          <Database className="w-12 h-12 text-orange-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900">5.0 GB</h3>
          <p className="text-gray-600">Total Storage</p>
        </Card>
        <Card className="p-6 text-center border-orange-100">
          <Search className="w-12 h-12 text-blue-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900">895K</h3>
          <p className="text-gray-600">Total Records</p>
        </Card>
        <Card className="p-6 text-center border-orange-100">
          <Upload className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900">24/7</h3>
          <p className="text-gray-600">Data Sync</p>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">Available Datasets</h3>
          <Button className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
            <Upload className="w-4 h-4 mr-2" />
            Upload New Dataset
          </Button>
        </div>
        
        <div className="space-y-4">
          {datasets.map((dataset, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-orange-100 rounded-lg hover:bg-orange-50 transition-colors">
              <div className="flex items-center space-x-4">
                <Database className="w-8 h-8 text-orange-500" />
                <div>
                  <h4 className="font-semibold text-gray-900">{dataset.name}</h4>
                  <p className="text-sm text-gray-600">
                    {dataset.records} records • {dataset.size} • Updated {dataset.lastUpdated}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Badge className={dataset.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}>
                  {dataset.status}
                </Badge>
                <Button variant="outline" size="sm" className="border-orange-200 text-orange-600">
                  <Download className="w-4 h-4 mr-1" />
                  Export
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
