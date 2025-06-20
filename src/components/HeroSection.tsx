import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Play, Zap, TrendingUp, Shield } from 'lucide-react';
import { SubscriptionModal } from './SubscriptionModal';
import { DemoVideoModal } from './DemoVideoModal';

export const HeroSection = () => {
  const [showTrialModal, setShowTrialModal] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);

  return (
    <>
      <section className="text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-gray-900 leading-tight">
            Revolutionize Your{' '}
            <span className="bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
              Geothermal Drilling
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Advanced machine learning algorithms optimize drilling parameters in real-time, 
            reducing costs by up to 35% while maximizing Rate of Penetration (ROP) efficiency.
          </p>
        </div>

        <div className="flex justify-center space-x-6">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-8 py-4 text-lg"
            onClick={() => setShowTrialModal(true)}
          >
            <Play className="w-5 h-5 mr-2" />
            Start Free Trial
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-orange-200 text-orange-600 hover:bg-orange-50 px-8 py-4 text-lg"
            onClick={() => setShowDemoModal(true)}
          >
            Watch Demo
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <Card className="p-8 text-center border-orange-100 hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Real-Time Optimization</h3>
            <p className="text-gray-600">
              AI-powered algorithms continuously analyze drilling parameters and provide instant recommendations 
              for optimal performance.
            </p>
          </Card>

          <Card className="p-8 text-center border-orange-100 hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Predictive Analytics</h3>
            <p className="text-gray-600">
              Advanced machine learning models predict drilling outcomes and identify potential issues 
              before they impact operations.
            </p>
          </Card>

          <Card className="p-8 text-center border-orange-100 hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Risk Mitigation</h3>
            <p className="text-gray-600">
              Comprehensive monitoring and early warning systems help prevent equipment failures 
              and costly downtime.
            </p>
          </Card>
        </div>
      </section>

      <SubscriptionModal
        isOpen={showTrialModal}
        onClose={() => setShowTrialModal(false)}
        type="trial"
      />

      <DemoVideoModal
        isOpen={showDemoModal}
        onClose={() => setShowDemoModal(false)}
      />
    </>
  );
};
