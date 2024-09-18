import Highcharts from "../../utils/HighchartImport";
import HighchartsReact from "highcharts-react-official";
import variablePie from "highcharts/modules/variable-pie";
import { useEffect, useRef, useState } from "react";
import { fontStyle } from "../highcharts/ChartStyles";
import { useTranslation } from "react-i18next";
import { ThreatIntelPieCharts } from "../../store/ThreatIntel/ThreatIntelType";
import NoDataAvailable from "../reuseableComp/NoDataAvailable";
import { capitalizeFirstLetter } from "../../utils/FirstCharCapital";

variablePie(Highcharts);

interface ThreatIntelPieChartProps {
  onChartClick?: (val: string) => void;
  data: ThreatIntelPieCharts;
}

const ThreatIntelPieChart: React.FC<ThreatIntelPieChartProps> = ({
  data,
  onChartClick,
}) => {
  const chartRef = useRef<any>();
  const { t } = useTranslation();
  const [donutChartOptions, setDonutChartOptions] = useState({
    chart: {
      type: "variablepie",
      backgroundColor: null,
      reflow: true,
    },
    title: {
      text: "",
    },
    subtitle: {
      useHTML: true,
      text: `<div><p style="padding:0; margin:0;color:var(--font-color);text-align:center;"><b>${data.inner_value_1}</b></p> 
            <p style="padding:0px; margin:0px;text-align:center;color:var(--font-color); "><b>${data.inner_value_2}</b></p>
            </div>`,
      floating: true,
      verticalAlign: "middle",
      y: 10,
    },

    legend: {
      enabled: false,
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
        ${capitalizeFirstLetter(self.point.options.name.split("-")[0])}
        </td>
        </tr>
        <tr>
        <td style="color: ${self.point.color};">
        ${t("criticality")} - ${self.point.options.name.split("-")[1]}
        </td>
        </tr>
        <tr>
        <td>
        ${t("alertcount")}  - ${
          self.point.alertCount
        } (${self.percentage.toFixed()}%)
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
            opacity: 0.6,
          },
        },
        colorByPoint: true,
        type: "pie",
        size: "100%",
        innerSize: "65%",
        dataLabels: {
          enabled: true,
          crop: true,
          distance: 2,
          connectorShape: "crookedLine",
          crookDistance: "20%",
          alignTo: "plotEdges",
          style: {
            ...fontStyle,
            textOutline: "none",
            fontSize: "0.625rem",
          },
          formatter: function (): any {
            let self: any = this;
            return capitalizeFirstLetter(self.point.name.split("-")[0]);
          },
        },
      },
      pie: {
        allowPointSelect: false,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          crop: true,
          distance: 2,
          formatter: function (): any {
            let self: any = this;
            return self.point.name.split("-")[0].toUpperCase();
          },
          style: {
            textOutline: "none",
            fontSize: "0.625rem",
          },
        },
        showInLegend: true,
      },
    },
    exporting: {
      chartOptions: {
        chart: {
          backgroundColor: "#FFF",
          events: {
            render: function () {
              var chart: any = this,
                subtitle = chart.subtitle;

              // Calculate the vertical position to center the subtitle
              var centerY = chart.plotHeight / 6;

              // Update the subtitle's y position to center it vertically
              if (subtitle) {
                subtitle.update({
                  y: centerY,
                });
              }
            },
          },
        },
        subtitle: {
          useHTML: true,
          text: `<div><p style="padding:0; margin:0;color:var(--font-color);text-align:center;"><b>${data.inner_value_1}</b></p> 
              <p style="padding:0px; margin:0px;text-align:center;color:var(--font-color); "><b>${data.inner_value_2}</b></p>
              </div>`,
          floating: true,
          verticalAlign: "middle",
          y: 10,
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
                opacity: 0.6,
              },
            },
            colorByPoint: true,
            type: "pie",
            size: "100%",
            innerSize: "65%",
            dataLabels: {
              enabled: true,
              crop: true,
              distance: 2,
              connectorShape: "crookedLine",
              crookDistance: "5%",
              alignTo: "plotEdges",
              style: {
                ...fontStyle,
                textOutline: "none",
                fontSize: "0.5rem",
              },
              formatter: function (): any {
                let self: any = this;
                return capitalizeFirstLetter(self.point.name.split("-")[0]);
              },
            },
          },
          pie: {
            allowPointSelect: false,
            cursor: "pointer",
            dataLabels: {
              enabled: true,
              crop: true,
              distance: 2,
              formatter: function (): any {
                let self: any = this;
                return self.point.name.split("-")[0].toUpperCase();
              },
              style: {
                textOutline: "none",
                fontSize: "0.5rem",
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
    credits: {
      enabled: false,
    },
    series: data.data,
  });

  useEffect(() => {
    if (chartRef.current) {
      const chart = chartRef.current;
      chart.chart.reflow();
      chart.chart.redraw();
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
    setDonutChartOptions((prev) => {
      return {
        ...prev,
        subtitle: {
          useHTML: true,
          text: `<div><p style="padding:0; margin:0;color:var(--font-color);text-align:center;"><b>${data.inner_value_1}</b></p> 
                  <p style="padding:0px; margin:0px;text-align:center;color:var(--font-color); "><b>${data.inner_value_2}</b></p>
                  </div>`,
          floating: true,
          verticalAlign: "middle",
          y: 10,
        },
        series: data.data.map((record) => ({
          ...record,
          type: "variablepie",
          data: record.data.map((dataset) => ({
            ...dataset,
            z: Number((dataset.y / 0.0002).toFixed(2)),
            y: Number(dataset.y.toFixed(2)),
          })),
        })),
      };
    });
  }, [data.data, data.inner_value_1, data.inner_value_2]);

  return (
    <>
      {data.data[0]?.data.length > 0 ? (
        <HighchartsReact
          highcharts={Highcharts}
          ref={chartRef}
          options={donutChartOptions}
          containerProps={{
            style: {
              width: "100%",
              height: "85%",
            },
          }}
        />
      ) : (
        <NoDataAvailable width="97%" height="85%" />
      )}
    </>
  );
};

export default ThreatIntelPieChart;
