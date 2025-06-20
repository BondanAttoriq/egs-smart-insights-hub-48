
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Crown, TrendingUp, BarChart } from 'lucide-react';

export const AlgorithmComparison = () => {
  const algorithms = [
    {
      name: "Extra Trees Regressor",
      accuracy: "R² = 0.9977",
      performance: "Superior",
      icon: Crown,
      description: "Model terpilih dengan performa terbaik",
      color: "from-orange-500 to-yellow-500",
      isTop: true
    },
    {
      name: "LSTM Neural Network",
      accuracy: "R² = 0.9234",
      performance: "Good",
      icon: TrendingUp,
      description: "Deep learning untuk pattern temporal",
      color: "from-blue-400 to-blue-600",
      isTop: false
    },
    {
      name: "LightGBM",
      accuracy: "R² = 0.8876",
      performance: "Moderate",
      icon: BarChart,
      description: "Gradient boosting framework",
      color: "from-green-400 to-green-600",
      isTop: false
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Keunggulan Algoritma Machine Learning
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Perbandingan performa model machine learning yang telah divalidasi untuk optimasi pengeboran EGS
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {algorithms.map((algo, index) => {
          const Icon = algo.icon;
          return (
            <Card key={index} className={`p-6 relative ${algo.isTop ? 'ring-2 ring-orange-200 shadow-xl' : 'shadow-md'} hover:shadow-lg transition-shadow`}>
              {algo.isTop && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
                  Terpilih
                </Badge>
              )}
              <div className={`w-12 h-12 bg-gradient-to-br ${algo.color} rounded-lg flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{algo.name}</h3>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Akurasi:</span>
                  <span className="font-semibold text-gray-900">{algo.accuracy}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Performance:</span>
                  <Badge variant={algo.isTop ? "default" : "secondary"} className={algo.isTop ? "bg-orange-100 text-orange-700" : ""}>
                    {algo.performance}
                  </Badge>
                </div>
              </div>
              <p className="text-sm text-gray-600">{algo.description}</p>
            </Card>
          );
        })}
      </div>

      <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-8 border border-orange-100">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Validasi Ilmiah</h3>
          <p className="text-lg text-gray-700 mb-6">
            Model Extra Trees Regressor dipilih berdasarkan evaluasi komprehensif dengan metrik:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">R² = 0.9977</div>
              <div className="text-sm text-gray-600">Coefficient of Determination</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">< 2.5%</div>
              <div className="text-sm text-gray-600">Mean Absolute Error</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">98.8%</div>
              <div className="text-sm text-gray-600">Prediction Accuracy</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
