import * as Highcharts from "highcharts";
import zipcelx, { ZipCelXDataSet } from "zipcelx";

(function (H) {
  if (H.getOptions().exporting) {
    H.Chart.prototype.downloadXLS = function () {
      const div = document.createElement("div");
      let name = "Chart";
      let xlsxRows: ZipCelXDataSet = [];
      div.style.display = "none";
      document.body.appendChild(div);
      const rows = this.getDataRows(true);
      xlsxRows = rows.slice(1).map(function (row) {
        return row.map(function (column) {
          return {
            type: typeof column === "number" ? "number" : "string",
            value: column,
          };
        });
      });

      // Get the filename, copied from the Chart.fileDownload function
      if (this?.options?.exporting?.filename) {
        name = this.options.exporting.filename;
        //@ts-ignore
      } else if (this.title && this.title.textStr) {
        //@ts-ignore
        name = this.title.textStr.replace(/ /g, "_").toLowerCase();
      } else {
        name = "Chart";
      }

      zipcelx({
        filename: name,
        sheet: {
          data: xlsxRows,
        },
      });
    };
  }
})(Highcharts);
