export interface ThreatIntelFilterOptions {
  headerFilters: {
    services: { value: number; label: string }[];
    status: { value: number; label: string }[];
    severity: { value: number; label: string }[];
  };
  fromDate: string;
  toDate: string;
}

export interface ThreatIntelFilterOptionsProps {
  services: { value: number; label: string }[];
  status: { value: number; label: string }[];
  severity: { value: number; label: string }[];
}
