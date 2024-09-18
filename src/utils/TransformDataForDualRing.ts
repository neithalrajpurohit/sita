interface InputData {
  inherent_risk: {
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
  residual_risk: {
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
}

export interface OutputDataOfRingChart {
  name: string;
  data: Array<{
    name: string;
    color: string;
    radius: string;
    innerRadius: string;
    budgetValue: string;
    y: number | null;
  }>;
}

export function transformDataForDualRingChart(
  input: InputData
): OutputDataOfRingChart[] {
  const output: OutputDataOfRingChart[] = [];
  if (input !== undefined) {
    if (input.inherent_risk) {
      const inherentRisk = input.inherent_risk;
      output.push({
        name: inherentRisk?.title,
        data: [
          {
            name: inherentRisk?.title,
            color: inherentRisk?.colors[1],
            radius: "100%",
            innerRadius: "85%",
            budgetValue: inherentRisk?.budget_value,
            y: inherentRisk?.data[0]?.data[1],
          },
        ],
      });
    }

    if (input.residual_risk) {
      const residualRisk = input.residual_risk;
      output.push({
        name: residualRisk?.title,
        data: [
          {
            name: residualRisk?.title,
            color: residualRisk?.colors[1],
            radius: "80%",
            innerRadius: "65%",
            budgetValue: residualRisk?.budget_value,
            y: residualRisk?.data[0]?.data[1],
          },
        ],
      });
    }
  }

  return output;
}
