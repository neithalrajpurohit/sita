import { format, utcToZonedTime } from "date-fns-tz";
import moment from "moment";
// @ts-ignore
import * as Locales from "react-date-range/dist/locale";
import { InvalidDate } from "./Application";

export const DateToString = (
  payload: any,
  locales?: string | null | undefined
) => {
  const lang = sessionStorage.getItem("lang");
  const newDate = new Date(payload);
  // Convert the date to UTC time zone
  const utcDate = utcToZonedTime(newDate, "UTC");
  let formattedDate = format(utcDate, "dd MMMM yyyy", {
    timeZone: "UTC",
    locale:
      Locales[lang] === undefined
        ? Locales["enUS"]
        : Locales[lang] === null
        ? Locales["enUS"]
        : Locales[lang],
  });
  return formattedDate;
};

export const DateToStringGrid = (
  payload: any,
  locales?: string | null | undefined
) => {
  const lang = sessionStorage.getItem("lang");
  const newDate = new Date(payload);

  let formattedDate = format(newDate, "dd MMMM yyyy", {
    timeZone: "UTC",
    locale:
      Locales[lang] === undefined
        ? Locales["enUS"]
        : Locales[lang] === null
        ? Locales["enUS"]
        : Locales[lang],
  });
  return formattedDate;
};

export const DateForGrid = (payload: any) => {
  return format(new Date(payload), "dd MMMM yy");
};

export const DateForFilter = (payload: any) => {
  return format(new Date(payload), "dd MMMM yy");
};

export const DateToStringForDashboardCards = (payload: any) => {
  return moment(moment.utc(payload).toDate()).format("DD MMMM YY");
};

// Function to check if a string is an IP address
function isIPAddress(input: any) {
  // Regular expression for IPv4 addresses
  var ipv4Regex =
    /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$/;

  // Test the input against the IPv4 regex
  return ipv4Regex.test(input);
}

export const DFG = (payload: any) => {
  // Check if the input is an IP address before parsing it as a date
  if (isIPAddress(payload)) {
    return payload;
  }

  if (
    String(moment.utc(payload, "DD-MM-YYYY").toDate()).toLowerCase() ===
    InvalidDate.toLowerCase()
  ) {
    return InvalidDate;
  }
  return moment.utc(payload, "DD-MM-YYYY").format("DD MMM YY");
};

export const trimString = (title: string, maxLength: number) => {
  if (title.length > maxLength) {
    return title.slice(0, maxLength) + "...";
  }
  return title;
};
