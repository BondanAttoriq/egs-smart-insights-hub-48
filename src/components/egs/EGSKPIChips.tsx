import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Well } from '@/pages/EGSAnalysis';

interface EGSKPIChipsProps {
  wells: Well[];
}

export const EGSKPIChips: React.FC<EGSKPIChipsProps> = ({ wells }) => {
  const offsetsFound = wells.length;
  const avgTemp = wells.length > 0 ? 
    Math.round(wells.reduce((sum, well) => sum + well.reservoir_temp_C, 0) / wells.length) : 0;
  const avgDepth = wells.length > 0 ? 
    Math.round(wells.reduce((sum, well) => sum + well.true_vertical_depth_m, 0) / wells.length) : 0;

  const kpis = [
    {
      label: 'Offsets Found',
      value: offsetsFound.toString(),
      unit: 'wells',
      color: 'text-[hsl(29,100%,50%)]',
      bgColor: 'bg-[hsl(29,100%,50%,0.1)]',
    },
    {
      label: 'Avg Temperature',
      value: avgTemp.toString(),
      unit: '°C',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      label: 'Avg Depth',
      value: avgDepth.toLocaleString(),
      unit: 'm',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      label: 'Active Wells',
      value: wells.filter(w => w.status === 'Active').length.toString(),
      unit: 'wells',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi, index) => (
        <Card key={index} className={`${kpi.bgColor} border-0`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{kpi.label}</p>
                <div className="flex items-baseline space-x-1">
                  <p className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</p>
                  <p className="text-sm text-gray-500">{kpi.unit}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};