
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Gauge, Zap, Settings, Droplets, Navigation, Shield, TrendingUp, Drill } from 'lucide-react';

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
      icon: Drill,
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
        { name: "Bit Revolutions/minute Max (BR1)", value: "131.86", unit: "RPM" },
        { name: "Bit Revolutions/minute Min (BR2)", value: "127.79", unit: "RPM" },
        { name: "Rotary Revolutions/Minutes (RRM)", value: "24.02", unit: "RPM" },
        { name: "Top Drive Rotary (TDR)", value: "27", unit: "RPM" },
        { name: "Motor RPM (MRP)", value: "107", unit: "RPM" },
        { name: "Top Drive Torque (TDT)", value: "2.952", unit: "kNm" },
        { name: "Bit Torque (BTQ)", value: "2", unit: "kNm" },
        { name: "Auto Driller Torque (ADT)", value: "4.913", unit: "kNm" },
        { name: "Convertible Torque (CVT)", value: "2.776", unit: "kNm" },
        { name: "Rotating Hours (RHS)", value: "112", unit: "hrs" },
        { name: "Torque Motor Units (TMU)", value: "12261.01", unit: "" },
        { name: "d-exponent (DEX)", value: "0.29", unit: "" },
        { name: "Depth of Cut (DOC)", value: "0.325", unit: "inch" }
      ]
    },
    {
      title: "Hydraulic and Fluid System",
      icon: Droplets,
      color: "from-blue-400 to-blue-600",
      variables: [
        { name: "Pump 1 strokes/min (P1S)", value: "59.94", unit: "SPM" },
        { name: "Pump 2 strokes/min (P2S)", value: "68.93", unit: "SPM" },
        { name: "Pump 3 strokes/min (P3S)", value: "67.1", unit: "SPM" },
        { name: "Flow in-out (FIO)", value: "72.5", unit: "L/min" },
        { name: "Standpipe Pressure (SPP)", value: "15.5", unit: "MPa" },
        { name: "Temperature out Flow (TOF)", value: "79.5107", unit: "°C" }
      ]
    },
    {
      title: "Drilling Path and String Movement",
      icon: Navigation,
      color: "from-green-400 to-green-600",
      variables: [
        { name: "AutoDriller Block Position (ADP)", value: "205.12", unit: "feet" },
        { name: "Bit Depth (BDE)", value: "215.15", unit: "feet" },
        { name: "Trip Speed (TPS)", value: "111.63", unit: "feet/min" }
      ]
    },
    {
      title: "Pressure, Load, and Structural Stability",
      icon: Shield,
      color: "from-purple-400 to-purple-600",
      variables: [
        { name: "Differential Pressure (DFP)", value: "111.63", unit: "psi" },
        { name: "Min Pressure (MPE)", value: "55.2", unit: "psi" },
        { name: "Hookload Threshold (HKT)", value: "42", unit: "klbs" },
        { name: "Hookload (HKL)", value: "89.8", unit: "klbs" },
        { name: "Over Pull (OVP)", value: "0", unit: "klbs" },
        { name: "Line Wear (LW)", value: "15%", unit: "" },
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
          Live drilling activity monitoring with real-time ML predictions
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
