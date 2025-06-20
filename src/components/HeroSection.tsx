import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { TrendingUp, Zap, DollarSign, Target } from 'lucide-react';

export const HeroSection = () => {
  const features = [
    {
      icon: Target,
      title: "Accurate Predictions",
      description: "Extra Trees Regressor model with an accuracy of R² = 0.9977 for precise Rate of Penetration (ROP) predictions."
    },
    {
      icon: Zap,
      title: "Real-Time Optimization",
      description: "Direct monitoring and optimization of drilling parameters for maximum efficiency."
    },
    {
      icon: DollarSign,
      title: "Cost Savings",
      description: "Reduce operational costs by up to 30% through data-driven optimization and machine learning."
    },
    {
      icon: TrendingUp,
      title: "Scientifically Validated",
      description: "Technology validated through scientific research, boasting leading performance metrics."
    }
  ];

  return (
    <div className="space-y-12">
      <div className="text-center max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          EGS Drilling Technological Revolution
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          A multi-model machine learning platform that optimizes Enhanced Geothermal Systems (EGS) with industry-leading accuracy in Rate of Penetration (ROP) predictions.
        </p>
        <div className="flex justify-center space-x-4">
          <Button size="lg" className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-8">
            Start Trial
          </Button>
          <Button size="lg" variant="outline" className="border-orange-200 text-orange-600 hover:bg-orange-50 px-8">
            Request Demo
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card key={index} className="p-6 border-orange-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-lg flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
