import { RUDFilterOptionsProps } from "../../component/RiskUserDashboard/RUDTypes";

export type InitialStateRUD = {
  all_filter_options: RUDFilterOptionsProps;
  header_filters: {
    geo_location: { value: number; label: string }[];
    function: { value: number; label: string }[];
    process: { value: number; label: string }[];
    asset: { value: number; label: string }[];
  };
  isLoading: boolean;
  chart: {
    function_chart: {
      title: string;
      y_axis_label: string;
      category: string[];
      data: {
        name: string;
        color: string;
        data: (number | null)[];
      }[];
    };
    process_chart: {
      title: string;
      y_axis_label: string;
      category: string[];
      data: {
        name: string;
        color: string;
        data: (number | null)[];
      }[];
    };
    risk_aggr_bar_chart: {
      title: string;
      y_axis_label: string;
      category: string[];
      data: {
        name: string;
        color?: string;
        pointPadding?: number;
        pointPlacement?: number;
        data: (null | number)[];
      }[];
    };
    heat_map_data: {
      title: string;
      xCategory: string[];
      yCategory: string[];
      data: {
        name: string;
        data: {
          x: number;
          y: number;
          value: number;
          count: number;
        }[];
        dataLabels: {
          enabled: boolean;
          color: string;
          format: string;
        };
      }[];
      colorAxis: {
        min: number;
        stops: (string | number)[][];
      };
    };
    inherent_risk: {
      title: string;
      inner_value_1: string;
      inner_value_2: string;
      budget_value: string;
      colors: string[];
      data: {
        type: string;
        name: string;
        data: (number | null)[];
      }[];
    };
    residual_risk: {
      title: string;
      inner_value_1: string;
      inner_value_2: string;
      budget_value: string;
      colors: string[];
      data: {
        type: string;
        name: string;
        data: (number | null)[];
      }[];
    };
    geo_locations: {
      all_entity_location: {
        key: string;
        position: {
          lat: number;
          lng: number;
        };
      }[];
      filtered_location: {
        key: string;
        position: {
          lat: number;
          lng: number;
        };
      }[];
    };
  };
  heatmap_data_point: any;
};
