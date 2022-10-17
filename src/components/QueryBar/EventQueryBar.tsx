import _ from "lodash";
import { Loader2 } from "tabler-icons-react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectDataFilter } from "../../features/events/dataFilterSlice";
import {
  selectEventQuery,
  setGrandPrix,
  setSeason,
  setSession,
} from "../../features/events/eventQuerySlice";
import { getLapsFromApi } from "../../features/events/eventTelemetrySlice";
import { selectLapTelemetry } from "../../features/events/lapTelemetrySlice";
import { TelemetryProps } from "../../pages/telemetry";
import {
  getGrandPrixOptions,
  getSeasonOptions,
  getSessionOptions,
} from "../../utils/eventQueryOptions";
import Compobox, { ComboboxOption } from "../Combobox/Combobox";

const EventQueryBar: React.FC<TelemetryProps> = ({ seasons }) => {
  const eventQuery = useAppSelector(selectEventQuery);
  const lapTelemetry = useAppSelector(selectLapTelemetry);
  const dataFilter = useAppSelector(selectDataFilter);
  const dispatch = useAppDispatch();

  const seasonOptions = getSeasonOptions(seasons);
  let grandPrixOptions: ComboboxOption[] = [];
  let sessionOptions: ComboboxOption[] = [];

  const yearSelected = seasons.find((season) => season.year === eventQuery.year);
  if (yearSelected) {
    grandPrixOptions = getGrandPrixOptions(yearSelected);
    const grandPrixSelected = yearSelected.events.find(
      (gp) => gp.EventName === eventQuery.grandPrix.name
    );
    if (grandPrixSelected) sessionOptions = getSessionOptions(grandPrixSelected);
  }

  return (
    <div className="flex items-center">
      <Compobox
        options={seasonOptions}
        placeholder="Enter year"
        handleChange={(option) => dispatch(setSeason(parseInt(option.label)))}
        value={eventQuery.year === -1 ? "" : eventQuery.year.toString()}
        error={false}
      />
      <Compobox
        options={grandPrixOptions}
        placeholder="Enter Grand Prix"
        handleChange={(option) => dispatch(setGrandPrix(option))}
        value={eventQuery.grandPrix.name}
        error={false}
      />
      <Compobox
        options={sessionOptions}
        placeholder="Enter session"
        handleChange={(session) => dispatch(setSession(session))}
        value={eventQuery.session.name}
        error={false}
      />

      <button
        type="button"
        className="inline-block ml-5 px-6 py-3 bg-[#3772FF] text-white font-medium text-xs leading-5 rounded hover:bg-blue-700 focus:bg-blue-700 hover:cursor-pointer transition duration-150 ease-in-out disabled:transition-none disabled:hover:bg-blue-600 disabled:opacity-50 disabled:hover:cursor-default"
        onClick={(e) => {
          e.preventDefault();
          dispatch(getLapsFromApi(eventQuery.year, eventQuery.grandPrix.id, eventQuery.session.id));
        }}
        disabled={!eventQuery.readyToSubmit}
      >
        {eventQuery.isLoading ? (
          <div className="flex">
            <div className="animate-spin">
              <Loader2 className="h-5 w-5" />
            </div>
            <div className="ml-1">Loading event</div>
          </div>
        ) : (
          "Apply"
        )}
      </button>
    </div>
  );
};

export default EventQueryBar;
