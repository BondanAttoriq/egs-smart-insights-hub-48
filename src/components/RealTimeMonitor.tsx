
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Gauge, Zap, Settings, Droplets, Navigation, Shield, TrendingUp, Scissors } from 'lucide-react';

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
      label: "Depth of Cut",
      value: "2.5 mm",
      status: "Normal",
      icon: Scissors,
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

  const monitoringSegments = [
    {
      title: "Cutting Power",
      icon: Settings,
      color: "from-red-400 to-red-600",
      variables: [
        { name: "Bit Revolutions/minute Max (BR1)", value: "120 RPM", unit: "RPM" },
        { name: "Bit Revolutions/minute Min (BR2)", value: "85 RPM", unit: "RPM" },
        { name: "Rotary Revolutions/Minutes (RRM)", value: "110 RPM", unit: "RPM" },
        { name: "Top Drive Rotary (TDR)", value: "105 RPM", unit: "RPM" },
        { name: "Motor RPM (MRP)", value: "450 RPM", unit: "RPM" },
        { name: "Top Drive Torque (TDT)", value: "12,500 Nm", unit: "Nm" },
        { name: "Bit Torque (BTQ)", value: "8,750 Nm", unit: "Nm" },
        { name: "Auto Driller Torque (ADT)", value: "11,200 Nm", unit: "Nm" },
        { name: "Convertible Torque (CVT)", value: "9,800 Nm", unit: "Nm" },
        { name: "Rotating Hours (RHS)", value: "24.5 hrs", unit: "hrs" },
        { name: "Torque Motor Units (TMU)", value: "85%", unit: "%" },
        { name: "d-exponent (DEX)", value: "1.85", unit: "" },
        { name: "Depth of Cut (DOC)", value: "2.5 mm", unit: "mm" }
      ]
    },
    {
      title: "Hydraulic and Fluid System",
      icon: Droplets,
      color: "from-blue-400 to-blue-600",
      variables: [
        { name: "Pump 1 strokes/min (P1S)", value: "85 SPM", unit: "SPM" },
        { name: "Pump 2 strokes/min (P2S)", value: "78 SPM", unit: "SPM" },
        { name: "Pump 3 strokes/min (P3S)", value: "82 SPM", unit: "SPM" },
        { name: "Flow in-out (FIO)", value: "1,250 L/min", unit: "L/min" },
        { name: "Standpipe Pressure (SPP)", value: "15.5 MPa", unit: "MPa" },
        { name: "Temperature out Flow (TOF)", value: "68°C", unit: "°C" }
      ]
    },
    {
      title: "Drilling Path and String Movement",
      icon: Navigation,
      color: "from-green-400 to-green-600",
      variables: [
        { name: "AutoDriller Block Position (ADP)", value: "125.5 m", unit: "m" },
        { name: "Bit Depth (BDE)", value: "2,850 m", unit: "m" },
        { name: "Trip Speed (TPS)", value: "0.45 m/s", unit: "m/s" }
      ]
    },
    {
      title: "Pressure, Load, and Structural Stability",
      icon: Shield,
      color: "from-purple-400 to-purple-600",
      variables: [
        { name: "Differential Pressure (DFP)", value: "2.8 MPa", unit: "MPa" },
        { name: "Min Pressure (MPE)", value: "8.5 MPa", unit: "MPa" },
        { name: "Hookload Threshold (HKT)", value: "450 kN", unit: "kN" },
        { name: "Hookload (HKL)", value: "385 kN", unit: "kN" },
        { name: "Over Pull (OVP)", value: "25 kN", unit: "kN" },
        { name: "Line Wear (LW)", value: "15%", unit: "%" },
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

      {/* Detailed Monitoring Segments */}
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
