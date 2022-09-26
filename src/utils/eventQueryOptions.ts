import { ComboboxOption } from "../components/Combobox/Combobox";
import { GrandPrix, Season } from "../model/Season";
import { sprintEvent, conventionalEvent } from "./eventFormats";

export const getSeasonOptions = (seasons: Season[]): ComboboxOption[] => {
  return seasons.map(
    (season, index): ComboboxOption => ({ id: index, label: season.year.toString() })
  );
};

export const getGrandPrixOptions = (season: Season): ComboboxOption[] => {
  return season.events
    .filter((gp) => gp.EventFormat !== "testing")
    .map((gp) => ({ id: gp.RoundNumber, label: gp.EventName }));
};

export const getSessionOptions = (gp: GrandPrix): ComboboxOption[] => {
  if (gp.EventFormat === "sprint") return sprintEvent;
  return conventionalEvent;
};
