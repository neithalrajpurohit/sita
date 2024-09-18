import { useRef, useEffect, useMemo } from "react";
import { HighchartsReact } from "highcharts-react-official";
import Highcharts from "../../utils/HighchartImport";
import { fontStyle } from "../../component/highcharts/ChartStyles";
import { trimString } from "../../utils/Common";
import { useTranslation } from "react-i18next";
import NoDataAvailable from "../../component/reuseableComp/NoDataAvailable";

const RosiChart = ({ data, ...props }: any) => {
  const { t } = useTranslation();

  const chartRef: any = useRef();

  const options: any = {
    chart: {
      type: "column",
      backgroundColor: null,
      zoomType: "x",
      style: {
        ...fontStyle,
      },
    },
    title: {
      text:
        data?.title + `  ( ${t("overall")} : ${data?.total_rosi?.toFixed(2)}%)`,
      align: "left",
      style: {
        ...fontStyle,
        fontWeight: 700,
        fontSize: "0.85rem",
      },
    },
    subtitle: {
      useHTML: true,
      text: `<div style="padding:0; margin:0;color:var(--font-color);text-align:center;">${data?.sub_title}</div>`,
      floating: false,
      align: "left",
      verticalAlign: "top",
      style: {
        ...fontStyle,
        fontSize: "0.725rem",
        fontWeight: "700",
      },
    },
    credits: {
      enabled: false,
    },

    plotOptions: {
      series: {
        enableMouseTracking: true,
      },
      column: {
        borderWidth: 0,
        borderRadius: 0,
        dataLabels: {
          enabled: true,
          inside: false,
          crop: false,
          overflow: "allow",
          color: "var(--font-color)",
          style: {
            textOutline: "none",
          },
          formatter: function (): any {
            let self: any = this;
            return self.y + " %"; // Custom label format
          },
        },
      },
    },
    exporting: {
      chartOptions: {
        chart: {
          backgroundColor: "#FFF",
        },
        title: {
          style: {
            ...fontStyle,
            fontSize: "1rem",
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
    xAxis: {
      crosshair: false,
      categories: data?.category?.map((item: any) => {
        let isTrim = data?.category?.length;
        let FUNCTION_COUNT = 4;

        let formattedLabel = trimString(item, 6);
        let value = isTrim <= FUNCTION_COUNT ? item : formattedLabel;
        return `<span style="color: var(--font-color)">${value}</span>`;
      }),
      labels: {
        style: {
          fontWeight: "bold",
        },
      },

      title: {
        text: data?.label,
        y: 10,
        x: -20,
        style: {
          ...fontStyle,
          textTransform: "uppercase",
          fontSize: "0.5rem",
        },
      },

      formatter: function (): any {
        let self: any = this;
        return self.y + " %"; // Custom label format
      },
    },
    yAxis: {
      title: {
        text: `<div>${t("percentageofinvestment").toUpperCase()}</div>`,
        style: {
          color: "var(--font-color)",
        },
      },
      tickInterval: 22,
      showFirstLabel: true,
      gridLineColor: "var( --rosi-horizontal-line-color)",
      // min: -80,
      labels: {
        staggerLines: 1,
        enabled: true, // Enable the labels on the yAxis
        style: {
          color: "var(--font-color)",
        },
      },
      plotLines: [
        {
          value: 0,
          color: "var(--font-color)",
          width: 1,
        },
      ],
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      enabled: true,
      useHTML: true,
      formatter: function (): any {
        let self: any = this;
        return `<div style="background: var(--bg-color);color: var(--font-color); padding: 0.5em;">
        <table>
        <tr>
        <td>${self.key}:<b style="color: var(--font-color);">${self.y}%</b></td>
        </tr>
        </table>
        </div>`;
      },
    },
    series: [
      {
        name: data?.title,
        data: data?.data,
      },
    ],
  };

  useEffect(() => {
    if (chartRef.current) {
      const chart = chartRef.current;
      props.onRef(chartRef.current);
      chart?.chart?.reflow();
    }

    return () => {
      // Clean up the chart instance when the component unmounts
      if (chartRef.current) {
        const chart = chartRef.current;
        chart.chart.destroy();
      }
    };
  }, [data]);

  return (
    <>
      {data?.data?.length > 0 ? (
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

export default RosiChart;
