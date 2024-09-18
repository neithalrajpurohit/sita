import Highcharts from "highcharts";

import HighchartsReact from "highcharts-react-official";

import { useState } from "react";

export default function MultiLineChart() {
  const fontStyle = {
    color: "var(--font-color)",
    fontWeight: "bold",
    fontSize: "0.65rem",
    fontFamily: "Poppins",
  };

  const [donutChartOptions, setDonutChartOptions] = useState({
    chart: {
      type: "spline",
      // zoomType: "x",
      backgroundColor: null,
      style: {
        ...fontStyle,
      },
    },
    legend: {
      enabled: false,
      align: "left",
      verticalAlign: "top",
      layout: "horizontal",
      itemHoverStyle: {
        ...fontStyle,
      },
      itemStyle: {
        ...fontStyle,
      },
    },
    colors: ["#54B435"],
    title: {
      text: "",
      align: "left",
      style: {
        ...fontStyle,
      },
    },

    yAxis: {
      title: {
        text: "Number of Employees",
      },
      labels: {
        style: {
          ...fontStyle,
        },
      },
    },

    xAxis: {
      accessibility: {
        rangeDescription: "Range: 2021 to 2022",
      },
      labels: {
        style: {
          ...fontStyle,
        },
      },
    },
    plotOptions: {
      series: {
        animation: false,
        states: {
          inactive: {
            opacity: 1,
          },

          hover: {
            enabled: true,
            brightness: 3,
          },
        },
        point: {
          events: {
            click: function (event: any) {
              console.log("Point clicked:", event.point);
            },
          },
        },
      },
      column: {
        colorByPoint: false,
      },
    },
    credits: {
      enabled: true,
      text: "Powered By Netrum",
      href: "",
    },
    exporting: {
      enabled: false,
    },
    series: [
      {
        data: [
          2198, 5548, 8105, 1148, 8989, 1116, 1824, 1700, 1053, 1906, 1073,
        ],
      },
    ],
  });

  return (
    <>
      <HighchartsReact
        highcharts={Highcharts}
        options={donutChartOptions}
        containerProps={{
          style: { width: "100%", height: "100%", flex: 1 },
        }}
      />
    </>
  );
}
