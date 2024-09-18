import { useRef } from "react";
import Highcharts from "../../utils/HighchartImport";
import HighchartsReact from "highcharts-react-official";

import { fontStyle } from "./ChartStyles";
import { DashboardChartType } from "../../definition/DashboardPage";
import { useTranslation } from "react-i18next";
import NoDataAvailable from "../reuseableComp/NoDataAvailable";

interface ChartProps {
  data: DashboardChartType;
}

export default function DashboardBarChart(props: ChartProps) {
  const { data } = props;
  const { t } = useTranslation();
  const chartRef = useRef<any>();

  // useEffect(() => {
  //   if (chartRef.current) {
  //     const chart = chartRef.current;
  //     // chart.chart.update(donutChartOptions, true);
  //     chart.chart.zoomOut();
  //     chart.chart.reflow();
  //   }
  // }, []);

  return (
    <>
      {data.series.length > 0 ? (
        <HighchartsReact
          highcharts={Highcharts}
          ref={chartRef}
          // options={donutChartOptions}
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
                fontSize: "0.4rem",
              },
              itemStyle: {
                ...fontStyle,
                fontSize: "0.4rem",
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
            title: {
              ...data.title,
              style: {
                ...fontStyle,
                fontSize: "0.5rem",
                margin: "0",
                padding: "0",
              },
            },
            xAxis: {
              ...data.xAxis,
              labels: {
                style: {
                  ...fontStyle,
                  fontSize: "0.4rem",
                },
              },
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
                  fontSize: "0.4rem",
                },
              },
            },
            credits: {
              enabled: false,
              text: "Powered By Netrum",
              href: "",
            },
            exporting: {
              enabled: false,
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
                  // menuItems: [
                  //   "downloadPNG",
                  //   "downloadJPEG",
                  //   "downloadSVG",
                  //   "downloadCSV",
                  //   "downloadXLS",
                  // ],
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
                    opacity: 1,
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
                stacking: "normal",
                borderWidth: 0,
                grouping: false,
                shadow: false,
              },
              xAxis: {
                ...data.xAxis,
                labels: {
                  style: {
                    ...fontStyle,
                    fontSize: "1rem",
                  },
                },
              },
              yAxis: {
                ...data.yAxis,
                labels: {
                  style: {
                    ...fontStyle,
                    fontSize: "1rem",
                  },
                },
              },
            },
          }}
          containerProps={{
            style: { width: "100%", height: "100%", flex: 1 },
          }}
        />
      ) : (
        <NoDataAvailable />
      )}
    </>
  );
}
