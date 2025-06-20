
import { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Database, Download, Upload, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const CloudDataset = () => {
  const [totalStorage, setTotalStorage] = useState(5.0);
  const [totalRecords, setTotalRecords] = useState(895000);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const [datasets, setDatasets] = useState([
    {
      name: "EGS Historical Data",
      size: "2.3 GB",
      sizeNumber: 2.3,
      records: "450,000",
      recordsNumber: 450000,
      lastUpdated: "2 hours ago",
      status: "Active"
    },
    {
      name: "ROP Training Dataset",
      size: "1.8 GB",
      sizeNumber: 1.8,
      records: "320,000",
      recordsNumber: 320000,
      lastUpdated: "1 day ago",
      status: "Active"
    },
    {
      name: "Geothermal Parameters",
      size: "890 MB",
      sizeNumber: 0.89,
      records: "125,000",
      recordsNumber: 125000,
      lastUpdated: "3 hours ago",
      status: "Processing"
    }
  ]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.csv')) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a CSV file.",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    
    // Simulate file processing
    setTimeout(() => {
      const fileSizeGB = file.size / (1024 * 1024 * 1024);
      const estimatedRecords = Math.floor(Math.random() * 100000) + 50000;
      
      const newDataset = {
        name: file.name.replace('.csv', ''),
        size: fileSizeGB < 1 ? `${(fileSizeGB * 1024).toFixed(0)} MB` : `${fileSizeGB.toFixed(1)} GB`,
        sizeNumber: fileSizeGB,
        records: estimatedRecords.toLocaleString(),
        recordsNumber: estimatedRecords,
        lastUpdated: "Just now",
        status: "Active"
      };

      setDatasets(prev => [newDataset, ...prev]);
      setTotalStorage(prev => Number((prev + fileSizeGB).toFixed(1)));
      setTotalRecords(prev => prev + estimatedRecords);
      setIsUploading(false);
      
      toast({
        title: "Dataset Uploaded Successfully",
        description: `${file.name} has been processed and added to your cloud storage.`,
      });
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }, 3000);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Cloud Dataset Management</h2>
        <p className="text-lg text-gray-600">
          Access and manage drilling datasets stored in the cloud for further analysis
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 text-center border-orange-100">
          <Database className="w-12 h-12 text-orange-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900">{totalStorage.toFixed(1)} GB</h3>
          <p className="text-gray-600">Total Storage</p>
        </Card>
        <Card className="p-6 text-center border-orange-100">
          <Search className="w-12 h-12 text-blue-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900">{(totalRecords / 1000).toFixed(0)}K</h3>
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
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Button 
              className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white"
              onClick={handleUploadClick}
              disabled={isUploading}
            >
              <Upload className="w-4 h-4 mr-2" />
              {isUploading ? 'Uploading...' : 'Upload New Dataset'}
            </Button>
          </div>
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
