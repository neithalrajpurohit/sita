import Highcharts from "../../../utils/HighchartImport";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useRef, useState } from "react";
import { fontStyle } from "../../highcharts/ChartStyles";
import { useTranslation } from "react-i18next";

interface RingChart {
  data: {
    title: string;
    inner_value_1: string;
    inner_value_2: string;
    budget_value: string;
    colors: string[];
    data: {
      type: string;
      name: string;
      data: (number | null)[];
    }[];
  };
  dynamicFont: string;
  exporting: boolean;
  containerMaxHeight: string;
  isSmall: boolean;
}

export default function RUDPieChart({
  data,
  dynamicFont,
  exporting,
  containerMaxHeight,
  isSmall,
}: RingChart) {
  const chartRef = useRef<any>();
  const { t } = useTranslation();
  const timeoutId = useRef<any>();

  const [chartLoaded, setChartLoaded] = useState(false);
  const [donutChartOptions, setDonutChartOptions] = useState({
    chart: {
      type: "pie",
      backgroundColor: null,
      reflow: true,
      events: {
        load: function (event: any): any {
          // alert("Chart loaded with series :" + this.series[0].name);
          setChartLoaded(true);
        },
      },
    },
    title: {
      text: data.title,
      align: "center",
      margin: 0,
      style: {
        ...fontStyle,
        fontSize: "0.85rem",
      },
    },

    subtitle: {
      useHTML: true,
      text: `<div style="padding: 0; margin: 0; color: var(--font-color); text-align: center;">${data.inner_value_1}</div>`,
      floating: true,
      verticalAlign: "middle",
      style: {
        ...fontStyle,
        fontSize: dynamicFont,
        fontWeight: "400",
      },
    },

    legend: {
      enabled: false,
    },

    tooltip: {
      enabled: false,
    },

    plotOptions: {
      pie: {
        borderWidth: 0,
        colorByPoint: true,
        // type: "pie",
        size: "100%",
        innerSize: "85%",
        dataLabels: {
          enabled: false,
        },
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
          text: `<div style="padding: 0; margin: 0; color: var(--font-color); text-align: center;">${data.inner_value_1}</div>`,
          floating: true,
          verticalAlign: "middle",
          style: {
            ...fontStyle,
            fontSize: "1.5rem",
            fontWeight: "700",
          },
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
    credits: {
      enabled: false,
    },
    colors: data.colors,
    series: data.data,
  });

  useEffect(() => {
    setDonutChartOptions((prev: any) => {
      return {
        ...prev,
        chart: {
          ...prev.chart,
          events: {
            render: function () {
              var chart: any = this;
              var subtitle = chart.subtitle;

              var divideby = isSmall ? 7.5 : 5.5;
              // Calculate the vertical position to center the subtitle
              var centerY = chart.plotHeight / divideby;

              // Update the subtitle's y position to center it vertically
              if (subtitle) {
                subtitle.update({
                  y: centerY,
                });
              }
            },
          },
        },
        title: {
          ...prev.title,
          text: data.title,
          style: {
            ...prev.title.style,
            fontSize: isSmall ? "0.75rem" : "0.85rem",
            whiteSpace: "nowrap",
          },
        },
        subtitle: {
          ...prev.subtitle,
          verticalAlign: "middle",
          align: "center",
          text: `<div style="padding:0; margin:0; text-align:center;font-size:${dynamicFont}; color:var(--font-color);"><b>${data.inner_value_1}</b></div>`,
        },
        series: data.data,
        colors: data.colors,
        exporting: {
          ...prev.exporting,
          enabled: false,
        },
      };
    });
  }, [data, dynamicFont, exporting, isSmall]);

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
      clearTimeout(timeoutId.current);
    };
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.chart.reflow();
    }
  }, [chartLoaded]);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      ref={chartRef}
      options={donutChartOptions}
      containerProps={{
        style: {
          width: "100%",
          height: "100%",
          maxHeight: containerMaxHeight,
          flex: 1,
        },
      }}
    />
  );
}
