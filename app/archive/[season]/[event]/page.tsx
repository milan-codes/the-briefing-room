import GrandPrixView from "../../../_components/GrandPrixView";
import { GrandPrix, Season } from "../../../_model/Season";
import { slugify } from "../../../_utils/slugify";

const ArchiveEvent = async ({ params }: { params: { season: string; event: string } }) => {
  const { season, event } = params;
  const { grandprix } = await getGrandPrixData(season, event);

  return <GrandPrixView season={season} grandprix={grandprix} />;
};

export const generateStaticParams = async ({ params: { season } }: any) => {
  const res = await fetch(`${process.env.SERVER}/racecalendar?year=${season}`);
  const archiveSeason = (await res.json()) as Season[];

  return archiveSeason[0].events.map((event) => ({
    event: slugify(event.EventName),
  }));
};

const getGrandPrixData = async (season: string, event: string) => {
  const res = await fetch(`${process.env.SERVER}/grandprix?year=${season}&name=${event}`);
  const grandprix = (await res.json()) as GrandPrix;
  return { grandprix };
};

export default ArchiveEvent;
