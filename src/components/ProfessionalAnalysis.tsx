
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, AlertTriangle, CheckCircle, FileText } from 'lucide-react';

export const ProfessionalAnalysis = () => {
  const analyses = [
    {
      title: "ROP Optimization Analysis",
      status: "Completed",
      accuracy: "98.7%",
      recommendations: 3,
      savings: "$45,200",
      icon: TrendingUp,
      color: "text-green-600"
    },
    {
      title: "Drilling Parameter Study",
      status: "In Progress",
      accuracy: "96.3%",
      recommendations: 2,
      savings: "$28,900",
      icon: AlertTriangle,
      color: "text-orange-600"
    },
    {
      title: "Geothermal Efficiency Report",
      status: "Completed",
      accuracy: "97.9%",
      recommendations: 5,
      savings: "$67,100",
      icon: CheckCircle,
      color: "text-blue-600"
    }
  ];

  const recommendations = [
    {
      priority: "High",
      title: "Optimize Weight on Bit (WOB)",
      description: "Increase WOB by 8-12% untuk meningkatkan ROP hingga 15%",
      impact: "Cost Savings: $15,000/day"
    },
    {
      priority: "Medium",
      title: "Adjust Rotation Speed",
      description: "Reduce RPM to 180-200 untuk mengurangi wear pada drill bit",
      impact: "Extended Equipment Life: +25%"
    },
    {
      priority: "Low",
      title: "Temperature Monitoring",
      description: "Implement advanced cooling system untuk stabilitas thermal",
      impact: "Efficiency Gain: +8%"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Professional Analysis</h2>
        <p className="text-lg text-gray-600">
          Hasil analisis machine learning dan rekomendasi praktis dari para ahli
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {analyses.map((analysis, index) => {
          const Icon = analysis.icon;
          return (
            <Card key={index} className="p-6 border-orange-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <Icon className={`w-8 h-8 ${analysis.color}`} />
                <Badge className={analysis.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}>
                  {analysis.status}
                </Badge>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">{analysis.title}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Accuracy:</span>
                  <span className="font-semibold">{analysis.accuracy}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Recommendations:</span>
                  <span className="font-semibold">{analysis.recommendations}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Projected Savings:</span>
                  <span className="font-semibold text-green-600">{analysis.savings}</span>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4 border-orange-200 text-orange-600 hover:bg-orange-50">
                <FileText className="w-4 h-4 mr-2" />
                View Report
              </Button>
            </Card>
          );
        })}
      </div>

      <Card className="p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Expert Recommendations</h3>
        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <div key={index} className="border border-orange-100 rounded-lg p-6 hover:bg-orange-50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <Badge className={
                    rec.priority === 'High' ? 'bg-red-100 text-red-700' :
                    rec.priority === 'Medium' ? 'bg-orange-100 text-orange-700' :
                    'bg-green-100 text-green-700'
                  }>
                    {rec.priority} Priority
                  </Badge>
                  <h4 className="text-lg font-semibold text-gray-900">{rec.title}</h4>
                </div>
                <Button size="sm" className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
                  Implement
                </Button>
              </div>
              <p className="text-gray-600 mb-2">{rec.description}</p>
              <p className="text-sm font-medium text-green-600">{rec.impact}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-8 bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-100">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Extra Trees Regressor Performance</h3>
          <p className="text-lg text-gray-600 mb-6">
            Model terpilih menunjukkan performa superior dengan validasi ilmiah
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">R² = 0.9977</div>
              <div className="text-sm text-gray-600">Coefficient of Determination</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">2.1%</div>
              <div className="text-sm text-gray-600">Mean Absolute Error</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">0.85 ms</div>
              <div className="text-sm text-gray-600">Prediction Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">ITB</div>
              <div className="text-sm text-gray-600">Research Validated</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
