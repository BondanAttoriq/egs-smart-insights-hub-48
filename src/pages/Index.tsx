
import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { AlgorithmComparison } from '@/components/AlgorithmComparison';
import { Footer } from '@/components/Footer';
import { RealTimeMonitor } from '@/components/RealTimeMonitor';
import { CloudDataset } from '@/components/CloudDataset';
import { ProfessionalAnalysis } from '@/components/ProfessionalAnalysis';
import { EGSHeader } from '@/components/egs/EGSHeader';
import { MapWrapper } from '@/components/egs/MapWrapper';
import { EGSControlPanel } from '@/components/egs/EGSControlPanel';
import { EGSDataTable } from '@/components/egs/EGSDataTable';
import { EGSKPIChips } from '@/components/egs/EGSKPIChips';
import { useToast } from '@/hooks/use-toast';
import { Well } from '@/types/wells';
import wellsData from '@/data/wells.json';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const { toast } = useToast();
  
  // EGS Analysis state
  const [selectedWell, setSelectedWell] = useState<string>('EGS-04');
  const [mapLayer, setMapLayer] = useState<'satellite' | 'geology' | 'formation'>('satellite');
  const [wells, setWells] = useState<Well[]>(wellsData as Well[]);
  const [filteredWells, setFilteredWells] = useState<Well[]>(wellsData as Well[]);
  const [analysisRadius, setAnalysisRadius] = useState(25);
  const [showRadius, setShowRadius] = useState(false);
  const [showFaults, setShowFaults] = useState(true);
  const [showLabels, setShowLabels] = useState(true);

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

  const renderContent = () => {
    switch (activeSection) {
      case 'monitor':
        return <RealTimeMonitor />;
      case 'dataset':
        return <CloudDataset />;
      case 'analysis':
        return <ProfessionalAnalysis />;
      case 'egs-analysis':
        return (
          <div className="space-y-6">
            <EGSHeader />
            
            {/* Map and Controls Row */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 h-[500px]">
              <div className="xl:col-span-3">
                <MapWrapper
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
          </div>
        );
      default:
        return (
          <div className="space-y-16">
            <HeroSection />
            <AlgorithmComparison />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50 flex w-full">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="flex-1 flex flex-col">
        {activeSection !== 'egs-analysis' && <Header />}
        <main className={activeSection === 'egs-analysis' ? 'flex-1 p-6' : 'flex-1 p-8'}>
          {renderContent()}
        </main>
        {activeSection !== 'egs-analysis' && <Footer />}
      </div>
    </div>
  );
};

export default Index;
