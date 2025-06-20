
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check, Star } from 'lucide-react';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'demo' | 'trial';
}

export const SubscriptionModal = ({ isOpen, onClose, type }: SubscriptionModalProps) => {
  const title = type === 'demo' ? 'Request Demo' : 'Start Free Trial';
  const description = type === 'demo' 
    ? 'Get a personalized demo of EGSmart 1.0 and see how it can optimize your drilling operations.'
    : 'Start your 14-day free trial and experience the power of AI-driven drilling optimization.';

  const features = [
    'Real-time drilling monitoring',
    'AI-powered ROP predictions',
    'Professional analysis reports',
    'Cloud dataset management',
    'Expert recommendations',
    '24/7 technical support'
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">{title}</DialogTitle>
          <DialogDescription className="text-center">
            {description}
          </DialogDescription>
        </DialogHeader>
        
        <Card className="p-6 border-orange-100">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center mb-2">
              <Star className="w-6 h-6 text-yellow-500 fill-current" />
              <span className="text-3xl font-bold text-gray-900 ml-2">Rp 12.5 juta</span>
            </div>
            <p className="text-gray-600">per bulan</p>
            {type === 'trial' && (
              <p className="text-sm text-green-600 font-medium mt-1">14 hari gratis pertama</p>
            )}
          </div>
          
          <div className="space-y-3 mb-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-green-500" />
                <span className="text-sm text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
          
          <div className="space-y-3">
            <Button className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white">
              {type === 'demo' ? 'Schedule Demo' : 'Start Free Trial'}
            </Button>
            <Button variant="outline" onClick={onClose} className="w-full">
              Cancel
            </Button>
          </div>
        </Card>
      </DialogContent>
    </Dialog>
  );
};
