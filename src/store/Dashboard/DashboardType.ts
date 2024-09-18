export interface Dayfilter {
  day_filter: string;
}

export interface LayoutInfo {
  page: string;
}

export interface LayoutResponse {
  page: string;
  layoutInformation: [
    {
      id: string;
      hidden: boolean;
      position: number;
    }
  ];
}
