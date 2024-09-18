import Highcharts from "../../utils/HighchartImport";

import HighchartsReact from "highcharts-react-official";
import highchartsMore from "highcharts/highcharts-more.js";
import solidGauge from "highcharts/modules/solid-gauge.js";

import { useState, useRef, useEffect } from "react";
import { OutputDataOfRingChart } from "../../utils/TransformDataForDualRing";
import { fontStyle } from "./ChartStyles";

import { useTranslation } from "react-i18next";

highchartsMore(Highcharts);
solidGauge(Highcharts);

interface DualRingChartProps {
  data: OutputDataOfRingChart[];
}

export default function DualRingChart({ data }: DualRingChartProps) {
  const chartRef = useRef<any>();
  const { t } = useTranslation();
  const [donutChartOptions, setDonutChartOptions] = useState({
    chart: {
      type: "solidgauge",
      backgroundColor: null,
    },
    title: {
      text: null,
    },
    subtitle: {
      borderWidth: 0,
      backgroundColor: "none",
      shadow: false,
      shared: true,
      useHTML: true,
      verticalAlign: "middle",
      align: "center",
      style: {
        ...fontStyle,
        fontSize: "0.85rem",
      },
      text: `<table>
      <tr>
      <td style="color: ${data[0].data[0].color};">
      ${data[0].data[0].y}%  
      </td>
      </tr>
      <tr>
      <td style="color: ${data[1].data[0].color}; ">
      ${data[1].data[0].y}%  
      </td>
      </tr>
      </table>
      `,
      positioner: function (labelWidth: any): any {
        let self: any = this;
        return {
          x: (self.chart.chartWidth - labelWidth) / 2,
          y: self.chart.plotHeight / 2.5,
        };
      },
    },
    tooltip: {
      enabled: false,
    },
    yAxis: {
      min: 0,
      max: 100,
      lineWidth: 0,
      tickPositions: [],
    },
    pane: {
      startAngle: 0,
      endAngle: 360,
      background: null, // Set the background to null to remove the background ring
    },
    plotOptions: {
      solidgauge: {
        dataLabels: {
          enabled: false,
        },
        linecap: "round",
        stickyTracking: false,
        rounded: false,
      },
    },

    exporting: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },

    series: data,
  });

  useEffect(() => {
    if (chartRef.current) {
      const chart = chartRef.current;
      chart.chart.zoomOut();
      chart.chart.reflow();
      chart.chart.redraw();
    }
  }, []);

  useEffect(() => {
    setDonutChartOptions((prev) => ({
      ...prev,
      series: data,
    }));
  }, [data]);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={donutChartOptions}
      containerProps={{
        style: { width: "100%", height: "100%", flex: 1 },
      }}
      ref={chartRef}
      reflow={true}
    />
  );
}
