import Highcharts from "../../utils/HighchartImport";
import HighchartsReact from "highcharts-react-official";

import { fontStyle } from "./ChartStyles";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import NoDataAvailable from "../reuseableComp/NoDataAvailable";

export interface TClickAblePieChart {
  id?: string;
  data: any[];
  title: string;
  onSliceCliked: (name: string) => void;
}

const colorsCache = [
  "#198754",
  "#80ab77",
  "#ffdd88",
  "#ec8e5d",
  "#D83F31",
  "#19A7CE",
  "#FB9800",
  "#D61355",
  "#65647C",
  "#FD8A8A",
  "#3C486B",
  "#917FB3",
  "#088395",
  "#CE2A96",
  "#D14D72",
  "#0081C9",
  "#7FBCD2",
];

export default function ClickAblePieChart(props: TClickAblePieChart) {
  const pieToColorMapping = useRef<Record<string, string>>({});
  const { data, title, onSliceCliked, id } = props;
  const { t } = useTranslation();
  const chartRef = useRef<any>();
  const memoizedData = useMemo(() => data, [data]);

  //mapping between pie identifier and color
  const pieColorMapping = useMemo(() => {
    const mapping: Record<string, string> = {};
    memoizedData.forEach((d) => {
      const pieIdentifier = d[0];
      mapping[pieIdentifier] = getPieColor(pieIdentifier);
    });
    return mapping;

    function getPieColor(pieIdentifier: string) {
      if (!isPieInCache(pieIdentifier)) {
        let color = findUnusedColor();
        addToCache(pieIdentifier, color);
      }
      return getColorFromCache(pieIdentifier);
    }

    function isPieInCache(pieIdentifier: string) {
      return pieToColorMapping.current[pieIdentifier] !== undefined;
    }

    function findUnusedColor() {
      let color = colorsCache.find((c) => !isColorUsed(c));
      if (!color) color = colorsCache[0];
      return color;
    }

    function isColorUsed(color: string) {
      return Object.values(pieToColorMapping.current).includes(color);
    }

    function addToCache(pieIdentifier: string, color: string) {
      pieToColorMapping.current[pieIdentifier] = color;
    }
    function getColorFromCache(pieIdentifier: string) {
      return pieToColorMapping.current[pieIdentifier];
    }
  }, [memoizedData]);

  const [donutChartOptions, setDonutChartOptions] = useState({
    chart: {
      type: "pie",
      backgroundColor: null,
      options3d: {
        enabled: false,
        alpha: 25,
      },
      style: {
        ...fontStyle,
      },
    },
    title: {
      text: title,
      align: "left",
      style: {
        ...fontStyle,
        fontSize: "0.85rem",
      },
    },
    legend: {
      enabled: true,
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
    colors: [
      "#19A7CE",
      "#FB9800",
      "#D61355",
      "#FD8A8A",
      "#088395",
      "#CE2A96",
      "#D14D72",
      "#0081C9",
      "#7FBCD2",
      "#917FB3",
      "#65647C",
      "#3C486B",
    ],
    tooltip: {
      headerFormat:
        '<div style="background: var(--bg-color);color: var(--font-color); padding: 0.5em;" ><span style="font-size:10px">{series.name}</span><table>',
      pointFormat:
        '<tr><td style="padding:0">{point.id}: </td>' +
        '<td style="padding:0"><b>{point.y}</b> <b>({point.percentage:.1f}%)</b></td></tr>',
      footerFormat: "</table></div>",
      useHTML: true,
    },
    plotOptions: {
      series: {
        animation: false,
        states: {
          inactive: {
            opacity: 1,
          },

          hover: {
            enabled: false,
            brightness: 1,
          },
        },
        point: {
          events: {
            click: function (event: any) {
              onSliceCliked(event.point.id);
            },
          },
        },
      },
      column: {
        colorByPoint: true,
      },
      pie: {
        // innerSize: "%",
        animation: false,
        allowPointSelect: true,
        selected: false,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          style: {
            ...fontStyle,
            textOutline: "none",
            fontSize: "0.625rem",
          },
          format:
            "<b>{point.id}</b>: <b>{point.y}</b> <b>({point.percentage:.1f}%)</b> ",
        },
      },
    },
    credits: {
      enabled: false,
      text: "Powered By Netrum",
      href: "",
    },
    // Add exporting module
    exporting: {
      chartOptions: {
        chart: {
          backgroundColor: "#FFF",
        },
        title: {
          style: {
            ...fontStyle,
            fontSize: "1.5rem",
          },
        },
        legend: {
          itemStyle: {
            ...fontStyle,
            fontSize: "0.85rem",
          },
        },
        credits: {
          enabled: true,
          text: "Powered By Netrum",
          href: "",
        },
        xAxis: {
          labels: {
            style: {
              ...fontStyle,
              fontSize: "1rem",
            },
          },
        },
        yAxis: {
          labels: {
            style: {
              ...fontStyle,
              fontSize: "1rem",
            },
          },
        },
      },
      buttons: {
        contextButton: {
          menuItems: [
            {
              textKey: "downloadPNG",
              text: `${t("downloadPNG")}`,
              onclick: function () {
                // @ts-ignore
                this.exportChart({});
              },
            },
            {
              textKey: "downloadJPEG",
              text: `${t("downloadJPEG")}`,
              onclick: function () {
                // @ts-ignore
                this.exportChart({
                  type: "image/jpeg",
                });
              },
            },
            {
              textKey: "downloadSVG",
              text: `${t("downloadSVG")}`,
              onclick: function () {
                // @ts-ignore
                this.exportChart({
                  type: "image/svg",
                });
              },
            },
            {
              textKey: "downloadCSV",
              text: `${t("downloadCSV")}`,
              onclick: function () {
                // @ts-ignore
                chartRef.current.chart.downloadCSV();
              },
            },
            {
              textKey: "downloadXLS",
              text: `${t("downloadXLS")}`,
              onclick: function () {
                // @ts-ignore
                chartRef.current.chart.downloadXLS();
              },
            },
          ],
        },
      },
    },
    series: [
      {
        type: "pie",
        data: data,
      },
    ],
  });

  useEffect(() => {
    setDonutChartOptions((prevOptions) => ({
      ...prevOptions,
      series: [
        {
          name: title,
          type: "pie",
          colorByPoint: true,
          data: memoizedData.map((series, index) => {
            return {
              color: Array.isArray(series)
                ? pieColorMapping[series[0]]
                : series["color"],
              id: Array.isArray(series) ? series[0] : series["id"],
              y: Array.isArray(series) ? series[1] : series["y"],
              name: Array.isArray(series) ? series[2] : series["name"],
              sliced: false,
              selected: false,
            };
          }),
        },
      ],
    }));
  }, [memoizedData, pieColorMapping, title]);

  useEffect(() => {
    // Create or update the chart on initial render and subsequent data updates
    if (chartRef.current) {
      // Chart already exists, update it
      chartRef.current.chart.update(donutChartOptions, true);
      chartRef.current.chart.reflow(); // Trigger chart reflow
    }
  }, [donutChartOptions]);

  return (
    <>
      {data.length > 0 ? (
        <HighchartsReact
          id={id}
          ref={chartRef}
          highcharts={Highcharts}
          options={donutChartOptions}
          // allowChartUpdate={false}
          containerProps={{
            style: { width: "100%", height: "100%", flex: 1 },
          }}
        />
      ) : (
        <NoDataAvailable width="96%" />
      )}
    </>
  );
}
