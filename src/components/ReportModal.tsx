
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportType: 'rop' | 'drilling' | 'geothermal' | null;
}

export const ReportModal = ({ isOpen, onClose, reportType }: ReportModalProps) => {
  const [showDownload, setShowDownload] = useState(false);
  const { toast } = useToast();

  const handleDownloadReport = () => {
    setShowDownload(true);
    
    toast({
      title: "Generating Report",
      description: "PDF report is being generated from Real-Time Monitor and Professional Analysis data...",
    });
    
    setTimeout(() => {
      toast({
        title: "Report Downloaded",
        description: "EGSmart_Comprehensive_Report.pdf has been downloaded successfully.",
      });
      setShowDownload(false);
      onClose();
    }, 2000);
  };

  const getReportDetails = () => {
    switch (reportType) {
      case 'rop':
        return {
          title: 'ROP Optimization Analysis Report',
          icon: TrendingUp,
          status: 'Completed',
          accuracy: '98.7%',
          color: 'text-green-600',
          findings: [
            'Current ROP: 200 ft/min (15% above industry average)',
            'Optimal WOB range: 25-30 klbs for maximum efficiency',
            'Recommended RPM: 180-200 for extended bit life',
            'Drilling fluid optimization can improve ROP by 8%'
          ],
          recommendations: [
            'Increase Weight on Bit by 8-12%',
            'Implement automated torque control',
            'Optimize mud weight for formation'
          ]
        };
      case 'drilling':
        return {
          title: 'Drilling Parameter Study Report',
          icon: AlertTriangle,
          status: 'In Progress',
          accuracy: '96.3%',
          color: 'text-orange-600',
          findings: [
            'Temperature stability maintained at 85°C',
            'Pressure differential within optimal range',
            'Bit wear rate 20% lower than expected',
            'Hydraulic system performing efficiently'
          ],
          recommendations: [
            'Continue current drilling parameters',
            'Monitor temperature trends closely',
            'Prepare for formation change at 2,500ft'
          ]
        };
      case 'geothermal':
        return {
          title: 'Geothermal Efficiency Report',
          icon: CheckCircle,
          status: 'Completed',
          accuracy: '97.9%',
          color: 'text-blue-600',
          findings: [
            'Thermal gradient: 45°C/km (excellent potential)',
            'Heat extraction rate: 2.5 MW projected',
            'Formation permeability: High in target zones',
            'Expected plant efficiency: 15-18%'
          ],
          recommendations: [
            'Proceed with enhanced stimulation',
            'Install advanced cooling systems',
            'Optimize well spacing for maximum output'
          ]
        };
      default:
        return null;
    }
  };

  const report = getReportDetails();
  if (!report) return null;

  const Icon = report.icon;

  if (showDownload) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Downloading Report</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 text-center">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center animate-pulse">
                <Download className="w-8 h-8 text-orange-600" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-900">Generating PDF Report</h3>
              <p className="text-gray-600">
                Please wait while we compile your comprehensive report with data from 
                Real-Time Monitor and Professional Analysis...
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center space-x-3">
            <Icon className={`w-8 h-8 ${report.color}`} />
            <div>
              <DialogTitle className="text-xl">{report.title}</DialogTitle>
              <div className="flex items-center space-x-2 mt-1">
                <Badge className={report.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}>
                  {report.status}
                </Badge>
                <span className="text-sm text-gray-600">Accuracy: {report.accuracy}</span>
              </div>
            </div>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          <Card className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Key Findings</h3>
            <ul className="space-y-2">
              {report.findings.map((finding, index) => (
                <li key={index} className="text-sm text-gray-700 flex items-start">
                  <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {finding}
                </li>
              ))}
            </ul>
          </Card>
          
          <Card className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Recommendations</h3>
            <ul className="space-y-2">
              {report.recommendations.map((rec, index) => (
                <li key={index} className="text-sm text-gray-700 flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  {rec}
                </li>
              ))}
            </ul>
          </Card>
          
          <div className="flex space-x-3">
            <Button 
              className="flex-1 bg-gradient-to-r from-orange-500 to-yellow-500 text-white"
              onClick={handleDownloadReport}
            >
              <Download className="w-4 h-4 mr-2" />
              Download Full Report
            </Button>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
