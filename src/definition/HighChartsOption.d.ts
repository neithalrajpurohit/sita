export interface TBarChartOptions {
  data: TBarChartDataProps;
}

export interface TLineChartOptions {
  data: TLineChartDataProps;
}

// export interface TBarChartDataProps {
//   chart: {
//     type: string;
//     zoomType: string;
//   };
//   title: {
//     text: string;
//     align: string;
//   };
//   xAxis: {
//     categories: string[];
//     crosshair: boolean;
//   };
//   yAxis: {
//     min: number;
//     title: {
//       text: string;
//     };
//   };
//   colors: string[];
//   credits: {
//     enabled: boolean;
//     text: string;
//     href?: string;
//   };
//   exporting: {
//     buttons: {
//       contextButton: {
//         menuItems: string[];
//       };
//     };
//   };
//   series: {
//     name: string;
//     data: (number | [string, number] | any)[];
//   }[];
// }
export interface TBarChartDataProps {
  chart: {
    zoomType: string;
  };
  title: {
    text: string;
    align: string;
  };
  xAxis: {
    categories: string[];
    crosshair: boolean;
  }[];
  yAxis: {
    labels: {
      format: string;
    };
    title: {
      text: string;
    };
    opposite?: boolean;
  }[];
  tooltip?: {
    shared: boolean;
  };
  colors: string[];
  credits: {
    enabled: boolean;
    text: string;
    href: string;
  };
  legend?: {
    enabled: boolean;
    align: string;
    verticalAlign: string;
    layout: string;
  }[];
  exporting: {
    buttons: {
      contextButton: {
        menuItems: string[];
      };
    };
  };
  series: {
    name: string;
    type: string;
    yAxis?: number;
    data: Array<(string | number)[] | null>;
    tooltip: {
      valueSuffix: string;
    };
  }[];
}

export interface TLineChartDataProps {
  chart: {
    type: string;
    zoomType: string;
  };
  title: {
    text: string;
    align: string;
    color?: string;
  };
  yAxis: {
    title: {
      text: string;
    };
  };
  xAxis: {
    accessibility: {
      rangeDescription: string;
    };
  };
  colors: string[];
  credits: {
    enabled: boolean;
    text: string;
    href?: string;
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
    data: (number | [string, number] | any)[];
  }[];
}
