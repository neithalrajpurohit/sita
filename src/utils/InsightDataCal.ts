import moment from "moment";
import { max, orderBy, uniq } from "lodash";
import { format, utcToZonedTime } from "date-fns-tz";
// @ts-ignore
import * as Locales from "react-date-range/dist/locale";

interface MyObject {
  value: string | null;
}
interface MyObject2 {
  createdDate: string;
  priority: string;
}

interface PriorityCount {
  priority: string;
  count: number;
}
interface MyObject4 {
  value: string;
  eventCount: number;
}

export const FilterKeyVal = "Filtered-";

export function getIntervalCountsWithEventCount(
  arr: MyObject4[]
): { value: string; count: number; totalEventCount: number }[] {
  if (arr.length === 0) {
    return [];
  } else {
    const countObj: {
      [key: string]: { count: number; totalEventCount: number };
    } = {};

    arr.forEach((obj) => {
      if (!countObj[obj.value]) {
        countObj[obj.value] = { count: 1, totalEventCount: obj.eventCount };
      } else {
        countObj[obj.value].count++;
        countObj[obj.value].totalEventCount += obj.eventCount;
      }
    });

    const countArr = Object.entries(countObj).map(
      ([value, { count, totalEventCount }]) => ({
        value,
        count,
        totalEventCount,
      })
    );

    return countArr;
  }
}

export function getIntervalCounts(
  arr: MyObject[]
): { value: string; count: number | any }[] {
  if (arr.length === 0) {
    return [];
  } else {
    const countObj = arr.reduce((acc: any, curr: any) => {
      if (!acc[curr.value]) {
        acc[curr.value] = 1;
      } else {
        acc[curr.value]++;
      }
      return acc;
    }, {});

    const countArr = Object.entries(countObj).map(([value, count]) => ({
      value,
      count,
    }));

    return countArr;
  }
}

export function getPriorityCountsByDate(
  arr: MyObject2[]
): { createdDate: string; priorityCounts: PriorityCount[] }[] {
  if (arr.length === 0) {
    return [];
  } else {
    const countObj: { [createdDate: string]: { [priority: string]: number } } =
      arr.reduce((acc: any, curr: any) => {
        if (!acc[curr.createdDate]) {
          acc[curr.createdDate] = {};
        }

        if (!acc[curr.createdDate][curr.priority]) {
          acc[curr.createdDate][curr.priority] = 1;
        } else {
          acc[curr.createdDate][curr.priority]++;
        }

        return acc;
      }, {} as { [createdDate: string]: { [priority: string]: number } });

    const countArr = Object.entries(countObj).map(
      ([createdDate, priorityCounts]) => ({
        createdDate,
        priorityCounts: Object.entries(priorityCounts).map(
          ([priority, count]) => ({ priority, count })
        ),
      })
    );

    return countArr;
  }
}

interface InputData {
  [createdDate: string]: {
    [priority: string]: number;
  };
}

function getDataType(
  inputData: InputData
): "multi_year" | "multi_month" | "single_month" {
  const years = new Set<string>();

  // Iterate over all the keys in inputData and add the year part to a Set
  for (const dateStr in inputData) {
    const date = moment(dateStr, "DD-MM-YYYY");
    const year = date.year().toString();
    years.add(year);
  }

  // If there's more than one year, it's a "multi_year" dataset
  if (years.size > 1) {
    return "multi_year";
  }

  // If there's only one year, check if there are multiple months or just one
  const months = new Set<string>();
  for (const dateStr in inputData) {
    const date = moment(dateStr, "DD-MM-YYYY");
    const monthYear = date.format("MM-YYYY");
    months.add(monthYear);
  }

  if (months.size > 1) {
    return "multi_month";
  } else {
    return "single_month";
  }
}

function groupByMonth(obj: {
  [createdDate: string]: { [priority: string]: number };
}) {
  const groupedObj: {
    [createdDate: string]: { [priority: string]: number };
  } = {};
  for (const key in obj) {
    // dont not remove the day word from below array it breaks the logic
    const [day, month, year] = key.split("-");
    const monthKey = `${month}-${year}`;
    if (!groupedObj[monthKey]) {
      groupedObj[monthKey] = {};
    }
    for (const subKey in obj[key]) {
      if (groupedObj[monthKey][subKey]) {
        groupedObj[monthKey][subKey] += obj[key][subKey];
      } else {
        groupedObj[monthKey][subKey] = obj[key][subKey];
      }
    }
  }
  return groupedObj;
}

function sumByYear(data: InputData): InputData {
  const result: InputData = {};

  for (const dateStr in data) {
    const date = moment(dateStr, "DD-MM-YYYY");
    const year = date.year();

    for (const category in data[dateStr]) {
      const value = data[dateStr][category];
      if (!result[year]) {
        result[year] = {};
      }
      if (!result[year][category]) {
        result[year][category] = 0;
      }
      result[year][category] += value;
    }
  }

  return result;
}

function addMissingDates(
  data: [string, null | number][],
  dateArr: string[]
): [string, null | number][] {
  const datesArray = dateArr;
  const uniqueDates = Array.from(new Set(datesArray));
  const startDate = new Date(
    Math.min(
      ...uniqueDates.map((date) =>
        moment(date, "DD-MM-YYYY").toDate().getTime()
      )
    )
  );
  const endDate = new Date(
    Math.max(
      ...uniqueDates.map((date) =>
        moment(date, "DD-MM-YYYY").toDate().getTime()
      )
    )
  );
  const oneDay = 24 * 60 * 60 * 1000;
  const newData: [string, null | number][] = [];
  let currentDate = startDate;
  while (currentDate <= endDate) {
    const dateString = moment(currentDate).format("DD-MM-YYYY");
    let dateExists = false;
    for (let i = 0; i < data.length; i++) {
      if (data[i][0] === dateString) {
        newData.push(data[i]);
        dateExists = true;
        break;
      }
    }
    if (!dateExists) {
      newData.push([dateString, null]);
    }
    currentDate = new Date(currentDate.getTime() + oneDay);
  }

  return newData;
}

function addMissingMonths(
  data: [string, null | number][],
  dateArr: string[]
): [string, null | number][] {
  const datesArray = dateArr;
  const uniqueDates = Array.from(new Set(datesArray));
  const startMonthYear = moment(
    Math.min(
      ...uniqueDates.map((date) =>
        moment(date, ["DD-MM-YYYY", "MM-YYYY"])
          .startOf("month")
          .toDate()
          .getTime()
      )
    )
  );
  const endMonthYear = moment(
    Math.max(
      ...uniqueDates.map((date) =>
        moment(date, ["DD-MM-YYYY", "MM-YYYY"])
          .endOf("month")
          .toDate()
          .getTime()
      )
    )
  );
  const newData: [string, null | number][] = [];

  let currentMonthYear = moment(startMonthYear);
  while (currentMonthYear.isSameOrBefore(endMonthYear, "month")) {
    const monthYearString = currentMonthYear.format("MM-YYYY");
    const matchingEntry = data.find(([date]) => date === monthYearString);

    if (matchingEntry) {
      newData.push(matchingEntry);
    } else {
      newData.push([monthYearString, null]);
    }

    currentMonthYear.add(1, "month");
  }

  return newData;
}

function addMissingYears(
  data: [string, null | number][],
  dateArr: string[]
): [string, null | number][] {
  const datesArray = dateArr;
  const uniqueDates = Array.from(new Set(datesArray));
  const startYear = moment(
    Math.min(
      ...uniqueDates.map((date) =>
        moment(date, ["DD-MM-YYYY", "MM-YYYY", "YYYY"])
          .startOf("year")
          .toDate()
          .getTime()
      )
    )
  );
  const endYear = moment(
    Math.max(
      ...uniqueDates.map((date) =>
        moment(date, ["DD-MM-YYYY", "MM-YYYY", "YYYY"])
          .endOf("year")
          .toDate()
          .getTime()
      )
    )
  );
  const newData: [string, null | number][] = [];

  let currentYear = moment(startYear);
  while (currentYear.isSameOrBefore(endYear, "year")) {
    const yearString = currentYear.format("YYYY");
    const matchingEntry = data.find(([date]) => date === yearString);

    if (matchingEntry) {
      newData.push(matchingEntry);
    } else {
      newData.push([yearString, null]);
    }

    currentYear.add(1, "year");
  }

  return newData;
}

export function getTypeOfData(arr: MyObject2[]) {
  const dayWiseFormat = arr.reduce((acc, curr) => {
    if (!acc[curr.createdDate]) {
      acc[curr.createdDate] = {};
    }

    if (!acc[curr.createdDate][curr.priority]) {
      acc[curr.createdDate][curr.priority] = 1;
    } else {
      acc[curr.createdDate][curr.priority]++;
    }

    return acc;
  }, {} as { [createdDate: string]: { [priority: string]: number } });

  const dataType = getDataType(dayWiseFormat);
  return dataType;
}

export function getXAxisRange(
  dateArr: string[],
  type: "multi_year" | "multi_month" | "single_month"
) {
  let xRange: string[] = [];
  switch (type) {
    case "single_month":
      xRange = dateArr;
      break;
    case "multi_month":
      xRange = uniq(
        dateArr.map((f) => moment(f, "DD-MM-YYYY").format("MM-YYYY"))
      );
      break;
    case "multi_year":
      xRange = uniq(dateArr.map((f) => moment(f, "DD-MM-YYYY").format("YYYY")));
      break;

    default:
      break;
  }

  return xRange;
}

interface DateObject {
  createdDate: string;
}

function getStartDateAndEndDate(dates: DateObject[]): {
  startDate: string;
  endDate: string;
} {
  if (!dates || dates.length === 0) {
    return { startDate: "", endDate: "" };
  }
  const lang = sessionStorage.getItem("lang");

  const uniqueDatesSet = new Set<string>();
  for (const dateObj of dates) {
    uniqueDatesSet.add(dateObj.createdDate);
  }

  const uniqueDatesArray = Array.from(uniqueDatesSet).map((dateStr) =>
    moment(dateStr, "DD-MM-YYYY").toDate()
  );
  const sortedDates = uniqueDatesArray.sort(
    (a, b) => a.getTime() - b.getTime()
  );

  const srtDate = moment(sortedDates[0]).format("DD-MM-YYYY");
  const edDate = moment(sortedDates[sortedDates.length - 1]).format(
    "DD-MM-YYYY"
  );

  const startDate = format(
    moment(srtDate, "DD-MM-YYYY").toDate(),
    "dd MMMM yyyy",
    {
      timeZone: "UTC",
      locale: Locales[lang] === undefined ? Locales["enUS"] : Locales[lang],
    }
  );
  const endDate = format(
    moment(edDate, "DD-MM-YYYY").toDate(),
    "dd MMMM yyyy",
    {
      timeZone: "UTC",
      locale: Locales[lang] === undefined ? Locales["enUS"] : Locales[lang],
    }
  );

  return { startDate, endDate };
}

export function getPriorityCountsByDate4(
  arr: MyObject2[],
  dateArr: string[],
  type: "multi_year" | "multi_month" | "single_month"
): {
  BarChartData: { name: string; data: [string, number | null][] }[];
  BarChartXCategory: string[];
} {
  const dayWiseFormat = arr.reduce((acc, curr) => {
    if (!acc[curr.createdDate]) {
      acc[curr.createdDate] = {};
    }

    if (!acc[curr.createdDate][curr.priority]) {
      acc[curr.createdDate][curr.priority] = 1;
    } else {
      acc[curr.createdDate][curr.priority]++;
    }

    return acc;
  }, {} as { [createdDate: string]: { [priority: string]: number } });

  let countObj: {
    [createdDate: string]: { [priority: string]: number };
  } = {};

  let xCategory: string[] = [];

  switch (type) {
    case "single_month":
      countObj = dayWiseFormat;
      xCategory = Object.keys(countObj).map((f) =>
        moment(f, "DD-MM-YYYY").format("DD MMM")
      );
      break;
    case "multi_month":
      countObj = groupByMonth(dayWiseFormat);
      xCategory = Object.keys(countObj).map((f) =>
        moment(f, "MM-YYYY").format("MMM YY")
      );

      break;
    case "multi_year":
      countObj = sumByYear(dayWiseFormat);
      xCategory = Object.keys(countObj).map((f) =>
        moment(f, "YYYY").format("YYYY")
      );
      break;
    default:
      break;
  }

  const lang = sessionStorage.getItem("lang");

  const prioritySet = new Set(arr.map((obj) => obj.priority));
  const countArr = [];

  for (const priority of Array.from(prioritySet)) {
    const priorityData: [string, number | null][] = [];

    for (const createdDate in countObj) {
      const count = countObj[createdDate][priority] || null;
      priorityData.push([createdDate, count]);
    }

    if (type === "single_month") {
      countArr.push({
        name: priority,
        data: addMissingDates(priorityData, dateArr),
      });
      xCategory = addMissingDates(priorityData, dateArr).map((d) => {
        const date = moment(d[0], "DD-MM-YYYY").toDate();
        let formattedDate = format(date, "dd MMM", {
          timeZone: "UTC",
          locale: Locales[lang] === undefined ? Locales["enUS"] : Locales[lang],
        });
        return formattedDate;
      });
    } else if (type === "multi_month") {
      countArr.push({
        name: priority,
        data: addMissingMonths(priorityData, dateArr),
      });
      xCategory = addMissingMonths(priorityData, dateArr).map((c) => {
        const date = moment(c[0], "MM-YYYY").toDate();
        let formattedDate = format(date, "MMM yy", {
          timeZone: "UTC",
          locale: Locales[lang] === undefined ? Locales["enUS"] : Locales[lang],
        });
        return formattedDate;
      });
    } else {
      countArr.push({
        name: priority,
        data: addMissingYears(priorityData, dateArr),
      });
      xCategory = addMissingYears(priorityData, dateArr).map((c) =>
        moment(c[0], "YYYY").format("YYYY")
      );
    }
  }

  return { BarChartData: countArr, BarChartXCategory: xCategory };
}

function getColorForSeverity(severity: string): string {
  const val = severity.includes(FilterKeyVal)
    ? severity.replace(FilterKeyVal, "")
    : severity;
  switch (val.toLowerCase()) {
    case "critical":
      return "#D83F31";
    case "high":
      return "#ec8e5d";
    case "medium":
      return "#ffdd88";
    case "low":
      return "#80ab77";
    default:
      // You can choose to throw an error, return a default color, or handle it as per your requirement.
      return "#000";
  }
}

function getColorForValue(
  actualValue: number,
  maxValue: number | undefined
): string {
  // Normalize the value to be between 0 and 1
  const maxNumber = maxValue === undefined ? 1 : maxValue;
  const normalizedValue = actualValue / maxNumber;

  // Define color range
  const colorRange = ["#198754", "#80ab77", "#ffdd88", "#ec8e5d", "#D83F31"];

  // Calculate the index based on the normalized value
  const index = Math.min(
    Math.floor(normalizedValue * (colorRange.length - 1)),
    colorRange.length - 1
  );

  return colorRange[index];
}

export function getMasterData(
  dataSet: {
    id: number;
    alert_type: string;
    asset_name: string;
    type_name: string;
    status_name: string;
    created_time: string;
    alert_severity: string;
    itsm_id: string;
    description: string;
    event_count: number;
    priority_name: string;
    group_name: string;
    created_time_epoch: string;
    alert_last_updated_time: string;
  }[],
  filters?: { key: string; value: string }[]
) {
  let filteredDataSet = dataSet;

  let FilterKey = "";

  if (filters && filters.length > 0) {
    filteredDataSet = dataSet.filter((item: any) =>
      filters.every((filter) => item[filter.key] === filter.value)
    );
    FilterKey = FilterKeyVal;
  }

  const pastelColors = [
    "#19A7CE",
    "#0A4D68",
    "#3C486B",
    "#917FB3",
    "#A9907E",
    "#00FFCA",
    "#D14D72",
    "#0081C9",
    "#7FBCD2",
    "#FB9800",
    "#D61355",
    "#65647C",
    "#FD8A8A",
  ];

  const RawAlertTypeData = getIntervalCountsWithEventCount(
    filteredDataSet.map((f) => ({
      value: f.alert_type,
      eventCount: f.event_count,
    }))
  );
  const maxValofAlertType = max(RawAlertTypeData.map((alert) => alert.count));
  const AlertType = RawAlertTypeData.map((g, index) => ({
    title: g.value,
    eventCount: g.count,
    val: Number(((g.count * 100) / dataSet.length).toFixed(2)),
    color: getColorForValue(g.count, maxValofAlertType),
  })).sort((a, b) => b.val - a.val);

  const AlertByAssets = getIntervalCountsWithEventCount(
    filteredDataSet.map((f) => ({
      value: f.asset_name,
      eventCount: f.event_count,
    }))
  );

  const withColorTop5Alert = AlertByAssets.map((g) => {
    return {
      title: g.value,
      eventCount: g.count,
      val: Number(((g.count * 100) / dataSet.length).toFixed(2)),
    };
  })
    .sort((a, b) => b.val - a.val)
    .slice(0, 10);

  const maxvValAlertCount = max(
    withColorTop5Alert.map((alert) => alert.eventCount)
  );

  const Top5Alert = withColorTop5Alert.map((g, index) => {
    return {
      ...g,
      color: getColorForValue(g.eventCount, maxvValAlertCount),
    };
  });

  const { startDate, endDate } = getStartDateAndEndDate(
    filteredDataSet.map((f) => ({
      createdDate: moment(
        utcToZonedTime(new Date(f.created_time), "UTC")
      ).format("DD-MM-YYYY"),
    }))
  );

  const dateRangeString = `  ( ${startDate} - ${endDate} )`;

  const PieChart1 = getIntervalCounts(
    filteredDataSet.map((f) => ({ value: f.type_name }))
  ).map((g) => [g.value, g.count, g.value + dateRangeString]);

  const PieChart2 = getIntervalCounts(
    filteredDataSet.map((f) => ({ value: f.status_name }))
  ).map((g) => [g.value, g.count, g.value + dateRangeString]);

  const typeOfD = getTypeOfData(
    filteredDataSet.map((f) => ({
      createdDate: moment(
        utcToZonedTime(new Date(f.created_time), "UTC")
      ).format("DD-MM-YYYY"),
      priority: f.alert_severity,
    }))
  );

  const arrofDateRange = getXAxisRange(
    dataSet.map((f) =>
      moment(utcToZonedTime(new Date(f.created_time), "UTC")).format(
        "DD-MM-YYYY"
      )
    ),
    typeOfD
  );

  const { BarChartData } = getPriorityCountsByDate4(
    dataSet.map((f) => ({
      createdDate: moment(
        utcToZonedTime(new Date(f.created_time), "UTC")
      ).format("DD-MM-YYYY"),
      priority: f.alert_severity,
    })),
    arrofDateRange,
    typeOfD
  );

  const FilteredBarChartData = getPriorityCountsByDate4(
    filteredDataSet.map((f) => ({
      createdDate: moment(
        utcToZonedTime(new Date(f.created_time), "UTC")
      ).format("DD-MM-YYYY"),
      priority: FilterKey + f.alert_severity,
    })),
    arrofDateRange,
    typeOfD
  );

  function getBarChartDataNewFn() {
    const colors = [
      "#19A7CE",
      "#FB9800",
      "#D61355",
      "#65647C",
      "#FD8A8A",
      "#3C486B",
      "#917FB3",
      "#088395",
      "#CE2A96",
      "#D14D72",
      "#0081C9",
      "#7FBCD2",
    ];
    if (filters !== undefined && filters.length > 0) {
      const oldData = BarChartData.map((g) => {
        return {
          ...g,
          pointPadding: 0,
          pointPlacement: 0,
          color: "rgba(214, 214, 214, 1)",
        };
      });
      const filtereData = FilteredBarChartData.BarChartData.map((g, index) => {
        return {
          ...g,
          pointPadding: 0,
          pointPlacement: 0,
          color: getColorForSeverity(g.name),
        };
      });

      return [...oldData, ...filtereData];
    } else {
      return FilteredBarChartData.BarChartData.map((g, index) => {
        return {
          ...g,
          pointPadding: 0,
          pointPlacement: 0,
          color: getColorForSeverity(g.name),
        };
      });
    }
  }

  const ReturnBarChartData = getBarChartDataNewFn();

  const gData = filteredDataSet.map((g) => {
    const {
      itsm_id,
      alert_type,
      description,
      created_time,
      status_name,
      priority_name,
      group_name,
      id,
      alert_last_updated_time,
    } = g;
    return {
      Alert: itsm_id,
      AlertType: alert_type,
      AlertDetails: description.replace(/\s+/g, " ").trim(),
      StartDate: new Date(created_time).getTime(),
      LastUpdated: new Date(alert_last_updated_time).getTime(),
      STATUS: status_name,
      LEVEL: priority_name,
      OWNER: group_name,
      ID: id,
    };
  });

  const GridData = orderBy(gData, ["StartDate"], ["desc"]);

  return {
    Top5Alert: Top5Alert,
    PieChart1: PieChart1,
    PieChart2: PieChart2,
    AlertType: AlertType,
    BarChartData: ReturnBarChartData,
    BarChartXCategory: FilteredBarChartData.BarChartXCategory,
    GridData: GridData,
  };
}

export function getRandomColor(): string {
  const pastelColors = [
    "#19A7CE",
    "#FB9800",
    "#D61355",
    "#65647C",
    "#FD8A8A",
    "#3C486B",
    "#917FB3",
    "#088395",
    "#CE2A96",
    "#D14D72",
    "#0081C9",
    "#7FBCD2",
  ];
  const randomIndex = Math.floor(Math.random() * pastelColors.length);
  return pastelColors[randomIndex];
}

type InputObjectType = { key: string; value: string };

export function internalFilterArray(arr: InputObjectType[]): InputObjectType[] {
  if (arr.length === 0) {
    return [];
  }

  const objKeys: { [key: string]: number } = {};
  const filteredArray: InputObjectType[] = [];

  for (let i = 0; i < arr.length; i++) {
    const obj = arr[i];
    const key = obj["key"];

    objKeys[key] = i;
    if (!filteredArray.some((item) => item["key"] === key)) {
      filteredArray.push(obj);
    } else {
      filteredArray.splice(
        filteredArray.findIndex((item) => item["key"] === key),
        1,
        obj
      );
    }
  }

  return filteredArray.slice(-2);
}
