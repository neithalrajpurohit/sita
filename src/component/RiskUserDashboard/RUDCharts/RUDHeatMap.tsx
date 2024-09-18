import Highcharts from "../../../utils/HighchartImport";
import HighchartsReact from "highcharts-react-official";
import heatmapmodule from "highcharts/modules/heatmap";

import { useEffect, useRef, useState } from "react";
import { fontStyle } from "../../highcharts/ChartStyles";
import { useTranslation } from "react-i18next";
import { cloneDeep } from "lodash";
import NoDataAvailable from "../../reuseableComp/NoDataAvailable";
import { showTopTenAssetsByRisk } from "../../../utils/NumberConverter";
import {
  downloadRiskMatixCSV,
  downloadRiskMatrixXLSX,
} from "../../../utils/ExportRiskMatrix";

heatmapmodule(Highcharts);

interface HeatMapDataType {
  data: {
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
  onHeatMapClick: (data: any) => void;
  isSizeMini: boolean;
}

export default function RUDHeatMap({
  data,
  onHeatMapClick,
  isSizeMini,
}: HeatMapDataType) {
  const chartRef = useRef<any>();
  const [chartLoaded, setChartLoaded] = useState(false);

  const { t } = useTranslation();
  const [options, setOptions] = useState({
    chart: {
      type: "heatmap",
      backgroundColor: "transparent",
      reflow: true,
      events: {
        load: function () {
          setChartLoaded(true);
        },
      },
    },

    title: {
      text: "",
      align: "left",
      style: {
        ...fontStyle,
        fontSize: "0.85rem",
      },
    },
    plotOptions: {
      heatmap: {
        borderRadius: 0, // Adjust the value to your desired corner radius
        borderWidth: 3, // You can adjust the border width as well
        borderColor: "var(--bg-color)", // Border color for each cell
      },
    },

    xAxis: {
      categories: [],
      labels: {
        style: {
          ...fontStyle,
          fontSize: "0.65rem",
        },
      },
    },

    yAxis: {
      categories: [],
      title: null,
      reversed: true,
      labels: {
        style: {
          ...fontStyle,
          fontSize: "0.65rem",
        },
      },
    },

    accessibility: {
      enabled: false,
      point: {
        descriptionFormat:
          "{(add index 1)}. " +
          "{series.xAxis.categories.(x)} sales " +
          "{series.yAxis.categories.(y)}, {value}.",
      },
    },

    legend: {
      enabled: false,
      align: "right",
      layout: "vertical",
      margin: 0,
      verticalAlign: "top",
      y: 25,
      symbolHeight: 280,
    },
    tooltip: {
      enabled: true,
      useHTML: true,
      formatter: function (): any {
        let self: any = this;
        return `<div style="background: var(--bg-color);color: var(--font-color); padding: 0.5em;">
        <table>
        <tr><b>Top 10 Assets By Risk %</b> <br /> <b>${
          self.series.xAxis.categories[self.point.x]
        } - ${self.series.yAxis.categories[self.point.y]}:</b> <br />
        (${t("impact")} - ${t("probability")})</tr>
        <br />
        <br />
        ${showTopTenAssetsByRisk(self.point.asset_data)}
        </table>
        </div>`;
      },
    },
    series: [],
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
                const str = `${t("asset").toUpperCase()},${t(
                  "inherentrisk"
                ).toUpperCase()},${t("residualrisk").toUpperCase()},${t(
                  "cost"
                ).toUpperCase()},${t("impact").toUpperCase()},${t(
                  "probability"
                ).toUpperCase()}\n`;
                downloadRiskMatixCSV(
                  data.data,
                  data.xCategory,
                  data.yCategory,
                  str
                );
              },
            },
            {
              textKey: "downloadXLS",
              text: `${t("downloadXLS")}`,
              onclick: function () {
                // @ts-ignore
                const strArr = [
                  { value: t("asset").toUpperCase() },
                  { value: t("inherentrisk").toUpperCase() },
                  { value: t("residualrisk").toUpperCase() },
                  { value: t("cost").toUpperCase() },
                  { value: t("impact").toUpperCase() },
                  { value: t("probability").toUpperCase() },
                ];
                downloadRiskMatrixXLSX(
                  data.data,
                  data.xCategory,
                  data.yCategory,
                  strArr
                );
              },
            },
          ],
        },
      },
    },
    credits: {
      enabled: false,
    },
  });

  useEffect(() => {
    if (chartRef.current) {
      const chart = chartRef.current;
      chart.chart.reflow();
    }

    return () => {
      // Clean up the chart instance when the component unmounts
      if (chartRef.current) {
        const chart = chartRef.current;
        chart.chart.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.chart.reflow();
    }
  }, [chartLoaded]);

  useEffect(() => {
    setOptions((prev: any) => {
      const newObj = {
        ...prev,
        title: {
          ...prev.title,
          text: isSizeMini ? "" : data.title,
        },
        xAxis: {
          ...prev.xAxis,
          categories: data.xCategory,
          labels: {
            ...prev.xAxis.labels,
            enabled: isSizeMini ? false : true,
          },
        },
        yAxis: {
          ...prev.yAxis,
          categories: data.yCategory,
          labels: {
            ...prev.yAxis.labels,
            enabled: isSizeMini ? false : true,
          },
        },
        exporting: {
          ...prev.exporting,
          enabled: isSizeMini ? false : true,
        },
        tooltip: {
          ...prev.tooltip,
          enabled: isSizeMini ? false : true,
        },
        plotOptions: {
          ...prev.plotOptions,
          series: {
            cursor: "pointer",
            point: {
              events: {
                click: function (event: any) {
                  onHeatMapClick({
                    color: event.point.color,
                    count: event.point.count,
                    asset_data: event.point.asset_data,
                    x: event.point.x,
                    y: event.point.y,
                    xCategory: data.xCategory,
                    yCategory: data.yCategory,
                  });
                },
              },
            },
          },
        },
        series: cloneDeep([
          {
            ...data.data[0],
            dataLabels: {
              enabled: true,
              color: "#000000",
              style: {
                fontSize: "0.7rem",
                textOutline: "none",
              },
              format: "{point.count}",
            },
          },
        ]),
        colorAxis: {
          // stops: [
          //   [0, "#35B048"],
          //   [0.5, "#FFDC25"],
          //   [1, "#F30B0B"],
          // ],
          stops: [
            [0, "#198754"],
            [0.5, "#ffdd88"],
            [1, "#D83F31"],
          ],
        },
      };
      return newObj;
    });
  }, [data, isSizeMini, onHeatMapClick]);

  return (
    <>
      {data.data.length > 0 ? (
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          ref={chartRef}
          allowChartUpdate={true}
          immutable={false}
          updateArgs={[true, true, true]}
          containerProps={{ style: { width: "100%", height: "100%" } }}
        />
      ) : (
        <NoDataAvailable width="96%" />
      )}
    </>
  );
}
