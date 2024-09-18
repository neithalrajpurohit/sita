import { useRef, useEffect } from "react";
import Highcharts from "../../utils/HighchartImport";
import HighchartsReact from "highcharts-react-official";
import variablePie from "highcharts/modules/variable-pie";
import { fontStyle } from "../../component/highcharts/ChartStyles";
import { useTranslation } from "react-i18next";
import NoDataAvailable from "../../component/reuseableComp/NoDataAvailable";

variablePie(Highcharts);

const TotalInvestment = (data: any) => {
  const { t } = useTranslation();
  const chartRef = useRef<any>();
  const colors = [
    "#19A7CE",
    "#0E21A0",
    "#4D2DB7",
    "#91C8E4",
    "#1D5D9B",
    "#8BE8E5",
    "#7091F5",
    "#7091F5",
    "#4A55A2",
    "#78C1F3",
    "#7895CB",
    "#97FFF4",
    "#191D88",
    "#1450A3",
    "#337CCF",
    "#33BBC5",
  ];
  useEffect(() => {
    if (chartRef.current) {
      data.onRef(chartRef.current);
    }
  });
  const options = {
    chart: {
      type: "variablepie",
      backgroundColor: null,
    },
    title: {
      text: t("totalinvestment").toUpperCase(),
      align: "left",
      // y: 12,
      style: {
        ...fontStyle,
        fontSize: "0.85rem",
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
        return `<div style="background: var(--bg-color);color: var(--font-color); padding: 0.5em;">
        <table>
        <tr>
        <td>
        ${self.point.options.name}
        </td>
        </tr>
        <tr>
        <td>
        ${self.point.options.type}
        </td>
        </tr>
        <tr>
        <td>Cost:<b>${self.y}${self.point.currency}</b> </td>
        </tr>
        <tr>
        <td>Coverage:<b>${Math.round(self.percentage)}%</b> </td>
        </tr>
        </table>
        </div>`;
      },
    },

    plotOptions: {
      series: {
        colorByPoint: true,
        type: "variablepie",
        size: window.innerWidth > 2560 ? "100%" : "70%",
        dataLabels: {
          enabled: true,
          connectorShape: "crookedLine",
          crookDistance: "70%",
          alignTo: "plotEdges",
          format: "{point.name}",
          style: {
            ...fontStyle,
            textOutline: "none",
            fontSize: "0.625rem",
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
    credits: {
      enabled: false,
    },
    xAxis: {
      categories: [],
    },

    series: [
      {
        ...data?.data,
        colors,
        minPointSize: 70,
        innerSize: "20%",
        zMin: 0,
        name: "",
        borderRadius: 5,
        borderWidth: 0,
      },
    ],
  };
  return (
    <>
      {data?.data?.data?.length > 0 ? (
        <HighchartsReact
          ref={chartRef}
          containerProps={{
            style: {
              width: "100%",
              height: "100%",
              flex: 1,
            },
          }}
          highcharts={Highcharts}
          options={options}
        />
      ) : (
        <NoDataAvailable width="96%" />
      )}
    </>
  );
};

export default TotalInvestment;
