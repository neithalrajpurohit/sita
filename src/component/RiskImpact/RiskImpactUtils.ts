import { orderBy, uniqBy } from "lodash";
import { v4 } from "uuid";

export interface Process {
  process_name: string;
  process_id: string;
  id: number;
  parent_id: string;
}

export interface FunctionProcess {
  function_name: string;
  function_id: string;
  id: number;
  process: Process[];
}

export interface RGUData {
  id: null | number;
  revenue: string;
  revenue_unit: string;
  rgu_name: string;
  rgu_color: string;
  functions_processes: FunctionProcess[];
}

export interface OutputData {
  id: string;
  revenue: string;
  revenue_unit: string;
  rgu_name: string;
  rgu_color: string;
  function_name: string;
  function_id: string;
  process_id: string;
  process_name: string;
}

export function transformData(input: RGUData[]): OutputData[] {
  const output: OutputData[] = [];

  input.forEach((rguData) => {
    rguData.functions_processes.forEach((functionProcess) => {
      functionProcess.process.forEach((process, index) => {
        output.push({
          id: v4(),
          revenue: rguData.revenue,
          revenue_unit: rguData.revenue_unit,
          rgu_name: rguData.rgu_name,
          rgu_color: rguData.rgu_color,
          function_name: functionProcess.function_name,
          process_name: process.process_name,
          function_id: functionProcess.function_id,
          process_id: process.process_id,
        });
      });
    });
  });

  return output;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
}

function calculateLuminance(r: number, g: number, b: number): number {
  const gammaCorrect = (c: number) => {
    const sRGB = c / 255;
    return sRGB <= 0.03928
      ? sRGB / 12.92
      : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  };

  const rLinear = gammaCorrect(r);
  const gLinear = gammaCorrect(g);
  const bLinear = gammaCorrect(b);

  return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
}

export function getRandomHexColor(usedColors: Set<string> = new Set()): string {
  let color = "#";
  let isAccessible = false;

  while (!isAccessible) {
    /// Generate random RGB components
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    // Convert RGB to a hex color string
    color = `#${r.toString(16).padStart(2, "0")}${g
      .toString(16)
      .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;

    // Check if the color has already been used
    if (!usedColors.has(color)) {
      usedColors.add(color);

      // Convert the color to RGB and calculate its luminance
      const rgbColor = hexToRgb(color);
      const luminance = calculateLuminance(rgbColor.r, rgbColor.g, rgbColor.b);

      // Check for sufficient contrast and brightness
      if (luminance >= 0.1 && luminance <= 1) {
        isAccessible = true;
      }
    }

    if (!isAccessible) {
      color = "#"; // Reset color and try again
    }
  }

  return color;
}

export interface GroupedFunctionData {
  id: number;
  function_id: string;
  function_name: string;
  process: Process[];
}

export function groupProcessesByFunction(
  data: FunctionProcess[]
): GroupedFunctionData[] {
  const groupedData: GroupedFunctionData[] = [];

  data.forEach((item) => {
    const existingGroup = groupedData.find(
      (group) => group.function_id === item.function_id
    );

    if (existingGroup) {
      existingGroup.process.push(...item.process);
    } else {
      groupedData.push({
        id: item.id,
        function_id: item.function_id,
        function_name: item.function_name,
        process: [...item.process],
      });
    }
  });

  groupedData.forEach((group) => {
    group.process = uniqBy(group.process, "id");
  });

  const orderedGroupData = orderBy(groupedData, ["id"], ["asc", "desc"]);
  return orderedGroupData;
}
