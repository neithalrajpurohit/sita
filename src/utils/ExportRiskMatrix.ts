import zipcelx from "zipcelx";

export function downloadRiskMatixCSV(
  data: any[],
  xCategory: string[],
  yCategory: string[],
  headerString: string
) {
  // Create CSV content
  let csvContent = headerString;

  // Map over the data array
  data.forEach((category) => {
    category.data.forEach((item: any) => {
      // Get the corresponding values for x and y from xCategory and yCategory arrays
      const xValue = xCategory[item.x];
      const yValue = yCategory[item.y];
      // Map over the assets array for each item
      item.asset_data.forEach((asset: any) => {
        // Split the asset string to get the name and percentage
        const { asset_name, residual_risk, inherent_risk, cost } = asset;
        // Combine asset, x, and y into a CSV row
        const csvRow = `${asset_name.trim()},${inherent_risk.trim()},${residual_risk.trim()},${cost.trim()},${xValue},${yValue},\n`;

        // Append the row to the CSV content
        csvContent += csvRow;
      });
    });
  });

  // Create a Blob from the CSV content
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

  // Create a download link and trigger the download
  const link = document.createElement("a");
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "RiskMatrix.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export function downloadRiskMatrixXLSX(
  data: any[],
  xCategory: string[],
  yCategory: string[],
  headerStrArr: { value: string }[]
) {
  // Prepare the dataset for zipcelx
  const zipcelxData: any[] = [headerStrArr];

  // Map over the data array
  data.forEach((category) => {
    category.data.forEach((item: any) => {
      // Get the corresponding values for x and y from xCategory and yCategory arrays
      const xValue = xCategory[item.x];
      const yValue = yCategory[item.y];

      // Map over the assets array for each item
      item.asset_data.forEach((asset: any) => {
        // Split the asset string to get the name and percentage
        const { asset_name, residual_risk, inherent_risk, cost } = asset;

        // Add a new row to the zipcelx dataset
        zipcelxData.push([
          { value: asset_name.trim() },
          { value: inherent_risk.trim() },
          { value: residual_risk.trim() },
          { value: cost.trim() },
          { value: xValue },
          { value: yValue },
        ]);
      });
    });
  });

  // Trigger the download using zipcelx
  zipcelx({
    filename: "RiskMatrix",
    sheet: {
      data: zipcelxData,
    },
  });
}
