import React, { useState } from 'react';
import { EGSHeader } from '@/components/egs/EGSHeader';
import { EGSSidebar } from '@/components/egs/EGSSidebar';
import { EGSMapPanel } from '@/components/egs/EGSMapPanel';
import { EGSControlPanel } from '@/components/egs/EGSControlPanel';
import { EGSDataTable } from '@/components/egs/EGSDataTable';
import { EGSKPIChips } from '@/components/egs/EGSKPIChips';
import { useToast } from '@/hooks/use-toast';
import wellsData from '@/data/wells.json';

export interface Well {
  id: string;
  field: string;
  well_name: string;
  type: 'Production' | 'Injection' | 'Monitoring';
  status: 'Active' | 'Shut-in' | 'Planned';
  lat: number;
  lng: number;
  spud_date: string;
  true_vertical_depth_m: number;
  measured_depth_m: number;
  reservoir_temp_C: number;
  bottomhole_pressure_MPa: number;
  casing_OD_in: number;
  casing_weight_lbft: number;
  cement_top_m: number;
  formation: string;
  permeability_mD: number;
  porosity_pct: number;
  remarks: string;
  distance_km?: number;
}

const EGSAnalysis = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('offset-analysis');
  const [selectedWell, setSelectedWell] = useState<string>('EGS-04');
  const [mapLayer, setMapLayer] = useState<'satellite' | 'geology' | 'formation'>('satellite');
  const [wells, setWells] = useState<Well[]>(wellsData as Well[]);
  const [filteredWells, setFilteredWells] = useState<Well[]>(wellsData as Well[]);
  const [analysisRadius, setAnalysisRadius] = useState(25);
  const [showRadius, setShowRadius] = useState(false);
  const [showFaults, setShowFaults] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const { toast } = useToast();

  const handleAnalyzeOffsets = () => {
    const plannedWell = wells.find(w => w.id === selectedWell);
    if (!plannedWell) return;

    // Calculate distances using Haversine formula
    const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
      const R = 6371; // Earth's radius in km
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLon/2) * Math.sin(dLon/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      return R * c;
    };

    const updatedWells = wells.map(well => ({
      ...well,
      distance_km: well.id === selectedWell ? 0 : 
        calculateDistance(plannedWell.lat, plannedWell.lng, well.lat, well.lng)
    }));

    const offsetWells = updatedWells
      .filter(w => w.id !== selectedWell && (w.distance_km || 0) <= analysisRadius)
      .sort((a, b) => (a.distance_km || 0) - (b.distance_km || 0));

    setWells(updatedWells);
    setFilteredWells(offsetWells);
    setShowRadius(true);

    toast({
      title: "Analysis Complete",
      description: `Found ${offsetWells.length} offset wells within ${analysisRadius}km radius.`,
    });
  };

  const handleResetFilters = () => {
    setWells(wellsData as Well[]);
    setFilteredWells(wellsData as Well[]);
    setShowRadius(false);
    toast({
      title: "Filters Reset",
      description: "All filters have been cleared.",
    });
  };

  const handleExportCSV = () => {
    const csvContent = [
      Object.keys(filteredWells[0] || {}).join(','),
      ...filteredWells.map(well => Object.values(well).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'egs-wells-analysis.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    toast({
      title: "Export Complete",
      description: "CSV file has been downloaded successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-[hsl(0,0%,98%)] flex">
      <EGSSidebar 
        collapsed={sidebarCollapsed}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      <div className="flex-1 flex flex-col">
        <EGSHeader />
        
        <main className="flex-1 p-6 space-y-6">
          {/* Map and Controls Row */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 h-[500px]">
            <div className="xl:col-span-3">
              <EGSMapPanel
                wells={wells}
                selectedWell={selectedWell}
                mapLayer={mapLayer}
                onMapLayerChange={setMapLayer}
                analysisRadius={analysisRadius}
                showRadius={showRadius}
                showFaults={showFaults}
                showLabels={showLabels}
                onWellSelect={setSelectedWell}
              />
            </div>
            
            <div className="xl:col-span-1">
              <EGSControlPanel
                selectedWell={selectedWell}
                onSelectedWellChange={setSelectedWell}
                wells={wells}
                analysisRadius={analysisRadius}
                onAnalysisRadiusChange={setAnalysisRadius}
                showFaults={showFaults}
                onShowFaultsChange={setShowFaults}
                showLabels={showLabels}
                onShowLabelsChange={setShowLabels}
                onAnalyzeOffsets={handleAnalyzeOffsets}
                onResetFilters={handleResetFilters}
              />
            </div>
          </div>

          {/* KPI Chips */}
          <EGSKPIChips wells={filteredWells} />

          {/* Data Table */}
          <EGSDataTable
            wells={filteredWells}
            onWellSelect={setSelectedWell}
            onExportCSV={handleExportCSV}
          />
        </main>
      </div>
    </div>
  );
};

export default EGSAnalysis;