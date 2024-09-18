import { useRef } from "react";
import { HighchartsReact } from "highcharts-react-official";
import Highcharts from "highcharts";
import { fontStyle } from "../component/highcharts/ChartStyles";
import { trimString } from "../utils/Common";
import { useTranslation } from "react-i18next";
import NoDataAvailable from "./reuseableComp/NoDataAvailable";

const GeneralRosiChart = ({ data }: any) => {
  const { t } = useTranslation();

  const chartRef: any = useRef();

  const options: any = {
    chart: {
      type: "column",
      backgroundColor: null,
      style: {
        ...fontStyle,
      },
    },
    title: {
      text: ``,

      align: "left",
      x: 20,
      y: 5,
    },
    credits: {
      enabled: false,
    },

    plotOptions: {
      series: {
        enableMouseTracking: true,
      },
      column: {
        borderLeftTopRadius: "2%",
        pointWidth: 18,
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
      enabled: false,
    },

    xAxis: {
      crosshair: false,
      categories: data?.category?.map((item: any) => {
        let isTrim = data?.category?.length;
        let FUNCTION_COUNT = 4;

        let formattedLabel = trimString(item, 6);

        return `
          <span style='display:none;'>${item}</span>
          <span style="font-size:9px; color: var(--font-color)">${
            isTrim <= FUNCTION_COUNT ? item : formattedLabel
          }</span>  
        `;
      }),
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
        <td>${self.key}: <b style="color: var(--font-color);">${self.y}%</b></td>
        </tr>
        </table>
        </div>`;
      },
    },
    series: [
      {
        name: data.title,
        data: data?.data,
        dataLabels: {
          enabled: true,
          y: -2, // Set a negative value to display the labels on top of the bars
        },
      },
    ],
  };

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

export default GeneralRosiChart;
