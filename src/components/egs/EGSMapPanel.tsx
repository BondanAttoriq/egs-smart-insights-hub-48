import React, { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, Circle, GeoJSON } from 'react-leaflet';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ZoomIn, ZoomOut, Maximize, Move, Ruler } from 'lucide-react';
import { Well } from '@/pages/EGSAnalysis';
import { geologyData } from '@/data/geology';
import { formationsData } from '@/data/formations';

// Fix for default markers - Must be done before any Leaflet components are used
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix leaflet's default icon issue with webpack/vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

interface EGSMapPanelProps {
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

const wellTypeColors = {
  Production: '#22c55e',
  Injection: '#3b82f6',
  Monitoring: '#f59e0b',
};

const wellStatusColors = {
  Active: '#22c55e',
  'Shut-in': '#ef4444',
  Planned: '#8b5cf6',
};

const lithologyColors: Record<string, string> = {
  Andesite: '#8B4513',
  Dacite: '#A0522D',
  Rhyolite: '#CD853F',
  Basalt: '#2F4F4F',
  Tuff: '#DEB887',
};

export const EGSMapPanel: React.FC<EGSMapPanelProps> = ({
  wells,
  selectedWell,
  mapLayer,
  onMapLayerChange,
  analysisRadius,
  showRadius,
  showFaults,
  showLabels,
  onWellSelect,
}) => {
  const mapRef = useRef<L.Map | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const createWellIcon = (well: Well, isSelected: boolean) => {
    const color = wellTypeColors[well.type];
    const size = isSelected ? 12 : 8;
    const opacity = well.status === 'Planned' ? 0.7 : 1;
    
    return L.divIcon({
      html: `<div style="
        width: ${size}px;
        height: ${size}px;
        background-color: ${color};
        border: 2px solid ${isSelected ? '#FF7A00' : 'white'};
        border-radius: 50%;
        opacity: ${opacity};
        ${isSelected ? 'transform: scale(1.5);' : ''}
      "></div>`,
      className: 'custom-well-marker',
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
    });
  };

  const getGeoJSONStyle = (feature: any) => {
    if (mapLayer === 'geology') {
      const lithology = feature.properties.lithology;
      return {
        fillColor: lithologyColors[lithology] || '#999999',
        weight: 1,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.6,
      };
    } else if (mapLayer === 'formation') {
      return {
        fillColor: '#FF7A00',
        weight: 2,
        opacity: 1,
        color: '#FF7A00',
        fillOpacity: 0.3,
      };
    }
    return {};
  };

  const selectedWellData = wells.find(w => w.id === selectedWell);

  return (
    <Card className={`h-full ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      <CardContent className="p-4 h-full flex flex-col">
        {/* Map Controls Header */}
        <div className="flex items-center justify-between mb-4">
          <Tabs value={mapLayer} onValueChange={(value) => onMapLayerChange(value as any)}>
            <TabsList>
              <TabsTrigger value="satellite">Satellite</TabsTrigger>
              <TabsTrigger value="geology">Geology</TabsTrigger>
              <TabsTrigger value="formation">Formation</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Move className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Ruler className="w-4 h-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsFullscreen(!isFullscreen)}
            >
              <Maximize className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Map Container */}
        <div className="flex-1 rounded-lg overflow-hidden">
          <MapContainer
            center={[-6.9, 107.6]}
            zoom={10}
            style={{ height: '100%', width: '100%' }}
            ref={mapRef}
          >
            {/* Base Layer */}
            {mapLayer === 'satellite' ? (
              <TileLayer
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                attribution="&copy; Esri"
              />
            ) : (
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />
            )}

            {/* Geological Overlays */}
            {mapLayer === 'geology' && (
              <GeoJSON
                data={geologyData as any}
                style={getGeoJSONStyle}
                onEachFeature={(feature, layer) => {
                  layer.bindPopup(`
                    <strong>${feature.properties.name}</strong><br/>
                    Lithology: ${feature.properties.lithology}
                  `);
                }}
              />
            )}

            {mapLayer === 'formation' && (
              <GeoJSON
                data={formationsData as any}
                style={getGeoJSONStyle}
                onEachFeature={(feature, layer) => {
                  layer.bindPopup(`
                    <strong>${feature.properties.name}</strong><br/>
                    Age: ${feature.properties.age}
                  `);
                }}
              />
            )}

            {/* Analysis Radius */}
            {showRadius && selectedWellData && (
              <Circle
                center={[selectedWellData.lat, selectedWellData.lng]}
                radius={analysisRadius * 1000}
                pathOptions={{
                  color: '#FF7A00',
                  fillColor: '#FF7A00',
                  fillOpacity: 0.1,
                  weight: 2,
                }}
              />
            )}

            {/* Well Markers */}
            {wells.map((well) => (
              <Marker
                key={well.id}
                position={[well.lat, well.lng]}
                icon={createWellIcon(well, well.id === selectedWell)}
                eventHandlers={{
                  click: () => onWellSelect(well.id),
                }}
              >
                <Popup>
                  <div className="p-2">
                    <h3 className="font-bold text-[hsl(217,33%,17%)]">{well.well_name}</h3>
                    <p className="text-sm text-gray-600">{well.field}</p>
                    <div className="mt-2 space-y-1 text-sm">
                      <div>Type: <span className="font-medium">{well.type}</span></div>
                      <div>Status: <span className="font-medium">{well.status}</span></div>
                      <div>TVD: <span className="font-medium">{well.true_vertical_depth_m}m</span></div>
                      <div>Temp: <span className="font-medium">{well.reservoir_temp_C}°C</span></div>
                      {well.distance_km !== undefined && (
                        <div>Distance: <span className="font-medium">{well.distance_km.toFixed(1)}km</span></div>
                      )}
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <div className="flex items-center space-x-4">
            <span className="font-medium">Well Types:</span>
            {Object.entries(wellTypeColors).map(([type, color]) => (
              <div key={type} className="flex items-center space-x-1">
                <div 
                  className="w-3 h-3 rounded-full border border-white"
                  style={{ backgroundColor: color }}
                />
                <span>{type}</span>
              </div>
            ))}
          </div>

          {mapLayer === 'geology' && (
            <div className="flex items-center space-x-4">
              <span className="font-medium">Lithology:</span>
              {Object.entries(lithologyColors).map(([lithology, color]) => (
                <div key={lithology} className="flex items-center space-x-1">
                  <div 
                    className="w-3 h-3 border border-white"
                    style={{ backgroundColor: color }}
                  />
                  <span>{lithology}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};