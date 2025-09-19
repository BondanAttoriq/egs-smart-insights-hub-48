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