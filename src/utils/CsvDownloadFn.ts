function convertToCsv(data: any[]): string {
  const csvRows = [];

  // Header row
  const headerRow = Object.keys(data[0]);
  csvRows.push(headerRow.join(","));

  // Data rows
  for (const row of data) {
    const csvRow = [];
    for (const field of headerRow) {
      let value = row[field];
      if (typeof value === "string" && value.includes(",")) {
        // Add double quotes around the value if it contains a comma
        value = `"${value}"`;
      }
      csvRow.push(value);
    }
    csvRows.push(csvRow.join(","));
  }

  return csvRows.join("\n");
}

export function downloadDataAsCsv(data: any[], fileName: string): void {
  const csvContent = convertToCsv(data);
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

  // For other browsers
  const link = document.createElement("a");
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", fileName);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
