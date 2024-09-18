// Instead Of Importing From Library Using This To Export XLSX file On XLS Click To Avoid Warning

import * as Highcharts from "highcharts";
import exporting from "highcharts/modules/exporting";
import exportData from "highcharts/modules/export-data";
import offlineExporting from "highcharts/modules/offline-exporting";

// Initialize exporting modules
exporting(Highcharts);
exportData(Highcharts);
offlineExporting(Highcharts);

require("./highcharts-xlsx-plugin");

export default Highcharts;
