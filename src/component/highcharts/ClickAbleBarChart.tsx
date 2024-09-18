import Highcharts from "../../utils/HighchartImport";
import HighchartsReact from "highcharts-react-official";

import { fontStyle } from "./ChartStyles";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../configureStore";
import { FilterKeyVal } from "../../utils/InsightDataCal";
import { useTranslation } from "react-i18next";
import NoDataAvailable from "../reuseableComp/NoDataAvailable";

export interface ChartProps {
  selected: string;
  onBarCliked: (name: string) => void;
  data: any[];
  category: string[];
  title: string;
  id?: string;
}

export default function ClickAbleBarChart({
  selected,
  onBarCliked,
  data,
  category,
  title,
}: ChartProps) {
  const chartRef = useRef<any>(null);
  const { t } = useTranslation();

  const memoizedData = useMemo(() => data, [data]);
  const memoizedCategory = useMemo(() => category, [category]);

  const prevSelected = useSelector(
    (state: RootState) => state.Insight.internalFilters
  ).map((g) => g.value);

  const memoizedPreSelect = useMemo(() => {
    return [...prevSelected];
  }, [prevSelected]);

  const [donutChartOptions, setDonutChartOptions] = useState({
    chart: {
      type: "column",
      zoomButtons: {
        enabled: true,
      },
      zoomType: "x",
      backgroundColor: null,
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

    xAxis: {
      categories: category,
      type: "category",
      crosshair: false,
      labels: {
        style: {
          ...fontStyle,
        },
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "",
      },
      labels: {
        style: {
          ...fontStyle,
        },
      },
    },
    tooltip: {
      headerFormat: `<div style="background: var(--bg-color);color: var(--font-color); padding: 0.5em;" ><span style="font-size:10px">${t(
        "alertbyconfidence"
      )}</span><table>`,
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b> {point.y}</b></td></tr>',
      footerFormat: "</table> </div>",
      shared: true,
      useHTML: true,
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

    plotOptions: {
      column: {
        // stacking: "normal",
        borderWidth: 0,
        grouping: false,
        shadow: false,
      },
      series: {
        animation: false,
        cursor: "pointer",
        states: {
          inactive: {
            opacity: 1,
          },
          hover: {
            enabled: true,
            opacity: 1,
            pointPadding: 0, // set point padding to 0 for selected series
            groupPadding: 0.2, // set group padding to a smaller value
          },
        },
        point: {
          events: {
            click: function (event: any) {
              if (String(event.point.series.name).includes(FilterKeyVal)) {
                onBarCliked(
                  String(event.point.series.name).replace(FilterKeyVal, "")
                );
              } else {
                onBarCliked(event.point.series.name);
              }
            },
          },
        },
      },
    },
    credits: {
      enabled: false,
      text: "Powered By Netrum",
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
    colors: [
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
    ],
    series: data.map((series, index) => {
      return {
        ...series,
        type: "column",
      };
    }),
  });

  useEffect(() => {
    if (chartRef.current) {
      const chart = chartRef.current;
      chart.chart.update(donutChartOptions, true);
      chart.chart.zoomOut();
      chart.chart.reflow();
    }
  }, [donutChartOptions, memoizedData]);

  useEffect(() => {
    setDonutChartOptions((prevOptions) => ({
      ...prevOptions,
      xAxis: {
        ...prevOptions.xAxis,
        categories: memoizedCategory,
      },
    }));
  }, [memoizedCategory]);

  useEffect(() => {
    setDonutChartOptions((prevOptions) => ({
      ...prevOptions,
      series: memoizedData.map((series, index) => {
        return {
          ...series,
          type: "column",
          opacity:
            memoizedPreSelect.length > 0
              ? memoizedPreSelect.includes(series.name)
                ? 1
                : 0.75
              : 1,
        };
      }),
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memoizedData]);

  return (
    <>
      {data.length > 0 ? (
        <HighchartsReact
          highcharts={Highcharts}
          options={donutChartOptions}
          allowChartUpdate={true}
          immutable={false}
          updateArgs={[true, true, true]}
          containerProps={{
            style: { width: "100%", height: "100%", flex: 1 },
          }}
          ref={chartRef}
        />
      ) : (
        <NoDataAvailable width="96%" />
      )}
    </>
  );
}
