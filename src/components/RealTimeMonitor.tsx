
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Gauge, Thermometer, Zap } from 'lucide-react';

export const RealTimeMonitor = () => {
  const metrics = [
    {
      label: "Rate of Penetration",
      value: "45.2 m/hr",
      status: "Optimal",
      icon: Gauge,
      color: "text-green-600"
    },
    {
      label: "Temperature",
      value: "285°C",
      status: "Normal",
      icon: Thermometer,
      color: "text-blue-600"
    },
    {
      label: "Drilling Activity",
      value: "Active",
      status: "Running",
      icon: Activity,
      color: "text-orange-600"
    },
    {
      label: "Power Consumption",
      value: "1,250 kW",
      status: "Efficient",
      icon: Zap,
      color: "text-purple-600"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Real-Time Monitoring</h2>
        <p className="text-lg text-gray-600">
          Pemantauan langsung aktivitas pengeboran dengan prediksi ML real-time
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="p-6 border-orange-100">
              <div className="flex items-center justify-between mb-4">
                <Icon className={`w-8 h-8 ${metric.color}`} />
                <Badge className="bg-green-100 text-green-700">{metric.status}</Badge>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-gray-900">{metric.value}</h3>
                <p className="text-sm text-gray-600">{metric.label}</p>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="p-8 bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-100">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Live Predictions</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-white rounded-lg">
            <span className="font-medium">Predicted ROP (Next Hour)</span>
            <span className="text-xl font-bold text-orange-600">47.8 m/hr</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-white rounded-lg">
            <span className="font-medium">Optimization Recommendation</span>
            <Badge className="bg-orange-100 text-orange-700">Increase WOB by 5%</Badge>
          </div>
          <div className="flex justify-between items-center p-4 bg-white rounded-lg">
            <span className="font-medium">Cost Savings Today</span>
            <span className="text-xl font-bold text-green-600">$12,450</span>
          </div>
        </div>
      </Card>
    </div>
  );
};
