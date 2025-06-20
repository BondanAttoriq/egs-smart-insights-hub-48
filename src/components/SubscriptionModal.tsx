
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, CreditCard, AlertCircle, CheckCircle } from 'lucide-react';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'demo' | 'trial';
}

export const SubscriptionModal = ({ isOpen, onClose, type }: SubscriptionModalProps) => {
  const [showSecondary, setShowSecondary] = useState(false);
  const [secondaryType, setSecondaryType] = useState<'credit-card' | 'implementation'>('credit-card');

  const handlePrimaryAction = () => {
    setSecondaryType('credit-card');
    setShowSecondary(true);
  };

  const handleCloseAll = () => {
    setShowSecondary(false);
    onClose();
  };

  const renderSecondaryModal = () => {
    if (secondaryType === 'credit-card') {
      return (
        <div className="space-y-6 text-center">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">Credit Card Upload Not Available</h3>
            <p className="text-gray-600">
              We apologize, but the credit card upload functionality is not currently available. 
              Please contact our sales team to complete your subscription.
            </p>
          </div>
          
          <Button 
            onClick={handleCloseAll}
            className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white"
          >
            Close
          </Button>
        </div>
      );
    }

    return (
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
    );
  };

  const renderPrimaryModal = () => {
    const isDemo = type === 'demo';
    
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {isDemo ? 'Request Professional Demo' : 'Start Your Free Trial'}
          </h3>
          <p className="text-gray-600">
            {isDemo 
              ? 'Get a personalized demonstration of EGSmart capabilities' 
              : 'Experience the full power of EGSmart with our 30-day trial'}
          </p>
        </div>

        <Card className="p-6 border-orange-100">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xl font-bold text-gray-900">Professional Plan</h4>
            <Badge className="bg-orange-100 text-orange-700">Most Popular</Badge>
          </div>
          
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">Rp 12,500,000</div>
              <div className="text-sm text-gray-600">per month</div>
            </div>
            
            <ul className="space-y-2">
              {[
                'Real-time drilling optimization',
                'Advanced ML predictions',
                'Professional analysis reports',
                'Expert recommendations',
                'Cloud dataset management',
                '24/7 technical support'
              ].map((feature, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        <div className="flex space-x-3">
          <Button 
            className="flex-1 bg-gradient-to-r from-orange-500 to-yellow-500 text-white"
            onClick={handlePrimaryAction}
          >
            <CreditCard className="w-4 h-4 mr-2" />
            {isDemo ? 'Request Demo' : 'Start Free Trial'}
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {showSecondary 
              ? (secondaryType === 'credit-card' ? 'Payment Method' : 'Implementation Status')
              : (type === 'demo' ? 'Request Demo' : 'Free Trial')
            }
          </DialogTitle>
        </DialogHeader>
        
        {showSecondary ? renderSecondaryModal() : renderPrimaryModal()}
      </DialogContent>
    </Dialog>
  );
};
