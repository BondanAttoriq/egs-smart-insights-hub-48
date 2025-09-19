import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Target, RotateCcw } from 'lucide-react';
import { Well } from '@/types/wells';

interface EGSControlPanelProps {
  selectedWell: string;
  onSelectedWellChange: (wellId: string) => void;
  wells: Well[];
  analysisRadius: number;
  onAnalysisRadiusChange: (radius: number) => void;
  showFaults: boolean;
  onShowFaultsChange: (show: boolean) => void;
  showLabels: boolean;
  onShowLabelsChange: (show: boolean) => void;
  onAnalyzeOffsets: () => void;
  onResetFilters: () => void;
}

export const EGSControlPanel: React.FC<EGSControlPanelProps> = ({
  selectedWell,
  onSelectedWellChange,
  wells,
  analysisRadius,
  onAnalysisRadiusChange,
  showFaults,
  onShowFaultsChange,
  showLabels,
  onShowLabelsChange,
  onAnalyzeOffsets,
  onResetFilters,
}) => {
  const plannedWells = wells.filter(w => w.status === 'Planned');
  const wellTypes = [...new Set(wells.map(w => w.type))];
  const formations = [...new Set(wells.map(w => w.formation))];

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg text-[hsl(217,33%,17%)]">Analysis Controls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Planned Well Selection */}
        <div className="space-y-2">
          <Label htmlFor="planned-well">Planned Well</Label>
          <Select value={selectedWell} onValueChange={onSelectedWellChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select planned well" />
            </SelectTrigger>
            <SelectContent>
              {plannedWells.map((well) => (
                <SelectItem key={well.id} value={well.id}>
                  {well.well_name} - {well.field}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Analysis Radius */}
        <div className="space-y-2">
          <Label>Analysis Radius: {analysisRadius} km</Label>
          <Slider
            value={[analysisRadius]}
            onValueChange={(value) => onAnalysisRadiusChange(value[0])}
            max={100}
            min={5}
            step={5}
            className="w-full"
          />
        </div>

        {/* Filters */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Well Type Filter</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="All types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {wellTypes.map((type) => (
                  <SelectItem key={type} value={type.toLowerCase()}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Formation Filter</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="All formations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Formations</SelectItem>
                {formations.map((formation) => (
                  <SelectItem key={formation} value={formation.toLowerCase()}>
                    {formation}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Status Filter</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="shut-in">Shut-in</SelectItem>
                <SelectItem value="planned">Planned</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Map Display Options */}
        <div className="space-y-4">
          <h4 className="font-medium text-[hsl(217,33%,17%)]">Display Options</h4>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="show-faults"
              checked={showFaults}
              onCheckedChange={onShowFaultsChange}
            />
            <Label htmlFor="show-faults">Show Fault Lines</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="show-labels"
              checked={showLabels}
              onCheckedChange={onShowLabelsChange}
            />
            <Label htmlFor="show-labels">Show Well Labels</Label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-4">
          <Button 
            onClick={onAnalyzeOffsets}
            className="w-full bg-[hsl(29,100%,50%)] hover:bg-[hsl(29,100%,45%)] text-white"
          >
            <Target className="w-4 h-4 mr-2" />
            Analyze Offsets
          </Button>

          <Button 
            onClick={onResetFilters}
            variant="outline"
            className="w-full"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};