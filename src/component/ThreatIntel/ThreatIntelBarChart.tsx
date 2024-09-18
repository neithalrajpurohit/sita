import Highcharts from "../../utils/HighchartImport";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useRef, useState } from "react";
import { fontStyle } from "../highcharts/ChartStyles";
import { useTranslation } from "react-i18next";
import { ThreatIntelBarCharts } from "../../store/ThreatIntel/ThreatIntelType";
import { formatLargeNumber } from "../../utils/NumberConverter";
import NoDataAvailable from "../reuseableComp/NoDataAvailable";
import { capitalizeFirstLetter } from "../../utils/FirstCharCapital";

interface ThreatIntelBarChartProps {
  onChartClick?: (val: string) => void;
  data: ThreatIntelBarCharts;
}

const ThreatIntelBarChart: React.FC<ThreatIntelBarChartProps> = ({
  data,
  onChartClick,
}) => {
  const chartRef = useRef<any>();
  const { t } = useTranslation();
  const [option, setOption] = useState({
    chart: {
      type: "column",
      backgroundColor: "transparent",
      zoomType: "x",
      style: {
        ...fontStyle,
      },
    },

    title: {
      text: "",
    },

    legend: {
      enabled: false,
    },

    xAxis: {
      categories: [...data.category.map((cat) => capitalizeFirstLetter(cat))],
      labels: {
        style: {
          ...fontStyle,
          fontSize: "0.5rem",
        },
      },
    },

    yAxis: {
      allowDecimals: false,
      type: "linear", // Use a logarithmic scale
      title: {
        text: data.y_axis_label.toUpperCase(),
        style: {
          ...fontStyle,
          fontSize: "0.65rem",
        },
      },
      labels: {
        style: {
          ...fontStyle,
          fontSize: "0.5rem",
        },
      },
    },
    credits: { enabled: false },
    exporting: {
      enabled: true,
      chartOptions: {
        chart: {
          backgroundColor: "#FFF",
        },
        title: {
          text: data.title,
          align: "left",
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
          allowDecimals: false,
          type: "linear", // Use a logarithmic scale
          labels: {
            style: {
              ...fontStyle,
              fontSize: "1rem",
            },
          },
        },
        plotOptions: {
          column: {
            stacking: "normal",
            borderWidth: 0,
            grouping: true,
            shadow: false,
            dataLabels: {
              enabled: true,
              crop: false,
              overflow: "allow",
              color: "var(--font-color)",
              style: {
                ...fontStyle,
                textOutline: "none",
                fontSize: "0.35rem",
                fontWeight: 700,
              },
              formatter: function (): any {
                let self: any = this;
                return formatLargeNumber(self.y);
                //  + " M"; // Custom label format
              },
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
      column: {
        stacking: "normal",
        borderWidth: 0,
        grouping: true,
        shadow: false,
        dataLabels: {
          enabled: false,
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
        // groupPadding: 0.35,
        // pointPadding: 0.25,
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
        point: {
          events: {
            click: function (event: any) {
              onChartClick?.(event.point.category);
            },
          },
        },
      },
    },
    tooltip: {
      headerFormat:
        '<div style="background: var(--bg-color);color: var(--font-color); padding: 0.5em;" >{point.x}<table>',
      pointFormat:
        '<tr><td style="color:var(--font-color);padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y}</b></td></tr>',
      footerFormat: "</table> </div>",
      shared: true,
      useHTML: true,
      pointFormatter: function (): any {
        let point: any = this;
        // Format the point.y value here.
        var formattedY = formatLargeNumber(point.y);
        return (
          `<tr><td style="color: ${point.color}; padding: 0;">` +
          point.series.name +
          ": </td>" +
          '<td style="padding: 0;"><b>' +
          formattedY +
          "</b></td></tr>"
        );
      },
    },
    series: data.data,
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
    setOption((prev) => {
      return {
        ...prev,
        xAxis: {
          ...prev.xAxis,
          categories: [
            ...data.category.map((cat) => capitalizeFirstLetter(cat)),
          ],
        },
        yAxis: {
          ...prev.yAxis,
          title: {
            ...prev.yAxis.title,
            text: data.y_axis_label.toUpperCase(),
          },
        },
        series: data.data,
      };
    });
  }, [data.category, data.data, data.y_axis_label]);

  return (
    <>
      {data.data.length > 0 ? (
        <HighchartsReact
          highcharts={Highcharts}
          ref={chartRef}
          options={option}
          containerProps={{
            style: { width: "100%", height: "85%" },
          }}
        />
      ) : (
        <NoDataAvailable width="97%" height="85%" />
      )}
    </>
  );
};

export default ThreatIntelBarChart;
