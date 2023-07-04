import { DataFilterOption } from "../components/telemetry/LapTelemetryQuery/DataFilter";

export const getQualiFilter = (): DataFilterOption[] => {
  return [
    {
      id: 0,
      label: "Speed",
      property: "Speed",
    },
    {
      id: 1,
      label: "Throttle",
      property: "Throttle",
    },
    {
      id: 3,
      label: "Revolutions-Per-Minute",
      property: "RPM",
    },
    {
      id: 4,
      label: "Gear",
      property: "nGear",
    },
  ];
};

export const getQualiUnits = (label: string): string => {
  switch (label) {
    case "Speed":
      return "( km/h)";
    case "Throttle":
      return "(%)";
    case "Revolutions-Per-Minute":
      return "( RPM)";
    case "Gear":
    default:
      return "";
  }
};
