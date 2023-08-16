import React from "react";
import { GrandPrix, Season } from "../../_model/Season";
import { slugify } from "../../_utils/slugify";
import GrandPrixView from "../../_components/GrandPrixView";

const EventPreview = async ({ params }: { params: { event: string } }) => {
  const season = new Date().getFullYear().toString();
  const { grandprix } = await getGrandPrixData(params.event);

  return <GrandPrixView season={season} grandprix={grandprix} />;
};

export const generateStaticParams = async () => {
  const res = await fetch(`${process.env.SERVER}/racecalendar?year=${new Date().getFullYear()}`);
  const season = (await res.json()) as Season[];

  return season[0].events.map((event) => ({
    event: slugify(event.EventName),
  }));
};

const getGrandPrixData = async (event: string) => {
  const res = await fetch(
    `${process.env.SERVER}/grandprix?year=${new Date().getFullYear()}&name=${event}`
  );
  const grandprix = (await res.json()) as GrandPrix;
  return { grandprix };
};

export default EventPreview;
