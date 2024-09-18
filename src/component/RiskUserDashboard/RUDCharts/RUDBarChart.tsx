import Highcharts from "../../../utils/HighchartImport";
import HighchartsReact from "highcharts-react-official";
import {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { fontStyle } from "../../highcharts/ChartStyles";
import { useTranslation } from "react-i18next";
import { formatLargeNumber } from "../../../utils/NumberConverter";
import { HiOutlineInformationCircle } from "react-icons/hi2";
import ReactTooltip from "react-tooltip";
import NoDataAvailable from "../../reuseableComp/NoDataAvailable";

interface TbarData {
  onChartClick?: (val: string) => void;
  data: {
    datalabels: boolean;
    title: string;
    category: string[];
    y_axis_label: string;
    data: {
      name: string;
      color?: string;
      pointPadding?: number;
      pointPlacement?: number;
      opacity?: number;
      data: (null | number)[];
    }[];
  };
}

const RUDBarChart = forwardRef(({ data, onChartClick }: TbarData, ref) => {
  const chartRef = useRef<any>();
  const [showTooltip, setShowToolTip] = useState(false);
  const [chartLoaded, setChartLoaded] = useState(false);

  const { t } = useTranslation();

  useImperativeHandle(ref, () => {
    return chartRef.current;
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

  const [option, setOption] = useState({
    chart: {
      type: "column",
      backgroundColor: "transparent",
      zoomType: "x",
      style: {
        ...fontStyle,
      },
      events: {
        load: function () {
          setChartLoaded(true);
        },
      },
    },

    title: {
      text: data.title,
      align: "left",
      style: {
        ...fontStyle,
        fontSize: "0.85rem",
      },
    },

    legend: {
      enabled: false,
      align: "right",
      verticalAlign: "middle",
      layout: "vertical",
    },

    xAxis: {
      categories: data.category,
      labels: {
        style: {
          ...fontStyle,
          fontSize: "0.5rem",
        },
      },
    },

    yAxis: {
      allowDecimals: false,
      type: data.datalabels ? "linear" : "logarithmic", // Use a logarithmic scale
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
      enabled: !data.datalabels,
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
          allowDecimals: false,
          type: data.datalabels ? "linear" : "logarithmic", // Use a logarithmic scale
          labels: {
            style: {
              ...fontStyle,
              fontSize: "1rem",
            },
          },
        },
        plotOptions: {
          column: {
            cursor: !data.datalabels && "pointer",
            stacking: !data.datalabels && "normal",
            borderWidth: 0,
            grouping: !data.datalabels,
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
        cursor: !data.datalabels && "pointer",
        stacking: !data.datalabels && "normal",
        borderWidth: 0,
        grouping: !data.datalabels,
        shadow: false,
        dataLabels: {
          enabled: data.datalabels,
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
        return !data.datalabels
          ? `<tr><td style="color: ${point.color}; padding: 0;">` +
              point.series.name +
              ": </td>" +
              '<td style="padding: 0;"><b>' +
              formattedY +
              "</b></td></tr>"
          : `<tr><td style="color: var(--font-color); padding: 0;">` +
              point.series.name +
              ": </td>" +
              '<td style="padding: 0;"><b>' +
              formattedY +
              "</b></td></tr>";
      },
    },
    series: data.data,
  });

  const toolTipText = `<div style="background: var(--bg-color);color: var(--font-color);  padding: 0.5em;">
  <table>
  <tr>
  <td>
  <b>${t("possible")} ${t("combinations")} { ${t("impact")} , ${t(
    "probability"
  )} }</b>
  </td>
  </tr>
  <tr>
  <td>
  <b>${t("verylow")}:</b> { ${t("verylow")} , ${t("rare")}  }, { ${t(
    "verylow"
  )} , ${t("unlikely")} }, { ${t("low")} , ${t("rare")} }
  </td>
  </tr>
  <tr>
  <td>
  <b>${t("low")}:</b> { ${t("verylow")} , ${t("possible")}  }, { ${t(
    "low"
  )} , ${t("unlikely")} }, { ${t("low")} , ${t("possible")} }, { ${t(
    "medium"
  )} , ${t("rare")}}, {${t("medium")} , ${t("unlikely")}}
  </td>
  </tr>
  <tr>
  <td>
  <b>${t("medium")}:</b> { ${t("verylow")} , ${t("likely")}  }, { ${t(
    "verylow"
  )} , ${t("verylikely")} }, { ${t("low")} , ${t("likely")} }, { ${t(
    "low"
  )} , ${t("verylikely")}}, {${t("medium")} , ${t("possible")}}, { High, ${t(
    "rare"
  )} }, { ${t("high")} , ${t("unlikely")} }, { ${t("veryhigh")} , ${t(
    "rare"
  )} }, { ${t("veryhigh")} , ${t("unlikely")} }
  </td>
  </tr>
  <tr>
  <td>
  <b>${t("high")}:</b> { ${t("medium")} , ${t("likely")} }, { ${t(
    "medium"
  )} , ${t("verylikely")} }, { ${t("high")} , ${t("possible")}  }, { ${t(
    "high"
  )} , ${t("likely")} }, { ${t("veryhigh")} , ${t("possible")} }
  </td>
  </tr>
  <tr>
  <td>
  <b>${t("veryhigh")}:</b> { ${t("high")} , ${t("verylikely")}  }, { ${t(
    "veryhigh"
  )} , ${t("likely")} }, { ${t("veryhigh")} , ${t("verylikely")} }
  </td>
  </tr>
  </table>
  </div>`;

  return (
    <>
      {data.data.length > 0 ? (
        <div className="d-flex w-100 h-100">
          <HighchartsReact
            highcharts={Highcharts}
            ref={chartRef}
            options={option}
            containerProps={{
              style: { width: "100%", height: "100%", flex: 1 },
            }}
          />

          {!data.datalabels && (
            <>
              <HiOutlineInformationCircle
                fontSize="1.25rem"
                data-tip={toolTipText}
                data-for={data.title}
                className="rud_tooltip_icon"
                onMouseEnter={() => setShowToolTip(true)}
                onMouseLeave={() => setShowToolTip(false)}
              />
              <div className="rud_tooltip_data"></div>
              {showTooltip && (
                <ReactTooltip
                  html={true}
                  className="rud_tooltip"
                  id={data.title}
                  place="top"
                  type="light"
                  effect="float"
                  border
                  textColor="var(--entityonboarding-text-color)"
                  backgroundColor="var(--admin-card-bg-color)"
                  borderColor="var(--entityonboarding-text-color)"
                  getContent={(dataTip) => dataTip}
                />
              )}
            </>
          )}
        </div>
      ) : (
        <NoDataAvailable width="96%" />
      )}
    </>
  );
});

export default RUDBarChart;
