import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Search, ArrowUpDown, Eye, EyeOff, ChevronLeft, ChevronRight } from 'lucide-react';
import { Well } from '@/pages/EGSAnalysis';

interface EGSDataTableProps {
  wells: Well[];
  onWellSelect: (wellId: string) => void;
  onExportCSV: () => void;
}

export const EGSDataTable: React.FC<EGSDataTableProps> = ({
  wells,
  onWellSelect,
  onExportCSV,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortField, setSortField] = useState<keyof Well>('distance_km');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [hiddenColumns, setHiddenColumns] = useState<Set<string>>(new Set(['casing_weight_lbft', 'cement_top_m']));

  const handleSort = (field: keyof Well) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const toggleColumn = (column: string) => {
    const newHidden = new Set(hiddenColumns);
    if (newHidden.has(column)) {
      newHidden.delete(column);
    } else {
      newHidden.add(column);
    }
    setHiddenColumns(newHidden);
  };

  // Filter and sort wells
  const filteredWells = wells
    .filter(well => 
      well.well_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      well.field.toLowerCase().includes(searchTerm.toLowerCase()) ||
      well.formation.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      
      if (typeof aVal === 'string') aVal = aVal.toLowerCase();
      if (typeof bVal === 'string') bVal = bVal.toLowerCase();
      
      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

  // Pagination
  const totalPages = Math.ceil(filteredWells.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedWells = filteredWells.slice(startIndex, startIndex + itemsPerPage);

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Shut-in': return 'bg-red-100 text-red-800';
      case 'Planned': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'Production': return 'bg-green-100 text-green-800';
      case 'Injection': return 'bg-blue-100 text-blue-800';
      case 'Monitoring': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const columns = [
    { key: 'well_name', label: 'Well Name', sortable: true },
    { key: 'field', label: 'Field', sortable: true },
    { key: 'type', label: 'Type', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'distance_km', label: 'Distance (km)', sortable: true },
    { key: 'true_vertical_depth_m', label: 'TVD (m)', sortable: true },
    { key: 'measured_depth_m', label: 'MD (m)', sortable: true },
    { key: 'reservoir_temp_C', label: 'Temp (°C)', sortable: true },
    { key: 'bottomhole_pressure_MPa', label: 'BHP (MPa)', sortable: true },
    { key: 'casing_OD_in', label: 'Casing OD (in)', sortable: true },
    { key: 'casing_weight_lbft', label: 'Casing Wt (lb/ft)', sortable: true },
    { key: 'cement_top_m', label: 'Cement Top (m)', sortable: true },
    { key: 'permeability_mD', label: 'Perm (mD)', sortable: true },
    { key: 'porosity_pct', label: 'Porosity (%)', sortable: true },
    { key: 'formation', label: 'Formation', sortable: true },
    { key: 'spud_date', label: 'Spud Date', sortable: true },
    { key: 'remarks', label: 'Remarks', sortable: false },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-[hsl(217,33%,17%)]">
            Wells Data ({filteredWells.length} records)
          </CardTitle>
          
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search wells..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            
            <Select value="columns" onValueChange={() => {}}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Show/Hide Columns" />
              </SelectTrigger>
              <SelectContent>
                {columns.map((col) => (
                  <SelectItem 
                    key={col.key} 
                    value={col.key}
                    onClick={() => toggleColumn(col.key)}
                  >
                    <div className="flex items-center space-x-2">
                      {hiddenColumns.has(col.key) ? 
                        <EyeOff className="w-4 h-4" /> : 
                        <Eye className="w-4 h-4" />
                      }
                      <span>{col.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button onClick={onExportCSV} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {columns
                  .filter(col => !hiddenColumns.has(col.key))
                  .map((col) => (
                    <TableHead 
                      key={col.key} 
                      className={col.sortable ? 'cursor-pointer hover:bg-gray-50' : ''}
                      onClick={() => col.sortable && handleSort(col.key as keyof Well)}
                    >
                      <div className="flex items-center space-x-1">
                        <span>{col.label}</span>
                        {col.sortable && <ArrowUpDown className="w-4 h-4" />}
                      </div>
                    </TableHead>
                  ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedWells.map((well) => (
                <TableRow 
                  key={well.id}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => onWellSelect(well.id)}
                >
                  {!hiddenColumns.has('well_name') && (
                    <TableCell className="font-medium">{well.well_name}</TableCell>
                  )}
                  {!hiddenColumns.has('field') && (
                    <TableCell>{well.field}</TableCell>
                  )}
                  {!hiddenColumns.has('type') && (
                    <TableCell>
                      <Badge className={getTypeBadgeColor(well.type)}>
                        {well.type}
                      </Badge>
                    </TableCell>
                  )}
                  {!hiddenColumns.has('status') && (
                    <TableCell>
                      <Badge className={getStatusBadgeColor(well.status)}>
                        {well.status}
                      </Badge>
                    </TableCell>
                  )}
                  {!hiddenColumns.has('distance_km') && (
                    <TableCell>
                      {well.distance_km !== undefined ? well.distance_km.toFixed(1) : '-'}
                    </TableCell>
                  )}
                  {!hiddenColumns.has('true_vertical_depth_m') && (
                    <TableCell>{well.true_vertical_depth_m.toLocaleString()}</TableCell>
                  )}
                  {!hiddenColumns.has('measured_depth_m') && (
                    <TableCell>{well.measured_depth_m.toLocaleString()}</TableCell>
                  )}
                  {!hiddenColumns.has('reservoir_temp_C') && (
                    <TableCell>{well.reservoir_temp_C}</TableCell>
                  )}
                  {!hiddenColumns.has('bottomhole_pressure_MPa') && (
                    <TableCell>{well.bottomhole_pressure_MPa}</TableCell>
                  )}
                  {!hiddenColumns.has('casing_OD_in') && (
                    <TableCell>{well.casing_OD_in}</TableCell>
                  )}
                  {!hiddenColumns.has('casing_weight_lbft') && (
                    <TableCell>{well.casing_weight_lbft}</TableCell>
                  )}
                  {!hiddenColumns.has('cement_top_m') && (
                    <TableCell>{well.cement_top_m.toLocaleString()}</TableCell>
                  )}
                  {!hiddenColumns.has('permeability_mD') && (
                    <TableCell>{well.permeability_mD}</TableCell>
                  )}
                  {!hiddenColumns.has('porosity_pct') && (
                    <TableCell>{well.porosity_pct}</TableCell>
                  )}
                  {!hiddenColumns.has('formation') && (
                    <TableCell>{well.formation}</TableCell>
                  )}
                  {!hiddenColumns.has('spud_date') && (
                    <TableCell>{new Date(well.spud_date).toLocaleDateString()}</TableCell>
                  )}
                  {!hiddenColumns.has('remarks') && (
                    <TableCell className="max-w-xs truncate">{well.remarks}</TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between space-x-2 py-4">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <Select
              value={itemsPerPage.toString()}
              onValueChange={(value) => {
                setItemsPerPage(Number(value));
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent side="top">
                {[5, 10, 20, 30, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={pageSize.toString()}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-6 lg:space-x-8">
            <div className="flex w-[100px] items-center justify-center text-sm font-medium">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};