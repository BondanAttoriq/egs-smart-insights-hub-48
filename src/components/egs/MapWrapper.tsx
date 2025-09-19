import React, { useState, useEffect } from 'react';
import { EGSMapPanel } from './EGSMapPanel';
import { Well } from '@/types/wells';

interface MapWrapperProps {
  wells: Well[];
  selectedWell: string;
  mapLayer: 'satellite' | 'geology' | 'formation';
  onMapLayerChange: (layer: 'satellite' | 'geology' | 'formation') => void;
  analysisRadius: number;
  showRadius: boolean;
  showFaults: boolean;
  showLabels: boolean;
  onWellSelect: (wellId: string) => void;
}

// Dynamic import wrapper to prevent SSR issues
export const MapWrapper: React.FC<MapWrapperProps> = (props) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-100 rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[hsl(29,100%,50%)] mx-auto mb-2"></div>
          <p className="text-gray-600">Loading map...</p>
        </div>
      </div>
    );
  }

  return <EGSMapPanel {...props} />;
};