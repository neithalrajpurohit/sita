import Highcharts from "../utils/HighchartImport";
import HighchartsReact from "highcharts-react-official";
import highchartsMore from "highcharts/highcharts-more.js";
import solidGauge from "highcharts/modules/solid-gauge.js";

highchartsMore(Highcharts);
solidGauge(Highcharts);

interface RiskGuageProps {
  needles: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

const GuageChart = (props: RiskGuageProps) => {
  const { needles } = props;
  const options = {
    chart: {
      type: "gauge",
      backgroundColor: null,
      // backgroundColor: "#373434",
      plotBackgroundColor: null,
      plotBackgroundImage: null,
      plotBorderWidth: 0,
      plotShadow: false,
      height: "75%",
    },
    credits: { enabled: false },
    title: {
      text: "",
    },

    pane: {
      startAngle: -90,
      endAngle: 89.9,
      background: null,
      center: ["50%", "75%"],
      size: "110%",
    },

    // the value axis
    yAxis: {
      min: 0,
      max: 100,
      tickPixelInterval: 72,
      tickPosition: "inside",
      tickColor: "var(--card-bg-color)",
      tickLength: 20,
      tickWidth: 2,
      minorTickInterval: null,
      labels: {
        distance: 20,
        style: {
          fontSize: "0.875rem",
          color: "var(--font-color)",
        },
      },
      plotBands: [
        {
          from: 0,
          to: 40,
          color: "#1DBC36", // green
          thickness: 20,
        },
        {
          from: 40,
          to: 70,
          color: "#F0AE0C", // yellow
          thickness: 20,
        },
        {
          from: 70,
          to: 100,
          color: "#B72A35", // red
          thickness: 20,
        },
      ],
    },

    exporting: {
      enabled: false,
    },
    series: needles.map((needle) => {
      return {
        name: needle.name,
        data: [needle.value],
        tooltip: {
          valueSuffix: "%",
          pointFormat: `<span style="color:${needle.color}">\u25CF</span> ${needle.name}: <b>${needle.value} %</b><br/>`,
        },
        dataLabels: {
          enabled: false,
        },
        dial: {
          radius: "80%",
          backgroundColor: needle.color,
          baseWidth: 12,
          baseLength: "0%",
          rearLength: "0%",
        },
        pivot: {
          backgroundColor: needle.color,
          radius: 8,
        },
      };
    }),
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default GuageChart;
