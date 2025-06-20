
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { TrendingUp, Zap, DollarSign, Target } from 'lucide-react';

export const HeroSection = () => {
  const features = [
    {
      icon: Target,
      title: "Prediksi Akurat",
      description: "Model Extra Trees Regressor dengan akurasi R² = 0.9977 untuk prediksi Rate of Penetration (ROP) yang presisi."
    },
    {
      icon: Zap,
      title: "Optimasi Real-Time",
      description: "Monitoring dan optimasi parameter pengeboran secara langsung untuk efisiensi maksimal."
    },
    {
      icon: DollarSign,
      title: "Penghematan Biaya",
      description: "Reduksi biaya operasional hingga 30% melalui optimasi berbasis data dan machine learning."
    },
    {
      icon: TrendingUp,
      title: "Validasi Ilmiah",
      description: "Teknologi yang telah divalidasi melalui penelitian ilmiah dengan metrik performa terdepan."
    }
  ];

  return (
    <div className="space-y-12">
      <div className="text-center max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          Revolusi Teknologi Pengeboran Geothermal
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Platform berbasis multi-model machine learning yang mengoptimalkan Enhanced Geothermal Systems (EGS) 
          dengan prediksi Rate of Penetration (ROP) paling akurat di industri.
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
