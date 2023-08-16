import TelemetryView from "../components/TelemetryView";
import { Season } from "../../src/model/Season";

const Telemetry = async () => {
  const { seasons } = await getSeasonData();
  return <TelemetryView seasons={seasons} />;
};

const getSeasonData = async () => {
  const res = await fetch(`${process.env.SERVER}/racecalendar?year=2021&includeAll=true`);
  const seasons = (await res.json()) as Season[];
  return { seasons };
};

export default Telemetry;
