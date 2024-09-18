import { useEffect, useRef } from "react";
import Highcharts from "../../utils/HighchartImport";
import HighchartsReact from "highcharts-react-official";
import { fontStyle } from "../../component/highcharts/ChartStyles";
import { useTranslation } from "react-i18next";
import { formatLargeNumber } from "../../utils/NumberConverter";
import NoDataAvailable from "../../component/reuseableComp/NoDataAvailable";

interface AssetAndFunctionChartProps {
  title: string;
  expense: string;
  value: number;
  total: string;
  colors?: string[];
  data: any;
  onRef: Function;
  onChartClick?: (
    val: string | object,
    filters: "GeoLocation" | "Function" | "Process",
    filterType: "Function" | "Asset"
  ) => void;
}

const FunctionAndAssetChart = ({
  title,
  expense,
  total,
  value,
  data,
  onChartClick,
  onRef,
}: AssetAndFunctionChartProps) => {
  const { t } = useTranslation();
  const chartRef = useRef<any>();

  const newData =
    data?.series &&
    data?.series[0]?.data?.map((item: any, i: any) => {
      return {
        ...item,
        key: item.id,
      };
    });
  let newSeries: any = [];

  if (data?.series) {
    newSeries = [
      {
        ...data?.series[0],
        data: newData,
      },
    ];
  }

  const options = {
    chart: {
      backgroundColor: null,
      events: {
        render: function () {
          var chart: any = this,
            subtitle = chart.subtitle;

          // Calculate the vertical position to center the subtitle
          var centerY = chart.plotHeight / 8;
          // Update the subtitle's y position to center it vertically
          if (subtitle) {
            subtitle.update({
              y: centerY,
              x: 0,
            });
          }
        },
      },
    },
    title: {
      text: title,
      align: "left",
      // x: 10,
      style: {
        ...fontStyle,
        fontSize: "0.85rem",
      },
    },
    credits: {
      enabled: false,
    },
    subtitle: {
      useHTML: true,
      text: `<div style='color: var(--font-color);'>${expense}</div> <div style='text-align:center;color: var(--font-color);'>${value}%</div> <div style='text-align:center; color: var(--font-color);'>Total: ${data?.total_expense}<div>`,
      floating: false,
      align: "center",
      verticalAlign: "middle",
      style: {
        ...fontStyle,
        fontSize: "0.525rem",
        fontWeight: "700",
      },
    },
    legend: {
      itemWidth: 80,
      itemHoverStyle: {
        fontSize: "0.45rem",
        textOverflow: "allow",
        color: "var(--font-color)",
      },
      itemStyle: {
        fontSize: "0.45rem",
        textOverflow: "allow",
        color: "var(--font-color)",
      },
      align: "left",
      verticalAlign: "bottom",
      layout: "vertical",

      floating: true,
      maxHeight: 280,

      labelFormatter: function (): any {
        let self: any = this;
        let trimLength = data?.legends[self.index]?.title?.length;
        let trimmedLabel = data?.legends[self.index]?.title?.substring(0, 10);
        return trimLength <= 10
          ? trimmedLabel
          : data?.legends[self.index]?.title;
      },
      style: {
        ...fontStyle,
        fontSize: "0.5rem",
      },
    },

    tooltip: {
      enabled: true,
      useHTML: true,
      style: {
        ...fontStyle,
        fontSize: "0.65rem",
        fontWeight: "bold",
      },
      formatter: function (): any {
        let self: any = this;
        if (title === t("securityinvestmentfunction").toUpperCase()) {
          return `<div style="background: var(--bg-color);color: var(--font-color); padding: 0.5em;">
          <table>
          <tr>
          <td style="color:var(--font-color);padding:0">
          ${self.point.title}
          </td>
          </tr>
          </table>
          </div>`;
        }
        return `<div style="background: var(--bg-color);color: var(--font-color); padding: 0.5em;">
        <table>
        <tr>
        <td>
        ${self.point.title}
        </td>
        </tr>
        <tr>
        <td>
        Total Asset Count:<b>${self.point?.total_asset_count}</b>
        </td>
        </tr>
        <tr>
        <td>
        Average Asset Cost:<b>${self.point?.avg_asset_cost}</b>
        </td>
        </tr>
        </table>
        </div>`;
      },
    },

    plotOptions: {
      series: {
        enableMouseTracking: true,
        borderWidth: 0,
        states: {
          inactive: {
            opacity: 1,
          },
          hover: {
            enabled: true,
            opacity: 1,
          },
        },
        colorByPoint: true,
        type: "pie",
        size: "75%",
        innerSize: "65%",
        events: {
          click: function (event: any) {
            if (title === t("securityinvestmentassets").toUpperCase()) {
              onChartClick?.(event.point, "Function", "Asset");
            } else {
              onChartClick?.(event.point.options.title, "Function", "Function");
            }
          },
        },
        dataLabels: {
          enabled: true,
          crop: true,
          distance: 10,
          formatter: function (): any {
            let self: any = this;
            return (
              self.point.name + `(${formatLargeNumber(self.point.amount)})`
            );
          },
          style: {
            ...fontStyle,
            textOutline: "none",
            fontSize: "0.625rem",
          },
        },
      },
      pie: {
        allowPointSelect: false,
        cursor: "pointer",
        states: {
          inactive: {
            opacity: 1,
          },
          hover: {
            enabled: true,
            opacity: 1,
          },
        },
        dataLabels: {
          enabled: true,
          crop: true,
          distance: 10,
          formatter: function (): any {
            let self: any = this;
            return (
              self.point.name + `(${formatLargeNumber(self.point.amount)})`
            );
          },
          style: {
            ...fontStyle,
            textOutline: "none",
            fontSize: "0.625rem",
          },
        },
        showInLegend: true,
      },
    },

    series: newSeries,
    exporting: {
      chartOptions: {
        chart: {
          backgroundColor: "#FFF",
          events: {
            render: function () {
              var chart: any = this,
                subtitle = chart.subtitle;
              if (subtitle) {
                subtitle.update({
                  y: 0,
                  x: 0,
                });
              }
            },
          },
        },
        subtitle: {
          useHTML: true,
          floating: true,
          text: `<div style='color: var(--font-color);'>${expense}</div> <div style='text-align:center;color: var(--font-color);'>${value}%</div> <div style='text-align:center; color: var(--font-color);'>Total: ${data?.total_expense}<div>`,
          verticalAlign: "bottom",
          align: "left",
          style: {
            ...fontStyle,
            fontSize: "0.75rem",
          },
        },
        title: {
          style: {
            ...fontStyle,
            fontSize: "0.85rem",
            lineHight: 0,
          },
        },
        legend: {
          enabled: false,
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
        plotOptions: {
          series: {
            enableMouseTracking: true,
            borderWidth: 0,
            states: {
              inactive: {
                opacity: 1,
              },
              hover: {
                enabled: true,
                opacity: 1,
              },
            },
            colorByPoint: true,
            type: "pie",
            size: "50%",
            innerSize: "65%",
            dataLabels: {
              enabled: true,
              crop: false,
              connectorShape: "crookedLine",
              crookDistance: "70%",
              alignTo: "plotEdges",
              distance: 20,
              formatter: function (): any {
                let self: any = this;
                return (
                  self.point.title +
                  " " +
                  self.point.name +
                  " " +
                  `(${formatLargeNumber(self.point.amount)})`
                );
              },
              style: {
                ...fontStyle,
                textOutline: "none",
                fontSize: "0.45rem",
              },
            },
          },
          pie: {
            allowPointSelect: false,
            cursor: "pointer",
            dataLabels: {
              enabled: true,
              crop: false,
              connectorShape: "crookedLine",
              crookDistance: "70%",
              alignTo: "plotEdges",
              distance: 20,
              formatter: function (): any {
                let self: any = this;
                return (
                  self.point.title +
                  " " +
                  self.point.name +
                  " " +
                  `(${formatLargeNumber(self.point.amount)})`
                );
              },
              style: {
                ...fontStyle,
                textOutline: "none",
                fontSize: "0.45rem",
              },
            },
            showInLegend: true,
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
  };
  useEffect(() => {
    if (chartRef.current) {
      onRef(chartRef.current);
      chartRef.current.chart.reflow();
    }
  });

  let dataLength =
    data?.series &&
    data?.series[0]?.data?.filter((item: any) => {
      return Math.floor(item[0]) <= 0 ? false : true;
    });

  return (
    <>
      {data?.legends?.length >= 1 && dataLength?.length >= 1 ? (
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          ref={chartRef}
          containerProps={{
            style: {
              width: "100%",
              height: "100%",
              flex: 1,
            },
          }}
        />
      ) : (
        <NoDataAvailable width="96%" />
      )}
    </>
  );
};

export default FunctionAndAssetChart;
