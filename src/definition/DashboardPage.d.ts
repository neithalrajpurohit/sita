export interface DashboardSession {
  session: Session;
  fromDate: string;
  toDate: string;
  data: DashboardData;
  isLoading: boolean;
  cybledata: cybleobj[];
  selectedCybleId: number;
  layoutInfo: any[];
  // pdfData: null;
}

export interface cybleobj {
  id: number | null;
  title: string | null;
  description: string | null;
  alert_id: {
    color: string;
    value: string | null;
  };
  published_date: string | null;
  severity: {
    color: string;
    value: string | null;
  };
  status: {
    color: string;
    value: string | null;
  };
  created_at: string | null;
  tags: string | null;
  impacted_regions: string | null;
  impacted_countries: string | null;
  industry_types: string | null;
  related_websites: string | null;
  impacted_organizations: string | null;
}

export interface Session {
  insights: Dayfilter;
  oei: Dayfilter;
  perspective: Dayfilter;
}

export interface Dayfilter {
  day_filter: string;
}

interface DashboardData {
  funnel: {
    value: number;
    text: string;
    color: string;
    hover: string;
  }[];
  oei: {
    name: string;
    value: number;
    color: string;
    units: string;
  }[];
  perspective: {
    gridAddOn: {
      showFirstColumnAsCheckbox: boolean;
      showLastColumnAsAction: boolean;
    };
    gridHeader: {
      key: string;
      headerText: string;
      isSorting: boolean;
      type: string;
      hideOnUI: boolean;
      dataDisplayLength: number;
    }[];
    gridData: any[]; // You can replace "any" with the type of the grid data
  };
  insight: {
    chart: {
      type: string;
      zoomType: string;
    };
    title: {
      text: string;
      align: string;
    };
    xAxis: {
      categories: string[];
      crosshair: boolean;
    };
    yAxis: {
      min: number;
      title: {
        text: string;
      };
    };
    colors: string[];
    credits: {
      enabled: boolean;
      text: string;
      href: string;
    };
    exporting: {
      buttons: {
        contextButton: {
          menuItems: string[];
        };
      };
    };
    series: {
      name: string;
      data: [string, number][];
    }[];
  };
}

export interface DashboardChartType {
  chart: {
    type: string;
    zoomType: string;
  };
  title: {
    text: string;
    align: string;
  };
  xAxis: {
    categories: string[];
    crosshair: boolean;
  };
  yAxis: {
    min: number;
    title: {
      text: string;
    };
  };
  colors: string[];
  credits: {
    enabled: boolean;
    text: string;
    href: string;
  };
  exporting: {
    buttons: {
      contextButton: {
        menuItems: string[];
      };
    };
  };
  series: {
    name: string;
    data: [string, number][];
  }[];
}
