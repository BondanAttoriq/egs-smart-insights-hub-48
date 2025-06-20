
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Settings, Clock, DollarSign, CheckCircle } from 'lucide-react';

interface ImplementModalProps {
  isOpen: boolean;
  onClose: () => void;
  recommendation: {
    priority: string;
    title: string;
    description: string;
    impact: string;
  } | null;
}

export const ImplementModal = ({ isOpen, onClose, recommendation }: ImplementModalProps) => {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleImplement = () => {
    setShowSuccess(true);
  };

  const handleCloseAll = () => {
    setShowSuccess(false);
    onClose();
  };

  if (!recommendation) return null;

  const getImplementationDetails = () => {
    switch (recommendation.title) {
      case 'Optimize Weight on Bit (WOB)':
        return {
          steps: [
            'Gradually increase WOB from current 22 klbs to 25-27 klbs',
            'Monitor ROP response and bit condition continuously',
            'Adjust drilling fluid properties to support higher WOB',
            'Implement automated WOB control system'
          ],
          timeframe: '2-4 hours',
          cost: '$2,500',
          riskLevel: 'Low'
        };
      case 'Adjust Rotation Speed':
        return {
          steps: [
            'Reduce current RPM from 220 to 180-200 range',
            'Monitor torque and drilling efficiency',
            'Adjust mud flow rate to compensate',
            'Track bit wear indicators'
          ],
          timeframe: '30 minutes',
          cost: '$500',
          riskLevel: 'Very Low'
        };
      case 'Temperature Monitoring':
        return {
          steps: [
            'Install additional temperature sensors',
            'Implement advanced cooling circulation',
            'Set up automated temperature alerts',
            'Optimize mud cooling system'
          ],
          timeframe: '6-8 hours',
          cost: '$8,000',
          riskLevel: 'Medium'
        };
      default:
        return {
          steps: ['Implementation steps will be provided'],
          timeframe: 'TBD',
          cost: 'TBD',
          riskLevel: 'Low'
        };
    }
  };

  const details = getImplementationDetails();

  if (showSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Implementation Status</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 text-center">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-900">Implementation Successful</h3>
              <p className="text-gray-600">
                The implementation has been successfully completed on the EGS system. 
                All changes are now active and monitoring.
              </p>
            </div>
            
            <Button 
              onClick={handleCloseAll}
              className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Settings className="w-5 h-5 text-orange-600" />
            <span>Implement Recommendation</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <Card className="p-4 border-orange-100">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-900">{recommendation.title}</h3>
              <Badge className={
                recommendation.priority === 'High' ? 'bg-red-100 text-red-700' :
                recommendation.priority === 'Medium' ? 'bg-orange-100 text-orange-700' :
                'bg-green-100 text-green-700'
              }>
                {recommendation.priority} Priority
              </Badge>
            </div>
            <p className="text-sm text-gray-600">{recommendation.description}</p>
            <p className="text-sm font-medium text-green-600 mt-2">{recommendation.impact}</p>
          </Card>
          
          <Card className="p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Implementation Plan</h4>
            <div className="space-y-3">
              {details.steps.map((step, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <span className="w-5 h-5 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-medium mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-sm text-gray-700">{step}</span>
                </div>
              ))}
            </div>
          </Card>
          
          <div className="grid grid-cols-3 gap-3">
            <Card className="p-3 text-center">
              <Clock className="w-4 h-4 text-blue-500 mx-auto mb-1" />
              <div className="text-xs text-gray-600">Duration</div>
              <div className="text-sm font-semibold">{details.timeframe}</div>
            </Card>
            <Card className="p-3 text-center">
              <DollarSign className="w-4 h-4 text-green-500 mx-auto mb-1" />
              <div className="text-xs text-gray-600">Cost</div>
              <div className="text-sm font-semibold">{details.cost}</div>
            </Card>
            <Card className="p-3 text-center">
              <CheckCircle className="w-4 h-4 text-orange-500 mx-auto mb-1" />
              <div className="text-xs text-gray-600">Risk Level</div>
              <div className="text-sm font-semibold">{details.riskLevel}</div>
            </Card>
          </div>
          
          <div className="flex space-x-3">
            <Button 
              className="flex-1 bg-gradient-to-r from-orange-500 to-yellow-500 text-white"
              onClick={handleImplement}
            >
              Start Implementation
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
