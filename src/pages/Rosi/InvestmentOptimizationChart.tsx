import { HighchartsReact } from "highcharts-react-official";
import Highcharts from "../../utils/HighchartImport";
import { fontStyle } from "../../component/highcharts/ChartStyles";
import { useTranslation } from "react-i18next";

import { useRef, useEffect } from "react";
import { formatLargeNumber } from "../../utils/NumberConverter";
import NoDataAvailable from "../../component/reuseableComp/NoDataAvailable";

const InvestmentOptimizationChart = ({ data, ...props }: any) => {
  const { t } = useTranslation();
  const chartRef = useRef<any>();

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.chart.reflow();
      props.onRef(chartRef.current);
    }
  }, [chartRef]);

  const formattedData = data?.data?.map((items: any, i: number) => {
    return {
      ...items,
      pointPadding: i % 2 === 0 ? 0.2 : 0.3,
      pointPlacement: 0,
      index: i,
    };
  });

  const options = {
    chart: {
      type: "column",
      backgroundColor: null,
      zoomType: "x",
      style: {
        ...fontStyle,
      },
    },
    title: {
      text: t("investmentoptimizationchart").toUpperCase(),
      align: "left",
      style: {
        ...fontStyle,
        fontSize: "0.85rem",
      },
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      column: {
        // sorting: false,
        grouping: false,
        shadow: true,
        borderWidth: 0,
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
            return formatLargeNumber(self.y);
            //  + " M"; // Custom label format
          },
        },
      },
      series: {
        animation: false,
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
      },
    },
    legend: {
      enabled: false,
    },
    xAxis: {
      categories: data?.function_name,
      labels: {
        // align: "center",
        style: {
          ...fontStyle,
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
    },
    yAxis: [
      {
        tickInterval: 0.01,
        title: {
          text: `<div style='color: var(--font-color);'>${t(
            "investment"
          ).toUpperCase()}</div>`,
          style: {
            fontWeight: "bold",
          },
        },
        showFirstLabel: false,
        gridLineColor: "var( --rosi-horizontal-line-color)",

        labels: {
          style: {
            fontWeight: "bold",
            color: "var(--font-color)",
          },
          formatter: function (): any {
            let self: any = this;
            return formatLargeNumber(self.value);
          },
        },
        // lineColor: "#000000",
        lineWidth: 0,
      },
    ],
    tooltip: {
      shared: true,
      useHTML: true,
      formatter: function (): any {
        let self: any = this;
        let functionName: string = self.x;
        return `<div style="background: var(--bg-color);color: var(--font-color); padding: 0.5em;">
        <table>
        <tr>
        <td>${functionName}</td>
        </tr>
        <tr>
        <td>
        Estimated Risk Value:<b>
        ${formatLargeNumber(self.points[1].y)}
        </b>
        </td>
        </tr>
        <tr>
        <td>
        Cost Of Controls:<b>
        ${formatLargeNumber(self.points[0].y)}
        </b>
        </td> 
        </tr>
        </table>
        </div>`;
      },
    },
    series: formattedData,
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
  };
  let isData: boolean = false;
  data?.data?.find((item: any) => {
    if (item?.data.length <= 0) {
      isData = false;
    } else {
      isData = true;
    }
    return item?.data?.length >= 0 ? true : false;
  });

  return (
    <>
      {data?.function_name?.length > 0 && isData ? (
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

export default InvestmentOptimizationChart;
