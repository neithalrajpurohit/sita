type DropDownData = {
  value: string;
  label: string;
};

export type RosiTypes = {
  isLoading: boolean;
  error: string | null;
  rosiChartData: any[];
  rosiStatus: boolean;
  isInitial: boolean;

  all_filter_options: {
    GeoLocation: any[];
    Function: any[];
    Process: any[];
    Asset: any[];
  };

  header_filters: {
    function: any[];
    process: any[];
    geo_location: any[];
    asset_category: any[];
  };

  chart: {
    rosiChart: any;
    functionChart: any;
    geoLocationChart: {
      all_entity_location: any[];
      filtered_location: any[];
    };
    investmentOptimizationChart: any;
    assetChart: any;
    totalInvestment: any;
  };
  layoutInfo: any[];
};
