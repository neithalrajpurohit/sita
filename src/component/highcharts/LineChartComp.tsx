import Highcharts from "../../utils/HighchartImport";
import HighchartsReact from "highcharts-react-official";

import { TLineChartOptions } from "../../definition/HighChartsOption";
import { fontStyle } from "./ChartStyles";
import { useTranslation } from "react-i18next";
import { useRef } from "react";
import NoDataAvailable from "../reuseableComp/NoDataAvailable";

export default function LineChartComp(props: TLineChartOptions) {
  const { data } = props;
  const { t } = useTranslation();
  const chartRef = useRef<any>();

  return (
    <>
      {data.series.length > 0 ? (
        <HighchartsReact
          highcharts={Highcharts}
          ref={chartRef}
          options={{
            ...data,
            chart: {
              ...data.chart,
              backgroundColor: null,
              style: {
                ...fontStyle,
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
            tooltip: {
              headerFormat:
                '<div style="background: var(--bg-color);color: var(--font-color); padding: 0.5em;" ><table>',
              pointFormat:
                '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b> {point.y}</b></td></tr>',
              footerFormat: "</table> </div>",
              shared: true,
              useHTML: true,
            },
            title: {
              ...data.title,
              style: {
                ...fontStyle,
                color:
                  data.title.color !== undefined
                    ? data.title.color
                    : "var(--font-color)",
                fontSize: "0.85rem",
              },
            },
            credits: {
              enabled: false,
              text: "Powered By Netrum",
              href: "",
            },
            yAxis: {
              ...data.yAxis,
              title: {
                ...data.yAxis.title,
                style: {
                  ...fontStyle,
                },
              },
              labels: {
                style: {
                  ...fontStyle,
                },
              },
            },
            xAxis: {
              ...data.xAxis,
              labels: {
                style: {
                  ...fontStyle,
                },
              },
            },
            exporting: {
              ...data.exporting,
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
            plotOptions: {
              series: {
                animation: false,
                states: {
                  inactive: {
                    opacity: 0,
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
          }}
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
