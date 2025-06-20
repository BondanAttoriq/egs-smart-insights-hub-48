import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Activity, Gauge, Zap, Settings, Droplets,
  Navigation, Shield, TrendingUp, Drill
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Utility
const randomInRange = (min, max, decimals = 2) =>
  Number((Math.random() * (max - min) + min).toFixed(decimals));

export const RealTimeMonitor = () => {
  const [metrics, setMetrics] = useState([
    { label: "Rate of Penetration", value: "200 feet/min", status: "Optimal", icon: Gauge, color: "text-green-600" },
    { label: "Depth of Cut", value: "20 inch", status: "Normal", icon: Drill, color: "text-blue-600" },
    { label: "Drilling Activity", value: "Active", status: "Running", icon: Activity, color: "text-orange-600" },
    { label: "Power Consumption", value: "1200 kW", status: "Efficient", icon: Zap, color: "text-purple-600" }
  ]);
  const [monitoringSegments, setMonitoringSegments] = useState([
    {
      title: "Cutting Power", icon: Settings, color: "from-red-400 to-red-600", variables: [
        { name: "Bit Revolutions/minute Max (BR1)", value: "130", unit: "RPM" }
      ]
    }
  ]);
  const [predictedROP, setPredictedROP] = useState("200 m/hr");
  const [costSaving, setCostSaving] = useState("$12,450");
  // --- CHART DATA: type number! ---
  const [chartData, setChartData] = useState(
    Array.from({ length: 10 }, (_, idx) => {
      const realROP = randomInRange(180, 220);
      const predictedROP = realROP + randomInRange(-10, 10);
      return {
        index: idx + 1,
        realROP,
        predictedROP
      };
    })
  );

  useEffect(() => {
    const updateValues = () => {
      const realROP = randomInRange(180, 220);
      const predROP = realROP + randomInRange(-10, 10);

      setMetrics([
        { label: "Rate of Penetration", value: `${realROP} feet/min`, status: "Optimal", icon: Gauge, color: "text-green-600" },
        { label: "Depth of Cut", value: `${randomInRange(15, 25)} inch`, status: "Normal", icon: Drill, color: "text-blue-600" },
        { label: "Drilling Activity", value: "Active", status: "Running", icon: Activity, color: "text-orange-600" },
        { label: "Power Consumption", value: `${randomInRange(1100, 1300, 0)} kW`, status: "Efficient", icon: Zap, color: "text-purple-600" }
      ]);
      setMonitoringSegments([
        {
          title: "Cutting Power",
          icon: Settings,
          color: "from-red-400 to-red-600",
          variables: [
            { name: "Bit Revolutions/minute Max (BR1)", value: randomInRange(120, 135), unit: "RPM" },
            { name: "Bit Revolutions/minute Min (BR2)", value: randomInRange(120, 130), unit: "RPM" },
            { name: "Rotary Revolutions/Minutes (RRM)", value: randomInRange(20, 30), unit: "RPM" },
            { name: "Top Drive Rotary (TDR)", value: randomInRange(25, 30, 0), unit: "RPM" },
            { name: "Motor RPM (MRP)", value: randomInRange(100, 110, 0), unit: "RPM" },
            { name: "Top Drive Torque (TDT)", value: randomInRange(2.5, 3.5, 3), unit: "kNm" },
            { name: "Bit Torque (BTQ)", value: randomInRange(1.5, 2.5), unit: "kNm" },
            { name: "Auto Driller Torque (ADT)", value: randomInRange(4, 5.5, 3), unit: "kNm" },
            { name: "Convertible Torque (CVT)", value: randomInRange(2.5, 3), unit: "kNm" },
            { name: "Rotating Hours (RHS)", value: randomInRange(100, 120, 0), unit: "hrs" },
            { name: "Torque Motor Units (TMU)", value: randomInRange(12000, 12500, 2), unit: "" },
            { name: "d-exponent (DEX)", value: randomInRange(0.2, 0.3), unit: "" },
            { name: "Depth of Cut (DOC)", value: randomInRange(18, 23), unit: "inch" }
          ]
        },
        {
          title: "Hydraulic and Fluid System",
          icon: Droplets,
          color: "from-blue-400 to-blue-600",
          variables: [
            { name: "Pump 1 strokes/min (P1S)", value: randomInRange(50, 70), unit: "SPM" },
            { name: "Pump 2 strokes/min (P2S)", value: randomInRange(60, 75), unit: "SPM" },
            { name: "Pump 3 strokes/min (P3S)", value: randomInRange(60, 75), unit: "SPM" },
            { name: "Flow in-out (FIO)", value: randomInRange(70, 80), unit: "L/min" },
            { name: "Standpipe Pressure (SPP)", value: randomInRange(14, 17), unit: "MPa" },
            { name: "Temperature out Flow (TOF)", value: randomInRange(75, 85), unit: "°C" }
          ]
        },
        {
          title: "Drilling Path and String Movement",
          icon: Navigation,
          color: "from-green-400 to-green-600",
          variables: [
            { name: "AutoDriller Block Position (ADP)", value: randomInRange(200, 210), unit: "feet" },
            { name: "Bit Depth (BDE)", value: randomInRange(210, 220), unit: "feet" },
            { name: "Trip Speed (TPS)", value: randomInRange(100, 120), unit: "feet/min" }
          ]
        },
        {
          title: "Pressure, Load, and Structural Stability",
          icon: Shield,
          color: "from-purple-400 to-purple-600",
          variables: [
            { name: "Differential Pressure (DFP)", value: randomInRange(100, 120), unit: "psi" },
            { name: "Min Pressure (MPE)", value: randomInRange(50, 60), unit: "psi" },
            { name: "Hookload Threshold (HKT)", value: randomInRange(40, 45), unit: "klbs" },
            { name: "Hookload (HKL)", value: randomInRange(85, 95), unit: "klbs" },
            { name: "Over Pull (OVP)", value: randomInRange(0, 1), unit: "klbs" },
            { name: "Line Wear (LW)", value: `${randomInRange(10, 20, 0)}%`, unit: "" },
            { name: "In Slip (ISP)", value: "Active", unit: "" }
          ]
        },
        {
          title: "Operational Optimization and Monitoring",
          icon: TrendingUp,
          color: "from-orange-400 to-orange-600",
          variables: [
            { name: "Drilling Advisory System - Bottom Hole Assembly Stick Slip (DAS)", value: "Normal", unit: "" }
          ]
        }
      ]);
      setPredictedROP(`${predROP} m/hr`);
      setCostSaving(`$${(randomInRange(10000, 15000, 0))}`);

      // CHART: rolling max 30 points, type number!
      setChartData(prev => {
        const next = [...prev, {
          index: prev.length ? prev[prev.length - 1].index + 1 : 1,
          realROP,
          predictedROP: predROP
        }];
        return next.length > 30 ? next.slice(next.length - 30) : next;
      });
    };

    updateValues();
    const interval = setInterval(updateValues, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-2">Real-Time Monitoring</h2>
        <p className="text-lg text-gray-600">
          Live drilling activity monitoring with real-time ML predictions
        </p>
      </div>

      {/* GRAFIK PERBANDINGAN ROP */}
      <Card className="p-8 border-orange-100">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">ROP Comparison (Current vs Predicted)</h3>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart
            data={chartData}
            margin={{ top: 16, right: 24, left: 8, bottom: 8 }}
          >
            <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />
            <XAxis dataKey="index" tick={{ fontSize: 12 }} label={{ value: "Time (sample)", position: "insideBottom", fontWeight: 700, fontSize: 14 }} />
            <YAxis tick={{ fontSize: 12 }} label={{ value: "ROP (ft/min)", angle: -90, position: "insideLeft", fontWeight: 700, fontSize: 14 }} />
            <Tooltip contentStyle={{ fontSize: 14 }} />
            <Legend verticalAlign="top" height={36} iconType="line" />
            <Line
              type="monotone"
              dataKey="realROP"
              stroke="#2563eb"
              strokeWidth={2.5}
              dot={false}
              name="Actual ROP"
            />
            <Line
              type="monotone"
              dataKey="predictedROP"
              stroke="#f59e42"
              strokeDasharray="6 4"
              strokeWidth={2.5}
              dot={false}
              name="Predicted ROP"
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* METRICS */}
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

      {/* DETAILED MONITORING SEGMENTS */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-900 text-center">Detailed System Monitoring</h3>
        {monitoringSegments.map((segment, segmentIndex) => {
          const Icon = segment.icon;
          return (
            <Card key={segmentIndex} className="p-6 border-orange-100">
              <div className="flex items-center space-x-3 mb-6">
                <div className={`w-10 h-10 bg-gradient-to-br ${segment.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900">{segment.title}</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {segment.variables.map((variable, varIndex) => (
                  <div key={varIndex} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700 flex-1 pr-2">
                        {variable.name}
                      </span>
                      <div className="text-right">
                        <span className="text-lg font-bold text-gray-900">
                          {variable.value}
                        </span>
                        {variable.unit && (
                          <span className="text-xs text-gray-500 ml-1">
                            {variable.unit}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>

      {/* LIVE PREDICTIONS */}
      <Card className="p-8 bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-100">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Live Predictions</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-white rounded-lg">
            <span className="font-medium">Predicted ROP (Next Hour)</span>
            <span className="text-xl font-bold text-orange-600">{predictedROP}</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-white rounded-lg">
            <span className="font-medium">Optimization Recommendation</span>
            <Badge className="bg-orange-100 text-orange-700">Increase WOB by 5%</Badge>
          </div>
          <div className="flex justify-between items-center p-4 bg-white rounded-lg">
            <span className="font-medium">Cost Savings Today</span>
            <span className="text-xl font-bold text-green-600">{costSaving}</span>
          </div>
        </div>
      </Card>
    </div>
  );
};
